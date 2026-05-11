from __future__ import annotations

import argparse
import email.utils
import hashlib
import html
import json
import re
import ssl
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from datetime import date, datetime, time, timedelta, timezone, tzinfo
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo

from news_catalog import build_catalog_feed_queue, build_tool_alias_map, load_catalog_tools, normalize_alias


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "data" / "news" / "latest_candidates.json"
RAW_RADAR_URL = "https://raw.githubusercontent.com/LearnPrompt/ai-news-radar/master/data/latest-24h.json"
FIXED_TIME_ZONES: dict[str, tzinfo] = {
    "UTC": timezone.utc,
    "Asia/Shanghai": timezone(timedelta(hours=8), name="Asia/Shanghai"),
}
UNVERIFIED_SSL_HOST_HINTS = (
    "blog.n8n.io",
)
FALLBACK_IMAGE_POOL = [
    "assets/news/ai-news-goldman-agents.png",
    "assets/news/bright-product-updates.svg",
    "assets/news/bright-productivity.svg",
    "assets/news/bright-safety.svg",
    "assets/news/fallback-ai-chip-wafer.jpg",
    "assets/news/fallback-ai-datacenter-aerial.jpg",
    "assets/news/fallback-ai-network-abstract.jpg",
    "assets/news/fallback-axios-openai-cyber.webp",
    "assets/news/fallback-google-ai-economy.webp",
    "assets/news/mit-compressm.png",
    "assets/news/openai-cyber-defense-local.jpg",
    "assets/news/perplexity-billion-build-source.jpg",
    "assets/news/source-techcrunch-gemini-personal-intelligence.jpg",
    "assets/news/superhuman-claude-mythos.png",
    "assets/news/superhuman-personal-agents.png",
]
MEDIA_NAMESPACE = "{http://search.yahoo.com/mrss/}"

BUILT_IN_FEEDS = [
    ("OpenAI Blog", "https://openai.com/news/rss.xml"),
    ("Anthropic News", "https://www.anthropic.com/news/rss.xml"),
    ("Anthropic Engineering", "https://www.anthropic.com/engineering/rss.xml"),
    ("Google AI Blog", "https://blog.google/technology/ai/rss/"),
    ("Google Developers AI", "https://developers.googleblog.com/en/search/label/ai/rss.xml"),
    ("Google DeepMind", "https://deepmind.google/discover/blog/rss.xml"),
    ("GitHub Blog AI", "https://github.blog/tag/ai/feed/"),
    ("GitHub Changelog", "https://github.blog/changelog/feed/"),
    ("Microsoft AI", "https://blogs.microsoft.com/ai/feed/"),
    ("Meta AI", "https://ai.meta.com/blog/rss/"),
    ("Hugging Face Blog", "https://huggingface.co/blog/feed.xml"),
    ("Perplexity Blog", "https://www.perplexity.ai/hub/blog/rss.xml"),
    ("MIT News AI", "https://news.mit.edu/topic/mitartificial-intelligence2-rss.xml"),
]
CATALOG_TOOL_WATCH_FEEDS = [
    ("catalog-watch", "TechCrunch AI", "https://techcrunch.com/tag/artificial-intelligence/feed/", True),
    ("catalog-watch", "TechCrunch", "https://techcrunch.com/feed/", True),
    ("catalog-watch", "VentureBeat AI", "https://venturebeat.com/category/ai/feed/", True),
    ("catalog-watch", "VentureBeat", "https://venturebeat.com/feed/", True),
    ("catalog-watch", "The Verge AI", "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml", True),
    ("catalog-watch", "The Verge", "https://www.theverge.com/rss/index.xml", True),
    ("catalog-watch", "Ars Technica", "https://feeds.arstechnica.com/arstechnica/index", True),
    ("catalog-watch", "Mashable", "https://mashable.com/feeds/rss/all", True),
    ("catalog-watch", "ZDNet AI", "https://www.zdnet.com/topic/artificial-intelligence/rss.xml", True),
    ("catalog-watch", "The Decoder", "https://the-decoder.com/feed/", True),
    ("catalog-watch", "SiliconANGLE AI", "https://siliconangle.com/category/ai/feed/", True),
    ("catalog-watch", "InfoQ AI", "https://feed.infoq.com/ai-ml-data-eng", True),
    ("catalog-watch", "AWS Machine Learning", "https://aws.amazon.com/blogs/machine-learning/feed/", True),
    ("catalog-watch", "The Register AI", "https://www.theregister.com/software/ai_ml/headlines.atom", True),
    ("catalog-watch", "MarkTechPost", "https://www.marktechpost.com/feed/", True),
    ("catalog-watch", "TechRepublic AI", "https://www.techrepublic.com/rssfeeds/topic/artificial-intelligence/", True),
    ("catalog-watch", "Sourcegraph Blog", "https://sourcegraph.com/blog/rss.xml", True),
    ("catalog-watch", "NVIDIA Technical Blog AI", "https://developer.nvidia.com/blog/category/generative-ai/feed/", True),
    ("catalog-watch", "JetBrains AI", "https://blog.jetbrains.com/ai/feed/", True),
]

AI_KEYWORDS = {
    "ai",
    "agent",
    "agents",
    "assistant",
    "automation",
    "chatbot",
    "chatgpt",
    "claude",
    "coding",
    "copilot",
    "deepseek",
    "diffusion",
    "firefly",
    "gemini",
    "gemma",
    "gpt",
    "image generation",
    "llm",
    "mcp",
    "model",
    "multimodal",
    "open model",
    "perplexity",
    "prompt",
    "rag",
    "reasoning",
    "text-to-image",
    "video generation",
}

CATEGORY_RULES = [
    ("Developer Tools", {"code", "coding", "copilot", "developer", "github", "ide", "vscode"}),
    ("Agents", {"agent", "agents", "automation", "computer use", "mcp", "workflow"}),
    ("Model Releases", {"benchmark", "gemini", "gpt", "llm", "model", "reasoning"}),
    ("Open Models", {"open model", "open source", "open-source", "weights"}),
    ("Creative AI", {"audio", "design", "firefly", "image", "music", "video"}),
    ("Research Workflows", {"paper", "research", "retrieval", "science"}),
    ("Product Updates", {"app", "feature", "launch", "product", "release", "workspace"}),
    ("Policy", {"policy", "regulation", "safety", "security"}),
    ("Funding", {"funding", "ipo", "raises", "valuation"}),
]

BASE_TOOL_ALIASES = {
    "adobefirefly": {"adobe", "firefly"},
    "chatgpt": {"chatgpt", "codex", "gpt", "openai"},
    "claude": {"anthropic", "claude"},
    "cursor": {"cursor"},
    "deepseek": {"deepseek"},
    "figma": {"figma"},
    "gemini": {"gemini", "google ai"},
    "githubcopilot": {"copilot", "github copilot"},
    "googleaistudio": {"ai studio", "google ai studio"},
    "grok": {"grok", "xai", "x ai"},
    "huggingface": {"hugging face", "huggingface"},
    "midjourney": {"midjourney"},
    "perplexity": {"perplexity"},
    "runway": {"runway"},
}
TOOL_ALIASES = {tool_id: set(aliases) for tool_id, aliases in BASE_TOOL_ALIASES.items()}
TRUSTED_AI_SOURCE_HINTS = {
    "anthropic",
    "deepmind",
    "hugging face",
    "machine learning",
    "openai",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Import LearnPrompt/ai-news-radar 24h AI signals and convert them into "
            "Northstar NEWS candidate items."
        )
    )
    parser.add_argument(
        "--date",
        help="Digest date in YYYY-MM-DD format. Defaults to the current date in --time-zone.",
    )
    parser.add_argument(
        "--time-zone",
        default="UTC",
        help="IANA time zone used for digest-day assignment and rolling-window calculations.",
    )
    parser.add_argument(
        "--as-of",
        help=(
            "Optional ISO timestamp for the end of the rolling window. "
            "If omitted, uses now in --time-zone and caps historical reruns at local midnight."
        ),
    )
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--window-hours", type=int, default=24)
    parser.add_argument(
        "--min-items",
        type=int,
        default=20,
        help="Minimum number of candidates to target before widening the rolling window.",
    )
    parser.add_argument(
        "--max-window-hours",
        type=int,
        default=72,
        help="Maximum rolling window size used to preserve NEWS timeliness.",
    )
    parser.add_argument("--limit", type=int, default=36)
    parser.add_argument(
        "--max-catalog-expansion-feeds",
        type=int,
        default=4,
        help="Maximum number of official feeds from site-listed AI tools to add when the base AI news sources are sparse.",
    )
    parser.add_argument(
        "--catalog-feed-batch-size",
        type=int,
        default=4,
        help="Number of site-tool feeds to add per expansion step while topping up sparse digest days.",
    )
    parser.add_argument(
        "--force-catalog-feed-expansion",
        action="store_true",
        help="Always activate the configured site-tool feed budget, even if the base AI sources already cleared the candidate-count target.",
    )
    parser.add_argument("--rss-opml", type=Path, help="Optional OPML file with extra RSS feeds.")
    parser.add_argument("--radar-url", default=RAW_RADAR_URL)
    parser.add_argument("--timeout", type=int, default=12, help="Network timeout per source, in seconds.")
    parser.add_argument("--skip-radar-snapshot", action="store_true")
    return parser.parse_args()


def resolve_digest_zone(zone_name: str) -> tzinfo:
    try:
        return ZoneInfo(zone_name)
    except Exception as exc:  # pragma: no cover - depends on host tzdata
        fallback_zone = FIXED_TIME_ZONES.get(zone_name)
        if fallback_zone is not None:
            return fallback_zone
        raise ValueError(f"Unsupported time zone: {zone_name}") from exc


def resolve_digest_date(raw_date: str | None, digest_zone: tzinfo) -> date:
    if raw_date:
        return datetime.strptime(raw_date, "%Y-%m-%d").date()
    return datetime.now(digest_zone).date()


def resolve_window_end(raw_as_of: str | None, digest_date: date, digest_zone: tzinfo) -> datetime:
    if raw_as_of:
        normalized = raw_as_of.replace("Z", "+00:00")
        parsed = datetime.fromisoformat(normalized)
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=digest_zone)
        return parsed.astimezone(digest_zone)

    now_local = datetime.now(digest_zone)
    digest_end = datetime.combine(digest_date + timedelta(days=1), time.min, tzinfo=digest_zone)
    return min(now_local, digest_end)


def fetch_text(url: str, timeout: int = 6) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": "northstar-ai-news/1.0"})
    last_error: Exception | None = None
    for attempt in range(2):
        try:
            with urllib.request.urlopen(request, timeout=timeout) as response:
                return response.read().decode("utf-8", errors="replace")
        except urllib.error.URLError as exc:
            last_error = exc
            url_lower = url.lower()
            should_retry_unverified_ssl = isinstance(exc.reason, ssl.SSLCertVerificationError) and any(
                host_hint in url_lower for host_hint in UNVERIFIED_SSL_HOST_HINTS
            )
            if should_retry_unverified_ssl:
                insecure_context = ssl._create_unverified_context()
                with urllib.request.urlopen(request, timeout=timeout, context=insecure_context) as response:
                    return response.read().decode("utf-8", errors="replace")
        except TimeoutError as exc:
            last_error = exc
        except ConnectionError as exc:
            last_error = exc
    if last_error is not None:
        raise last_error
    raise RuntimeError(f"Unable to fetch {url}")


def read_radar_snapshot(url: str, timeout: int, digest_date: str) -> list[dict[str, Any]]:
    try:
        payload = json.loads(fetch_text(url, timeout=timeout))
    except (OSError, urllib.error.URLError, json.JSONDecodeError):
        return []
    raw_items = extract_items(payload)
    return [normalize_external_item(item, "ai-news-radar", digest_date) for item in raw_items]


def extract_items(payload: Any) -> list[dict[str, Any]]:
    if isinstance(payload, list):
        return [item for item in payload if isinstance(item, dict)]
    if not isinstance(payload, dict):
        return []
    for key in ("items", "news", "ai", "ai_items", "aiItems"):
        value = payload.get(key)
        if isinstance(value, list):
            return [item for item in value if isinstance(item, dict)]
    for value in payload.values():
        if isinstance(value, list) and value and all(isinstance(item, dict) for item in value[:5]):
            return value
    return []


def normalize_external_item(raw: dict[str, Any], fallback_source: str, digest_date: str) -> dict[str, Any]:
    title = first_text(raw, "title_en", "title", "titleZh", "title_zh", "name")
    summary = first_text(raw, "summary", "description", "desc", "abstract", "content", "title_zh", "title")
    href = first_text(raw, "url", "link", "href", "sourceUrl", "source_url")
    source = first_text(raw, "source", "site", "site_name", "feed", default=fallback_source)
    published = parse_datetime(first_text(raw, "published_at", "publishedAt", "published", "date", "time"))
    text = " ".join([title, summary, source])
    return build_candidate(
        title=title,
        summary=summary,
        href=href,
        source=source,
        published=published,
        digest_date=digest_date,
        category=classify_category(text),
    )


def first_text(raw: dict[str, Any], *keys: str, default: str = "") -> str:
    for key in keys:
        value = raw.get(key)
        if value is None:
            continue
        text = html.unescape(strip_tags(str(value))).strip()
        if text:
            return text
    return default


def load_opml_feeds(path: Path | None) -> list[tuple[str, str]]:
    if not path or not path.exists():
        return []
    root = ET.fromstring(path.read_text(encoding="utf-8"))
    feeds: list[tuple[str, str]] = []
    for outline in root.iter("outline"):
        url = outline.attrib.get("xmlUrl")
        if not url:
            continue
        title = outline.attrib.get("title") or outline.attrib.get("text") or url
        feeds.append((title, url))
    return feeds


def read_feed_items(feed_name: str, feed_url: str, timeout: int, digest_date: str) -> list[dict[str, Any]]:
    try:
        root = ET.fromstring(fetch_text(feed_url, timeout=timeout))
    except (OSError, urllib.error.URLError, ET.ParseError):
        return []
    channel_items = root.findall(".//item")
    atom_items = root.findall("{http://www.w3.org/2005/Atom}entry")
    if channel_items:
        return [normalize_rss_item(item, feed_name, digest_date) for item in channel_items]
    return [normalize_atom_item(item, feed_name, digest_date) for item in atom_items]


def child_text(node: ET.Element, name: str) -> str:
    found = node.find(name)
    return html.unescape(strip_tags(found.text or "")).strip() if found is not None else ""


def child_raw_text(node: ET.Element, name: str) -> str:
    found = node.find(name)
    return found.text or "" if found is not None and found.text else ""


def extract_first_image_from_markup(value: str) -> str:
    match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', html.unescape(value or ""), flags=re.IGNORECASE)
    return html.unescape(match.group(1)).strip() if match else ""


def extract_feed_image(node: ET.Element, description_raw: str = "") -> str:
    for tag_name in (f"{MEDIA_NAMESPACE}content", f"{MEDIA_NAMESPACE}thumbnail", "enclosure"):
        for image_node in node.findall(tag_name):
            candidate_url = html.unescape((image_node.attrib.get("url") or "").strip())
            media_type = (image_node.attrib.get("type") or "").lower()
            if candidate_url and (not media_type or media_type.startswith("image/")):
                return candidate_url
    return extract_first_image_from_markup(description_raw)


def extract_meta_image(html_text: str) -> str:
    patterns = [
        r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']',
        r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image["\']',
        r'<meta[^>]+name=["\']twitter:image["\'][^>]+content=["\']([^"\']+)["\']',
        r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+name=["\']twitter:image["\']',
    ]
    for pattern in patterns:
        match = re.search(pattern, html_text, flags=re.IGNORECASE)
        if match:
            return html.unescape(match.group(1)).strip()
    return ""


def fetch_page_image_url(url: str, timeout: int) -> str:
    try:
        return extract_meta_image(fetch_text(url, timeout=timeout))
    except OSError:
        return ""


def fallback_image_for_item(item: dict[str, Any], used_images: set[str]) -> str:
    if not FALLBACK_IMAGE_POOL:
        return ""
    start_index = int(hashlib.sha1(item["id"].encode("utf-8")).hexdigest(), 16) % len(FALLBACK_IMAGE_POOL)
    for offset in range(len(FALLBACK_IMAGE_POOL)):
        candidate_image = FALLBACK_IMAGE_POOL[(start_index + offset) % len(FALLBACK_IMAGE_POOL)]
        if candidate_image not in used_images:
            return candidate_image
    return FALLBACK_IMAGE_POOL[start_index]


def enrich_candidate_images(items: list[dict[str, Any]], timeout: int) -> list[dict[str, Any]]:
    used_images = {str(item.get("imageUrl") or "").strip() for item in items if str(item.get("imageUrl") or "").strip()}
    for item in items:
        current_image = str(item.get("imageUrl") or "").strip()
        if current_image:
            used_images.add(current_image)
            continue

        page_image = fetch_page_image_url(item.get("href", ""), timeout=timeout)
        if page_image and page_image not in used_images:
            item["imageUrl"] = page_image
            used_images.add(page_image)
            continue

        fallback_image = fallback_image_for_item(item, used_images)
        if fallback_image:
            item["imageUrl"] = fallback_image
            used_images.add(fallback_image)

    return items


def normalize_rss_item(item: ET.Element, feed_name: str, digest_date: str) -> dict[str, Any]:
    title = child_text(item, "title")
    href = child_text(item, "link")
    description_raw = child_raw_text(item, "description")
    summary = html.unescape(strip_tags(description_raw)).strip() or title
    published = parse_datetime(child_text(item, "pubDate") or child_text(item, "date"))
    text = " ".join([title, summary, feed_name])
    candidate = build_candidate(title, summary, href, feed_name, published, digest_date, classify_category(text))
    candidate["imageUrl"] = extract_feed_image(item, description_raw)
    return candidate


def normalize_atom_item(item: ET.Element, feed_name: str, digest_date: str) -> dict[str, Any]:
    ns = "{http://www.w3.org/2005/Atom}"
    title = child_text(item, f"{ns}title")
    summary_raw = child_raw_text(item, f"{ns}summary")
    content_raw = child_raw_text(item, f"{ns}content")
    summary = html.unescape(strip_tags(summary_raw or content_raw)).strip() or title
    link = item.find(f"{ns}link")
    href = link.attrib.get("href", "") if link is not None else ""
    published = parse_datetime(child_text(item, f"{ns}published") or child_text(item, f"{ns}updated"))
    text = " ".join([title, summary, feed_name])
    candidate = build_candidate(title, summary, href, feed_name, published, digest_date, classify_category(text))
    candidate["imageUrl"] = extract_feed_image(item, summary_raw or content_raw)
    return candidate


def build_candidate(
    title: str,
    summary: str,
    href: str,
    source: str,
    published: datetime | None,
    digest_date: str,
    category: str,
) -> dict[str, Any]:
    published = published or datetime.now(timezone.utc)
    summary = shorten(summary if summary and summary != title else f"{source} reported: {title}", 260)
    candidate = {
        "id": news_id(title, href, digest_date),
        "date": digest_date,
        "dateLabel": date_label(digest_date),
        "category": category,
        "title": shorten(title, 120),
        "source": source,
        "summary": summary,
        "href": href,
        "excerpt": f"Radar signal: {source} surfaced this item in the latest AI news window.",
        "imageUrl": "",
        "publishedAt": published.astimezone(timezone.utc).isoformat(timespec="seconds"),
        "toolIds": infer_tool_ids(" ".join([title, summary])),
    }
    return candidate


def is_ai_focused(item: dict[str, Any]) -> bool:
    return has_explicit_ai_signal(item) or has_trusted_ai_source(item)


def has_trusted_ai_source(item: dict[str, Any]) -> bool:
    source = normalize_alias(str(item.get("source") or ""))
    return any(hint in source for hint in TRUSTED_AI_SOURCE_HINTS)


def has_explicit_ai_signal(item: dict[str, Any]) -> bool:
    text = " ".join(
        str(item.get(key, "")) for key in ("title", "summary", "category")
    )
    haystack = f" {normalize_alias(text)} "
    return any(f" {normalize_alias(keyword)} " in haystack for keyword in AI_KEYWORDS)


def is_publishable_english(item: dict[str, Any]) -> bool:
    text = " ".join(str(item.get(key, "")) for key in ("title", "summary"))
    mojibake_markers = ("�", "鈥", "銆", "锛", "紵", "涓", "鍚", "噺", "绋", "鐨")
    if any(marker in text for marker in mojibake_markers):
        return False
    if any(not char.isascii() for char in text):
        return False

    ascii_letters = sum(1 for char in text if char.isascii() and char.isalpha())
    return ascii_letters >= 12


def classify_category(text: str) -> str:
    haystack = text.lower()
    for category, keywords in CATEGORY_RULES:
        if any(keyword in haystack for keyword in keywords):
            return category
    return "Product Updates"


def infer_tool_ids(text: str) -> list[str]:
    haystack = f" {normalize_alias(text)} "
    return [
        tool_id
        for tool_id, aliases in TOOL_ALIASES.items()
        if any(normalized_alias and f" {normalized_alias} " in haystack for normalized_alias in (normalize_alias(alias) for alias in aliases))
    ]


def parse_datetime(value: str) -> datetime | None:
    if not value:
        return None
    try:
        parsed = email.utils.parsedate_to_datetime(value)
        if parsed:
            return parsed.astimezone(timezone.utc) if parsed.tzinfo else parsed.replace(tzinfo=timezone.utc)
    except (TypeError, ValueError, IndexError):
        pass
    normalized = value.replace("Z", "+00:00")
    try:
        parsed = datetime.fromisoformat(normalized)
        return parsed.astimezone(timezone.utc) if parsed.tzinfo else parsed.replace(tzinfo=timezone.utc)
    except ValueError:
        return None


def parse_candidate_published_at(item: dict[str, Any]) -> datetime | None:
    published_at = str(item.get("publishedAt") or "").strip()
    if published_at:
        return parse_datetime(published_at)
    date_value = str(item.get("date") or "").strip()
    if not date_value:
        return None
    try:
        return datetime.strptime(date_value, "%Y-%m-%d").replace(tzinfo=timezone.utc)
    except ValueError:
        return None


def sort_items_by_published_at(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return sorted(items, key=lambda item: parse_candidate_published_at(item) or datetime.min.replace(tzinfo=timezone.utc), reverse=True)


def select_candidates_for_window(
    items: list[dict[str, Any]],
    window_end_utc: datetime,
    requested_window_hours: int,
    min_items: int,
    max_window_hours: int,
    limit: int,
) -> tuple[list[dict[str, Any]], int]:
    target_min_items = min(min_items, limit) if limit > 0 else min_items
    effective_window_hours = requested_window_hours
    selected: list[dict[str, Any]] = []

    while effective_window_hours <= max_window_hours:
        window_start_utc = window_end_utc - timedelta(hours=effective_window_hours)
        selected = [
            item
            for item in items
            if (published_at := parse_candidate_published_at(item))
            if window_start_utc <= published_at < window_end_utc
        ]
        if len(selected) >= target_min_items or effective_window_hours == max_window_hours:
            return selected[:limit], effective_window_hours
        effective_window_hours = min(effective_window_hours + 24, max_window_hours)

    return selected[:limit], effective_window_hours


def dedupe(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    seen: set[str] = set()
    deduped: list[dict[str, Any]] = []
    for item in items:
        key = item.get("href") or re.sub(r"[^a-z0-9]+", " ", item.get("title", "").lower()).strip()
        if not key or key in seen:
            continue
        seen.add(key)
        deduped.append(item)
    return deduped


def build_publishable_items(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return sort_items_by_published_at(
        [
            item
            for item in dedupe(items)
            if item.get("title") and item.get("href") and is_ai_focused(item) and is_publishable_english(item)
        ]
    )


def strip_tags(value: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", value)).strip()


def shorten(value: str, limit: int) -> str:
    value = re.sub(r"\s+", " ", value).strip()
    return value if len(value) <= limit else value[: limit - 1].rstrip() + "..."


def news_id(title: str, href: str, date_value: str) -> str:
    slug = re.sub(r"-{2,}", "-", re.sub(r"[^a-z0-9]+", "-", title.lower())).strip("-")[:48].rstrip("-")
    digest = hashlib.sha1((href or title).encode("utf-8")).hexdigest()[:8]
    suffix = datetime.strptime(date_value, "%Y-%m-%d").strftime("%b%d").lower()
    return f"{slug or 'ai-news'}-{digest}-{suffix}"


def date_label(date_value: str) -> str:
    parsed = datetime.strptime(date_value, "%Y-%m-%d")
    day_format = "%#d" if sys.platform == "win32" else "%-d"
    return parsed.strftime(f"%B {day_format}, %Y")


def main() -> int:
    global TOOL_ALIASES
    args = parse_args()
    catalog_tools = load_catalog_tools()
    TOOL_ALIASES = build_tool_alias_map(BASE_TOOL_ALIASES, catalog_tools)
    digest_zone = resolve_digest_zone(args.time_zone)
    digest_date = resolve_digest_date(args.date, digest_zone)
    window_end = resolve_window_end(args.as_of, digest_date, digest_zone)
    digest_date_value = digest_date.isoformat()
    target_min_items = min(args.min_items, args.limit) if args.limit > 0 else args.min_items
    opml_feeds = load_opml_feeds(args.rss_opml)
    catalog_feed_queue = [
        {
            "toolId": tool_id,
            "feedName": feed_name,
            "feedUrl": feed_url,
            "requireToolMatch": False,
        }
        for tool_id, feed_name, feed_url in build_catalog_feed_queue(
            catalog_tools,
            existing_feed_urls={url for _, url in BUILT_IN_FEEDS + opml_feeds},
        )
    ]
    seen_catalog_feed_urls = {entry["feedUrl"].lower() for entry in catalog_feed_queue}
    for tool_id, feed_name, feed_url, require_tool_match in CATALOG_TOOL_WATCH_FEEDS:
        normalized_url = feed_url.lower()
        if normalized_url in seen_catalog_feed_urls:
            continue
        seen_catalog_feed_urls.add(normalized_url)
        catalog_feed_queue.append(
            {
                "toolId": tool_id,
                "feedName": feed_name,
                "feedUrl": feed_url,
                "requireToolMatch": require_tool_match,
            }
        )
    available_catalog_feed_count = len(catalog_feed_queue)
    configured_catalog_feed_limit = max(0, args.max_catalog_expansion_feeds)
    catalog_feed_queue = catalog_feed_queue[:configured_catalog_feed_limit]
    catalog_batch_size = max(1, args.catalog_feed_batch_size)

    items: list[dict[str, Any]] = []
    if not args.skip_radar_snapshot:
        items.extend(read_radar_snapshot(args.radar_url, timeout=args.timeout, digest_date=digest_date_value))

    for feed_name, feed_url in BUILT_IN_FEEDS + opml_feeds:
        items.extend(read_feed_items(feed_name, feed_url, timeout=args.timeout, digest_date=digest_date_value))

    publishable_items = build_publishable_items(items)
    candidates, effective_window_hours = select_candidates_for_window(
        publishable_items,
        window_end_utc=window_end.astimezone(timezone.utc),
        requested_window_hours=args.window_hours,
        min_items=args.min_items,
        max_window_hours=max(args.window_hours, args.max_window_hours),
        limit=args.limit,
    )
    catalog_feeds_used: list[dict[str, str]] = []
    feed_cursor = 0
    while feed_cursor < len(catalog_feed_queue) and (args.force_catalog_feed_expansion or len(candidates) < target_min_items):
        next_cursor = min(feed_cursor + catalog_batch_size, len(catalog_feed_queue))
        for feed_entry in catalog_feed_queue[feed_cursor:next_cursor]:
            tool_id = str(feed_entry["toolId"])
            feed_name = str(feed_entry["feedName"])
            feed_url = str(feed_entry["feedUrl"])
            feed_items = read_feed_items(feed_name, feed_url, timeout=args.timeout, digest_date=digest_date_value)
            if feed_entry.get("requireToolMatch"):
                feed_items = [item for item in feed_items if item.get("toolIds") and has_explicit_ai_signal(item)]
            items.extend(feed_items)
            catalog_feeds_used.append(
                {
                    "toolId": tool_id,
                    "feedName": feed_name,
                    "feedUrl": feed_url,
                    "requireToolMatch": bool(feed_entry.get("requireToolMatch")),
                }
            )
        feed_cursor = next_cursor

        publishable_items = build_publishable_items(items)
        candidates, effective_window_hours = select_candidates_for_window(
            publishable_items,
            window_end_utc=window_end.astimezone(timezone.utc),
            requested_window_hours=args.window_hours,
            min_items=args.min_items,
            max_window_hours=max(args.window_hours, args.max_window_hours),
            limit=args.limit,
        )

    candidates = enrich_candidate_images(candidates, timeout=args.timeout)
    window_start = window_end - timedelta(hours=effective_window_hours)

    payload = {
        "source": "LearnPrompt/ai-news-radar + Northstar RSS fallback",
        "sourceUrl": "https://github.com/LearnPrompt/ai-news-radar",
        "updatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "digestDate": digest_date_value,
        "timeZone": args.time_zone,
        "requestedWindowHours": args.window_hours,
        "effectiveWindowHours": effective_window_hours,
        "windowStart": window_start.isoformat(timespec="seconds"),
        "windowEnd": window_end.isoformat(timespec="seconds"),
        "catalogExpansionFeedsAvailable": available_catalog_feed_count,
        "catalogExpansionFeedsConfigured": configured_catalog_feed_limit,
        "catalogExpansionFeedsUsed": catalog_feeds_used,
        "items": candidates,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(
        json.dumps(
            {
                "items": len(candidates),
                "output": str(args.output),
                "effectiveWindowHours": effective_window_hours,
                "catalogExpansionFeedsAvailable": available_catalog_feed_count,
                "catalogExpansionFeedsConfigured": configured_catalog_feed_limit,
                "catalogExpansionFeedsUsed": len(catalog_feeds_used),
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
