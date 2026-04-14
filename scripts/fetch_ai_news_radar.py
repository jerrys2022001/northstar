from __future__ import annotations

import argparse
import email.utils
import hashlib
import html
import json
import re
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "data" / "news" / "latest_candidates.json"
RAW_RADAR_URL = "https://raw.githubusercontent.com/LearnPrompt/ai-news-radar/master/data/latest-24h.json"

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

TOOL_ALIASES = {
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


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Import LearnPrompt/ai-news-radar 24h AI signals and convert them into "
            "Northstar NEWS candidate items."
        )
    )
    parser.add_argument("--date", default=datetime.now(timezone.utc).date().isoformat())
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--window-hours", type=int, default=24)
    parser.add_argument("--limit", type=int, default=12)
    parser.add_argument("--rss-opml", type=Path, help="Optional OPML file with extra RSS feeds.")
    parser.add_argument("--radar-url", default=RAW_RADAR_URL)
    parser.add_argument("--timeout", type=int, default=6, help="Network timeout per source, in seconds.")
    parser.add_argument("--skip-radar-snapshot", action="store_true")
    return parser.parse_args()


def fetch_text(url: str, timeout: int = 6) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": "northstar-ai-news/1.0"})
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return response.read().decode("utf-8", errors="replace")


def read_radar_snapshot(url: str, timeout: int) -> list[dict[str, Any]]:
    try:
        payload = json.loads(fetch_text(url, timeout=timeout))
    except (OSError, urllib.error.URLError, json.JSONDecodeError):
        return []
    raw_items = extract_items(payload)
    return [normalize_external_item(item, "ai-news-radar") for item in raw_items]


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


def normalize_external_item(raw: dict[str, Any], fallback_source: str) -> dict[str, Any]:
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


def read_feed_items(feed_name: str, feed_url: str, timeout: int) -> list[dict[str, Any]]:
    try:
        root = ET.fromstring(fetch_text(feed_url, timeout=timeout))
    except (OSError, urllib.error.URLError, ET.ParseError):
        return []
    channel_items = root.findall(".//item")
    atom_items = root.findall("{http://www.w3.org/2005/Atom}entry")
    if channel_items:
        return [normalize_rss_item(item, feed_name) for item in channel_items]
    return [normalize_atom_item(item, feed_name) for item in atom_items]


def child_text(node: ET.Element, name: str) -> str:
    found = node.find(name)
    return html.unescape(strip_tags(found.text or "")).strip() if found is not None else ""


def normalize_rss_item(item: ET.Element, feed_name: str) -> dict[str, Any]:
    title = child_text(item, "title")
    href = child_text(item, "link")
    summary = child_text(item, "description") or title
    published = parse_datetime(child_text(item, "pubDate") or child_text(item, "date"))
    text = " ".join([title, summary, feed_name])
    return build_candidate(title, summary, href, feed_name, published, classify_category(text))


def normalize_atom_item(item: ET.Element, feed_name: str) -> dict[str, Any]:
    ns = "{http://www.w3.org/2005/Atom}"
    title = child_text(item, f"{ns}title")
    summary = child_text(item, f"{ns}summary") or child_text(item, f"{ns}content") or title
    link = item.find(f"{ns}link")
    href = link.attrib.get("href", "") if link is not None else ""
    published = parse_datetime(child_text(item, f"{ns}published") or child_text(item, f"{ns}updated"))
    text = " ".join([title, summary, feed_name])
    return build_candidate(title, summary, href, feed_name, published, classify_category(text))


def build_candidate(
    title: str,
    summary: str,
    href: str,
    source: str,
    published: datetime | None,
    category: str,
) -> dict[str, Any]:
    published = published or datetime.now(timezone.utc)
    date_value = published.date().isoformat()
    summary = shorten(summary if summary and summary != title else f"{source} reported: {title}", 260)
    candidate = {
        "id": news_id(title, href, date_value),
        "date": date_value,
        "dateLabel": date_label(date_value),
        "category": category,
        "title": shorten(title, 120),
        "source": source,
        "summary": summary,
        "href": href,
        "excerpt": f"Radar signal: {source} surfaced this item in the latest AI news window.",
        "imageUrl": "",
        "toolIds": infer_tool_ids(" ".join([title, summary, source])),
    }
    return candidate


def is_ai_focused(item: dict[str, Any]) -> bool:
    haystack = " ".join(
        str(item.get(key, "")) for key in ("title", "summary", "source", "category")
    ).lower()
    return any(keyword in haystack for keyword in AI_KEYWORDS) or bool(item.get("toolIds"))


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
    haystack = text.lower()
    return [tool_id for tool_id, aliases in TOOL_ALIASES.items() if any(alias in haystack for alias in aliases)]


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
    args = parse_args()
    run_date = datetime.strptime(args.date, "%Y-%m-%d").replace(tzinfo=timezone.utc)
    cutoff = run_date + timedelta(days=1) - timedelta(hours=args.window_hours)
    upper_bound = run_date + timedelta(days=1)

    items: list[dict[str, Any]] = []
    if not args.skip_radar_snapshot:
        items.extend(read_radar_snapshot(args.radar_url, timeout=args.timeout))

    for feed_name, feed_url in BUILT_IN_FEEDS + load_opml_feeds(args.rss_opml):
        items.extend(read_feed_items(feed_name, feed_url, timeout=args.timeout))

    candidates = [
        item
        for item in dedupe(items)
        if item.get("title") and item.get("href") and is_ai_focused(item) and is_publishable_english(item)
        if cutoff.date() <= datetime.strptime(item["date"], "%Y-%m-%d").replace(tzinfo=timezone.utc).date() < upper_bound.date()
    ][: args.limit]

    payload = {
        "source": "LearnPrompt/ai-news-radar + Northstar RSS fallback",
        "sourceUrl": "https://github.com/LearnPrompt/ai-news-radar",
        "updatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "items": candidates,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"items": len(candidates), "output": str(args.output)}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
