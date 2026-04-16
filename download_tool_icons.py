"""Download and cache local tool icons for the Northstar AI directory.

Brand-owned icon sources are preferred over third-party favicon APIs:
1. apple-touch-icon declarations in the page head
2. manifest icons declared by the product site
3. explicit HTML icon links
4. conventional root favicon files
5. Google s2 as a final fallback only
"""

from __future__ import annotations

import json
import re
import sys
import time
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import quote, urljoin, urlparse, urlunparse
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parent
DATA_FILES = [ROOT / "catalog.js", *sorted(ROOT.glob("catalog_extra_*.js"))]
OUTPUT_DIR = ROOT / "assets" / "tool-icons"
MANIFEST_FILE = OUTPUT_DIR / "manifest.json"
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36"
)

ENTRY_PATTERN = re.compile(
    r'id:\s*"(?P<id>[^"]+)".*?logoLetter:\s*"(?P<logo>[^"]+)".*?accent:\s*"(?P<accent>[^"]+)".*?url:\s*"(?P<url>https://[^"]+)"',
    re.DOTALL,
)

RASTER_CONTENT_TYPES = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/x-icon": "ico",
    "image/vnd.microsoft.icon": "ico",
    "image/ico": "ico",
    "image/svg+xml": "svg",
    "text/svg+xml": "svg",
}

BRAND_ICON_OVERRIDES: dict[str, list[str]] = {
    "adobefirefly": [
        "https://www.adobe.com/favicon.ico",
    ],
    "chatgpt": [
        "https://openai.com/favicon.ico",
        "https://chatgpt.com/favicon.ico",
    ],
    "elevenlabs": [
        "https://elevenlabs.io/favicon.ico",
        "https://elevenlabs.io/apple-touch-icon.png",
    ],
    "fireflies": [
        "https://fireflies.ai/favicon.ico",
    ],
    "framer": [
        "https://www.framer.com/favicon.ico",
        "https://framer.com/favicon.ico",
    ],
    "figma": [
        "https://www.figma.com/favicon.ico",
        "https://static.figma.com/app/icon/1/favicon.ico",
    ],
    "freepik": [
        "https://www.freepik.com/favicon.ico",
    ],
    "gamma": [
        "https://gamma.app/favicon.ico",
        "https://gamma.app/apple-touch-icon.png",
    ],
    "glean": [
        "https://www.glean.com/favicon.ico",
    ],
    "heygen": [
        "https://www.heygen.com/favicon.ico",
    ],
    "huggingface": [
        "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
        "https://huggingface.co/front/assets/huggingface_logo.svg",
        "https://huggingface.co/favicon.ico",
    ],
    "jotform": [
        "https://www.jotform.com/favicon.ico",
        "https://cdn.jotfor.ms/assets/img/favicons/favicon-32x32.png",
        "https://cdn.jotfor.ms/assets/img/favicons/apple-touch-icon.png",
    ],
    "kapwing": [
        "https://www.kapwing.com/favicon.ico",
    ],
    "midjourney": [
        "https://www.midjourney.com/public/apple-touch-icon.png",
        "https://www.midjourney.com/favicon.ico",
    ],
    "notebooklm": [
        "https://notebooklm.google.com/favicon.ico",
        "https://www.google.com/favicon.ico",
    ],
    "otter": [
        "https://otter.ai/favicon.ico",
        "https://otter.ai/apple-touch-icon.png",
    ],
    "bolt": [
        "https://bolt.new/favicon.ico",
    ],
    "v0": [
        "https://v0.dev/favicon.ico",
    ],
    "ideogram": [
        "https://ideogram.ai/favicon.ico",
    ],
    "recraft": [
        "https://www.recraft.ai/favicon.ico",
        "https://recraft.ai/favicon.ico",
    ],
    "photoroom": [
        "https://www.photoroom.com/favicon.ico",
    ],
    "canva": [
        "https://www.canva.com/favicon.ico",
    ],
    "jasper": [
        "https://www.jasper.ai/favicon.ico",
    ],
    "copyai": [
        "https://www.copy.ai/favicon.ico",
    ],
    "leonardo": [
        "https://leonardo.ai/favicon.ico",
    ],
    "pika": [
        "https://pika.art/favicon.ico",
    ],
    "invideo": [
        "https://invideo.io/favicon.ico",
    ],
    "descript": [
        "https://www.descript.com/favicon.ico",
    ],
    "murf": [
        "https://murf.ai/favicon.ico",
    ],
    "luma": [
        "https://lumalabs.ai/favicon.ico",
    ],
    "openart": [
        "https://openart.ai/favicon.ico",
    ],
    "clipchamp": [
        "https://clipchamp.com/favicon.ico",
    ],
    "vidnoz": [
        "https://www.vidnoz.com/favicon.ico",
    ],
    "beautifulai": [
        "https://www.beautiful.ai/favicon.ico",
    ],
    "tome": [
        "https://tome.app/favicon.ico",
    ],
    "pitch": [
        "https://pitch.com/favicon.ico",
    ],
    "githubcopilot": [
        "https://github.com/favicon.ico",
    ],
    "codeium": [
        "https://codeium.com/favicon.ico",
    ],
    "tabnine": [
        "https://www.tabnine.com/favicon.ico",
    ],
    "sourcegraph": [
        "https://sourcegraph.com/favicon.ico",
    ],
    "continue": [
        "https://www.continue.dev/favicon.ico",
    ],
    "intercom": [
        "https://www.intercom.com/favicon.ico",
    ],
    "granola": [
        "https://www.granola.ai/favicon.ico",
    ],
    "lindy": [
        "https://www.lindy.ai/favicon.ico",
    ],
    "make": [
        "https://www.make.com/favicon.ico",
    ],
    "n8n": [
        "https://n8n.io/favicon.ico",
    ],
    "readai": [
        "https://www.read.ai/favicon.ico",
    ],
    "tldv": [
        "https://tldv.io/favicon.ico",
    ],
    "fellow": [
        "https://fellow.app/favicon.ico",
    ],
    "superhuman": [
        "https://superhuman.com/favicon.ico",
    ],
    "characterai": [
        "https://character.ai/favicon.ico",
    ],
    "poe": [
        "https://poe.com/favicon.ico",
    ],
    "qwen": [
        "https://chat.qwen.ai/favicon.ico",
    ],
    "monica": [
        "https://monica.im/favicon.ico",
    ],
    "youcom": [
        "https://you.com/favicon.ico",
    ],
    "scite": [
        "https://scite.ai/favicon.ico",
    ],
    "elicit": [
        "https://elicit.com/favicon.ico",
    ],
    "scispace": [
        "https://typeset.io/favicon.ico",
    ],
    "gptzero": [
        "https://gptzero.me/favicon.ico",
    ],
    "mem": [
        "https://mem.ai/favicon.ico",
    ],
    "taskade": [
        "https://www.taskade.com/favicon.ico",
    ],
    "coda": [
        "https://coda.io/favicon.ico",
    ],
    "clickup": [
        "https://clickup.com/favicon.ico",
    ],
    "krea": [
        "https://www.krea.ai/favicon.ico",
    ],
    "clipdrop": [
        "https://clipdrop.co/favicon.ico",
    ],
    "removebg": [
        "https://www.remove.bg/favicon.ico",
    ],
    "pixlr": [
        "https://pixlr.com/favicon.ico",
    ],
    "cutoutpro": [
        "https://www.cutout.pro/favicon.ico",
    ],
    "opusclip": [
        "https://www.opus.pro/favicon.ico",
    ],
    "filmora": [
        "https://filmora.wondershare.com/favicon.ico",
    ],
    "speechify": [
        "https://speechify.com/favicon.ico",
    ],
    "adobeexpress": [
        "https://www.adobe.com/favicon.ico",
    ],
    "intercomfin": [
        "https://www.intercom.com/favicon.ico",
    ],
    "suno": [
        "https://suno.com/favicon.ico",
        "https://suno.com/apple-touch-icon.png",
    ],
    "synthesia": [
        "https://www.synthesia.io/favicon.ico",
    ],
    "veed": [
        "https://www.veed.io/favicon.ico",
    ],
}

PRIMARY_ICON_FILE_ALIASES: dict[str, str] = {
    "intercomfin": "intercom.svg",
}

DEFAULT_ICON_PATHS = [
    "/apple-touch-icon.png",
    "/apple-touch-icon-precomposed.png",
    "/android-chrome-512x512.png",
    "/android-chrome-192x192.png",
    "/favicon-196x196.png",
    "/favicon-192x192.png",
    "/favicon-180x180.png",
    "/favicon-64x64.png",
    "/favicon-32x32.png",
    "/favicon.png",
    "/favicon.ico",
]

REFRESHABLE_ICON_SOURCES = {
    "generated-fallback",
    "google-s2",
    "local-alias",
    "local-fallback",
    "root-default",
}


@dataclass(frozen=True)
class IconCandidate:
    url: str
    source: str
    score: tuple[int, int, int]


class HeadAssetParser(HTMLParser):
    def __init__(self, base_url: str) -> None:
        super().__init__()
        self.base_url = base_url
        self.icon_candidates: list[IconCandidate] = []
        self.manifests: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag not in {"link", "meta"}:
            return

        attr_map = {name.lower(): (value or "") for name, value in attrs}
        if tag == "link":
            rel_tokens = {token.strip().lower() for token in attr_map.get("rel", "").split() if token.strip()}
            href = attr_map.get("href", "").strip()
            if not href:
                return

            absolute_url = urljoin(self.base_url, href)
            if "manifest" in rel_tokens:
                self.manifests.append(absolute_url)

            score = icon_score(rel_tokens, attr_map.get("sizes", ""))
            if score is not None:
                source_label = "head-apple-touch" if "apple-touch-icon" in rel_tokens else "head-icon"
                self.icon_candidates.append(IconCandidate(absolute_url, source_label, score))


def load_tools() -> list[tuple[str, str, str, str]]:
    raw = "\n".join(path.read_text(encoding="utf-8") for path in DATA_FILES)
    return [
        (match.group("id"), match.group("logo"), match.group("accent"), match.group("url"))
        for match in ENTRY_PATTERN.finditer(raw)
    ]


def load_existing_manifest() -> dict[str, dict[str, str]]:
    if not MANIFEST_FILE.exists():
        return {}
    try:
        return json.loads(MANIFEST_FILE.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}


def accent_colors(accent_text: str) -> tuple[str, str]:
    colors = re.findall(r"#[0-9a-fA-F]{6}", accent_text or "")
    if len(colors) >= 2:
        return colors[0], colors[1]
    if len(colors) == 1:
        return colors[0], "#ff6c87"
    return "#516bff", "#ff6c87"


def icon_score(rel_tokens: set[str], sizes_text: str) -> tuple[int, int, int] | None:
    if "mask-icon" in rel_tokens:
        return None

    has_icon = "icon" in rel_tokens or "shortcut" in rel_tokens
    has_apple = "apple-touch-icon" in rel_tokens or "apple-touch-icon-precomposed" in rel_tokens
    if not has_icon and not has_apple:
        return None

    size = parse_size_value(sizes_text)
    rel_rank = 0 if has_apple else 1
    size_rank = -size
    shortcut_penalty = 1 if "shortcut" in rel_tokens else 0
    return (rel_rank, shortcut_penalty, size_rank)


def parse_size_value(sizes_text: str) -> int:
    sizes_text = sizes_text.strip().lower()
    if not sizes_text or sizes_text == "any":
        return 0
    values = []
    for token in sizes_text.split():
        parts = token.split("x", 1)
        if len(parts) != 2:
            continue
        try:
            values.append(min(int(parts[0]), int(parts[1])))
        except ValueError:
            continue
    return max(values, default=0)


def request_url(url: str, timeout: int = 5) -> bytes:
    url = normalize_url(url)
    request = Request(url, headers={"User-Agent": USER_AGENT})
    with urlopen(request, timeout=timeout) as response:
        return response.read()


def request_with_headers(url: str, timeout: int = 5) -> tuple[bytes, str]:
    url = normalize_url(url)
    request = Request(url, headers={"User-Agent": USER_AGENT})
    with urlopen(request, timeout=timeout) as response:
        content_type = response.headers.get_content_type()
        return response.read(), content_type


def normalize_url(url: str) -> str:
    parsed = urlparse(url)
    if not parsed.scheme or not parsed.netloc:
        return url.replace(" ", "%20")
    normalized_path = quote(parsed.path or "/", safe="/%:@()+,;=-_.~")
    normalized_query = quote(parsed.query, safe="=&%:@()+,;/-_.~")
    normalized_fragment = quote(parsed.fragment, safe="")
    return urlunparse(
        (
            parsed.scheme,
            parsed.netloc,
            normalized_path,
            parsed.params,
            normalized_query,
            normalized_fragment,
        )
    )


def fetch_html(tool_url: str) -> tuple[str, str] | None:
    try_urls = [tool_url]
    parsed = urlparse(tool_url)
    root_url = f"{parsed.scheme}://{parsed.netloc}/"
    if root_url not in try_urls:
        try_urls.append(root_url)

    for target_url in try_urls:
        try:
            html = request_url(target_url).decode("utf-8", errors="ignore")
            return target_url, html
        except Exception:  # noqa: BLE001
            continue
    return None


def manifest_icon_candidates(manifest_url: str) -> list[IconCandidate]:
    try:
        raw = request_url(manifest_url)
        payload = json.loads(raw.decode("utf-8", errors="ignore"))
    except Exception:  # noqa: BLE001
        return []

    icons = payload.get("icons", [])
    candidates: list[IconCandidate] = []
    for icon in icons:
        src = str(icon.get("src", "")).strip()
        if not src:
            continue
        sizes = str(icon.get("sizes", ""))
        size = parse_size_value(sizes)
        candidates.append(
            IconCandidate(
                urljoin(manifest_url, src),
                "manifest",
                (2, 0, -size),
            )
        )
    return candidates


def override_icon_candidates(tool_id: str) -> list[IconCandidate]:
    return [
        IconCandidate(url, "brand-override", (-1, index, 0))
        for index, url in enumerate(BRAND_ICON_OVERRIDES.get(tool_id, []))
    ]


def root_icon_candidates(tool_url: str) -> list[IconCandidate]:
    parsed = urlparse(tool_url)
    base = f"{parsed.scheme}://{parsed.netloc}"
    return [
        IconCandidate(f"{base}{path}", "root-default", (3, index, 0))
        for index, path in enumerate(DEFAULT_ICON_PATHS)
    ]


def google_fallback_candidates(tool_url: str) -> list[IconCandidate]:
    hostname = urlparse(tool_url).netloc
    return [
        IconCandidate(
            f"https://www.google.com/s2/favicons?sz=128&domain_url={quote(tool_url, safe='')}",
            "google-s2-domain-url",
            (4, 0, 0),
        ),
        IconCandidate(
            f"https://www.google.com/s2/favicons?sz=128&domain={quote(hostname, safe='')}",
            "google-s2-domain",
            (4, 1, 0),
        ),
    ]


def prioritized_candidates(tool_id: str, tool_url: str) -> list[IconCandidate]:
    html_response = fetch_html(tool_url)
    head_candidates: list[IconCandidate] = []
    manifest_candidates: list[IconCandidate] = []

    if html_response is not None:
        base_url, html = html_response
        parser = HeadAssetParser(base_url)
        parser.feed(html)
        head_candidates = sorted(parser.icon_candidates, key=lambda item: item.score)
        for manifest_url in parser.manifests:
            manifest_candidates.extend(manifest_icon_candidates(manifest_url))

    combined = [
        *override_icon_candidates(tool_id),
        *head_candidates,
        *sorted(manifest_candidates, key=lambda item: item.score),
        *root_icon_candidates(tool_url),
        *google_fallback_candidates(tool_url),
    ]

    seen: set[str] = set()
    unique_candidates: list[IconCandidate] = []
    for candidate in combined:
        if candidate.url in seen:
            continue
        seen.add(candidate.url)
        unique_candidates.append(candidate)
    return unique_candidates


def sniff_extension(url: str, content_type: str, data: bytes) -> str | None:
    normalized = content_type.split(";", 1)[0].strip().lower()
    if normalized in RASTER_CONTENT_TYPES:
        return RASTER_CONTENT_TYPES[normalized]

    if data.lstrip().startswith(b"<svg") or b"<svg" in data[:512]:
        return "svg"
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return "png"
    if data[:3] == b"\xff\xd8\xff":
        return "jpg"
    if data[:4] == b"\x00\x00\x01\x00":
        return "ico"

    path = urlparse(url).path.lower()
    if path.endswith(".svg"):
        return "svg"
    if path.endswith(".png"):
        return "png"
    if path.endswith(".jpg") or path.endswith(".jpeg"):
        return "jpg"
    if path.endswith(".ico"):
        return "ico"
    return None


def clear_previous_primary_assets(tool_id: str) -> None:
    for extension in ("png", "jpg", "ico"):
        target = OUTPUT_DIR / f"{tool_id}.{extension}"
        if target.exists():
            target.unlink()


def download_icon(tool_id: str, tool_url: str) -> dict[str, str] | None:
    last_error = None
    start_time = time.monotonic()
    candidates = prioritized_candidates(tool_id, tool_url)

    primary_candidates = [candidate for candidate in candidates if not candidate.source.startswith("google-s2")]
    google_candidates = [candidate for candidate in candidates if candidate.source.startswith("google-s2")]

    for candidate in primary_candidates:
        elapsed = time.monotonic() - start_time
        if elapsed > 8:
            break
        try:
            data, content_type = request_with_headers(candidate.url)
            extension = sniff_extension(candidate.url, content_type, data)
            if not extension or not data:
                continue

            if extension in {"png", "jpg", "ico"}:
                clear_previous_primary_assets(tool_id)
            target = OUTPUT_DIR / f"{tool_id}.{extension}"
            target.write_bytes(data)
            return {
                "file": target.name,
                "source": candidate.source,
                "url": candidate.url,
                "content_type": content_type,
            }
        except Exception as exc:  # noqa: BLE001
            last_error = exc

    for candidate in google_candidates[:2]:
        elapsed = time.monotonic() - start_time
        if elapsed > 14:
            break
        try:
            data, content_type = request_with_headers(candidate.url)
            extension = sniff_extension(candidate.url, content_type, data)
            if not extension or not data:
                continue

            if extension in {"png", "jpg", "ico"}:
                clear_previous_primary_assets(tool_id)
            target = OUTPUT_DIR / f"{tool_id}.{extension}"
            target.write_bytes(data)
            return {
                "file": target.name,
                "source": candidate.source,
                "url": candidate.url,
                "content_type": content_type,
            }
        except Exception as exc:  # noqa: BLE001
            last_error = exc

    print(f"Primary icon download failed for {tool_id}: {last_error}")
    return None


def download_google_icon(tool_id: str, tool_url: str) -> dict[str, str] | None:
    last_error = None
    for candidate in google_fallback_candidates(tool_url):
        try:
            data, content_type = request_with_headers(candidate.url)
            extension = sniff_extension(candidate.url, content_type, data)
            if not extension or not data:
                continue
            if extension in {"png", "ico"}:
                clear_previous_primary_assets(tool_id)
            target = OUTPUT_DIR / f"{tool_id}.{extension}"
            target.write_bytes(data)
            return {
                "file": target.name,
                "source": candidate.source,
                "url": candidate.url,
                "content_type": content_type,
            }
        except Exception as exc:  # noqa: BLE001
            last_error = exc

    print(f"Google fallback icon download failed for {tool_id}: {last_error}")
    return None


def write_svg_fallback(tool_id: str, logo_letter: str, accent_text: str) -> str:
    color_a, color_b = accent_colors(accent_text)
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="{color_a}" offset="0%"/>
      <stop stop-color="{color_b}" offset="100%"/>
    </linearGradient>
  </defs>
  <rect width="128" height="128" rx="34" fill="url(#g)"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-size="58" font-family="Arial, sans-serif" font-weight="700" fill="white">{logo_letter}</text>
</svg>
"""
    target = OUTPUT_DIR / f"{tool_id}.svg"
    target.write_text(svg, encoding="utf-8")
    return target.name


def write_manifest(entries: dict[str, dict[str, str]]) -> None:
    MANIFEST_FILE.write_text(json.dumps(entries, indent=2, sort_keys=True), encoding="utf-8")


def aliased_or_fallback_primary(tool_id: str, fallback_file: str) -> dict[str, str]:
    alias_file = PRIMARY_ICON_FILE_ALIASES.get(tool_id)
    if alias_file:
        extension = Path(alias_file).suffix.lower()
        if extension == ".png":
            content_type = "image/png"
        elif extension == ".ico":
            content_type = "image/x-icon"
        else:
            content_type = "image/svg+xml"
        return {
            "file": alias_file,
            "source": "local-alias",
            "url": f"local://assets/tool-icons/{alias_file}",
            "content_type": content_type,
        }

    return {
        "file": fallback_file,
        "source": "generated-fallback",
        "url": f"local://assets/tool-icons/{fallback_file}",
        "content_type": "image/svg+xml",
    }


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    existing_manifest = load_existing_manifest()
    tools = load_tools()
    missing_only = "--missing-only" in sys.argv[1:]
    refresh_fallbacks = "--refresh-fallbacks" in sys.argv[1:]
    google_fill_fallbacks = "--google-fill-fallbacks" in sys.argv[1:]
    if missing_only:
        tools = [
            tool
            for tool in tools
            if not existing_manifest.get(tool[0], {}).get("file")
        ]
    elif refresh_fallbacks or google_fill_fallbacks:
        tools = [
            tool
            for tool in tools
            if existing_manifest.get(tool[0], {}).get("source") in REFRESHABLE_ICON_SOURCES
        ]
    downloaded = 0
    manifest_payload: dict[str, dict[str, str]] = (
        dict(existing_manifest) if (missing_only or refresh_fallbacks or google_fill_fallbacks) else {}
    )

    for tool_id, logo_letter, accent_text, tool_url in tools:
        primary_asset = (
            download_google_icon(tool_id, tool_url)
            if google_fill_fallbacks
            else download_icon(tool_id, tool_url)
        )
        fallback_file = write_svg_fallback(tool_id, logo_letter, accent_text)

        entry: dict[str, str] = {
            "fallback": fallback_file,
            "tool_url": tool_url,
        }
        if primary_asset is not None:
            downloaded += 1
            entry.update(primary_asset)
        else:
            entry.update(aliased_or_fallback_primary(tool_id, fallback_file))
        manifest_payload[tool_id] = entry

    write_manifest(manifest_payload)
    print(
        f"Downloaded {downloaded} brand-sourced primary icons and generated "
        f"{len(tools)} SVG fallbacks in {OUTPUT_DIR}"
    )


if __name__ == "__main__":
    main()
