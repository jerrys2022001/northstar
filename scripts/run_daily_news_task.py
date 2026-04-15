from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from collections import defaultdict
from datetime import date, datetime
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
APP_JS_PATH = ROOT / "app.js"
NEWS_HTML_PATH = ROOT / "news.html"
NEWS_DATA_DIR = ROOT / "data" / "news"
ARCHIVE_PATH = NEWS_DATA_DIR / "archive.json"
CURRENT_FEED_PATH = NEWS_DATA_DIR / "current_feed.json"
LATEST_CANDIDATES_PATH = NEWS_DATA_DIR / "latest_candidates.json"
DAILY_INBOX_DIR = NEWS_DATA_DIR / "inbox"
NEWS_LOG_DIR = ROOT / "output" / "news-logs"
CATALOG_PATHS = [ROOT / "catalog.js", *sorted(ROOT.glob("catalog_extra_*.js"))]

STOPWORDS = {
    "the",
    "and",
    "for",
    "with",
    "from",
    "that",
    "this",
    "into",
    "your",
    "about",
}

TOOL_ALIASES = {
    "gemini": ["gemini", "gemma", "google ai studio", "google"],
    "googleaistudio": ["google ai studio", "gemma"],
    "claude": ["claude", "anthropic"],
    "chatgpt": ["chatgpt", "openai", "codex"],
    "perplexity": ["perplexity"],
    "deepseek": ["deepseek"],
    "adobefirefly": ["adobe firefly", "firefly", "adobe"],
    "notion": ["notion"],
    "deepl": ["deepl"],
    "cursor": ["cursor"],
    "githubcopilot": ["github copilot", "copilot"],
    "midjourney": ["midjourney"],
    "figma": ["figma"],
    "runway": ["runway"],
    "elevenlabs": ["elevenlabs"],
    "grok": ["grok", "x ai", "xai"],
}

CATEGORY_HEAT = {
    "Product Updates": 7_000_000,
    "Model Releases": 6_500_000,
    "Agents": 6_000_000,
    "Developer Tools": 5_500_000,
    "Safety": 5_000_000,
    "Policy": 4_200_000,
    "Open Models": 4_000_000,
    "Funding": 3_500_000,
    "Creative AI": 3_200_000,
    "Productivity": 3_000_000,
    "Research Workflows": 2_500_000,
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Refresh the local Northstar AI news archive, rewrite the NEWS page "
            "dataset in app.js, emit a daily log, and optionally validate rendering."
        )
    )
    parser.add_argument(
        "--date",
        default=date.today().isoformat(),
        help="Run date in YYYY-MM-DD format. Defaults to today.",
    )
    parser.add_argument(
        "--max-per-tool-per-day",
        type=int,
        default=2,
        help="Maximum number of same-tool stories allowed for a single day.",
    )
    parser.add_argument(
        "--min-daily-items",
        type=int,
        default=10,
        help="Minimum number of stories required for the run date.",
    )
    parser.add_argument(
        "--skip-render-validation",
        action="store_true",
        help="Skip the Playwright news page render check.",
    )
    parser.add_argument(
        "--validation-port",
        type=int,
        default=4317,
        help="Preferred preview port for the render validation step.",
    )
    return parser.parse_args()


def load_json(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def load_tool_visits() -> dict[str, int]:
    visits: dict[str, int] = {}
    for path in CATALOG_PATHS:
        if not path.exists():
            continue
        current_id = ""
        for line in path.read_text(encoding="utf-8").splitlines():
            id_match = re.search(r'\bid:\s*"([^"]+)"', line)
            if id_match:
                current_id = id_match.group(1)
                continue
            visits_match = re.search(r"\bmonthlyVisits:\s*(\d+)", line)
            if visits_match and current_id:
                visits[current_id] = int(visits_match.group(1))
                current_id = ""
    return visits


def locate_news_feed_block(app_js_text: str) -> tuple[int, int, str]:
    marker = "const newsFeed = "
    marker_index = app_js_text.find(marker)
    if marker_index == -1:
        raise ValueError("Could not locate `const newsFeed =` in app.js")

    array_start = app_js_text.find("[", marker_index)
    if array_start == -1:
        raise ValueError("Could not locate the opening `[` for newsFeed")

    depth = 0
    in_string = False
    quote_char = ""
    escaped = False
    for index in range(array_start, len(app_js_text)):
        char = app_js_text[index]
        if in_string:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == quote_char:
                in_string = False
            continue

        if char in {"'", '"', "`"}:
            in_string = True
            quote_char = char
            continue

        if char == "[":
            depth += 1
        elif char == "]":
            depth -= 1
            if depth == 0:
                return marker_index, index + 1, app_js_text[array_start : index + 1]

    raise ValueError("Could not find the closing `]` for newsFeed")


def js_object_literal_to_python(js_literal: str) -> Any:
    json_like = re.sub(r"([{\[,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:", r'\1"\2":', js_literal)
    json_like = re.sub(r",(\s*[}\]])", r"\1", json_like)
    return json.loads(json_like)


def extract_existing_news_feed() -> list[dict[str, Any]]:
    app_js_text = APP_JS_PATH.read_text(encoding="utf-8")
    _, _, news_feed_literal = locate_news_feed_block(app_js_text)
    groups = js_object_literal_to_python(news_feed_literal)

    normalized_items: list[dict[str, Any]] = []
    for group in groups:
        group_date = str(group["date"])
        group_label = str(group.get("label") or format_date_label(group_date))
        for item in group.get("items", []):
            normalized_items.append(normalize_item(item | {"date": group_date, "dateLabel": group_label}))
    return normalized_items


def load_archive_items() -> list[dict[str, Any]]:
    archive = load_json(ARCHIVE_PATH, default=None)
    if archive and isinstance(archive, dict) and isinstance(archive.get("items"), list):
        return [normalize_item(item) for item in archive["items"]]
    return extract_existing_news_feed()


def load_candidate_items(target_date: str) -> list[dict[str, Any]]:
    candidates: list[dict[str, Any]] = []
    candidate_sources = [
        LATEST_CANDIDATES_PATH,
        DAILY_INBOX_DIR / f"{target_date}.json",
    ]
    for path in candidate_sources:
        payload = load_json(path, default=None)
        if not payload:
            continue
        candidates.extend(normalize_candidate_payload(payload, target_date))
    return candidates


def normalize_candidate_payload(payload: Any, fallback_date: str) -> list[dict[str, Any]]:
    if isinstance(payload, dict) and isinstance(payload.get("items"), list):
        raw_items = payload["items"]
    elif isinstance(payload, list):
        raw_items = payload
    else:
        raise ValueError("Candidate news payload must be a list or an object containing `items`.")
    return [normalize_item(item | {"date": item.get("date", fallback_date)}) for item in raw_items]


def normalize_item(item: dict[str, Any]) -> dict[str, Any]:
    normalized = {
        "id": str(item.get("id") or "").strip(),
        "date": str(item.get("date") or "").strip(),
        "dateLabel": str(item.get("dateLabel") or item.get("label") or "").strip(),
        "category": str(item.get("category") or "").strip(),
        "title": str(item.get("title") or "").strip(),
        "source": str(item.get("source") or "").strip(),
        "summary": str(item.get("summary") or "").strip(),
        "href": str(item.get("href") or "").strip(),
        "excerpt": str(item.get("excerpt") or "").strip(),
        "imageUrl": str(item.get("imageUrl") or "").strip(),
        "toolIds": [str(tool_id).strip() for tool_id in item.get("toolIds", []) if str(tool_id).strip()],
    }
    if not normalized["date"]:
        raise ValueError(f"News item is missing a date: {normalized['title']!r}")
    if not normalized["title"] or not normalized["summary"] or not normalized["href"]:
        raise ValueError(f"News item is missing required fields: {normalized!r}")
    if not normalized["dateLabel"]:
        normalized["dateLabel"] = format_date_label(normalized["date"])
    if not normalized["id"]:
        normalized["id"] = build_news_id(normalized)
    if not normalized["toolIds"]:
        normalized["toolIds"] = infer_tool_ids(normalized)
    return normalized


def build_news_id(item: dict[str, Any]) -> str:
    date_suffix = datetime.strptime(item["date"], "%Y-%m-%d").strftime("%b%d").lower()
    slug_source = slugify(item["title"])[:48].rstrip("-")
    if not slug_source:
        slug_source = "news-item"
    return f"{slug_source}-{date_suffix}"


def slugify(value: str) -> str:
    return re.sub(r"-{2,}", "-", re.sub(r"[^a-z0-9]+", "-", value.lower())).strip("-")


def infer_tool_ids(item: dict[str, Any]) -> list[str]:
    haystack = " ".join(
        part for part in [item.get("title"), item.get("summary"), item.get("excerpt"), item.get("source")] if part
    ).lower()
    matches: list[str] = []
    for tool_id, aliases in TOOL_ALIASES.items():
        if any(alias in haystack for alias in aliases):
            matches.append(tool_id)
    return matches


def news_heat_score(item: dict[str, Any], tool_visits: dict[str, int]) -> int:
    tool_ids = item.get("toolIds") or infer_tool_ids(item)
    traffic_score = max((tool_visits.get(tool_id, 0) for tool_id in tool_ids), default=0)
    category_score = CATEGORY_HEAT.get(item.get("category", ""), 1_000_000)
    return traffic_score + category_score


def normalize_title_tokens(title: str) -> list[str]:
    return [
        token
        for token in re.sub(r"[^a-z0-9\s]", " ", title.lower()).split()
        if token and len(token) > 2 and token not in STOPWORDS
    ]


def items_are_similar(left: dict[str, Any], right: dict[str, Any]) -> bool:
    if left.get("id") and right.get("id") and left["id"] == right["id"]:
        return True
    if left.get("href") and right.get("href") and left["href"] == right["href"]:
        return True

    left_tokens = normalize_title_tokens(left.get("title", ""))
    right_tokens = normalize_title_tokens(right.get("title", ""))
    if not left_tokens or not right_tokens:
        return False
    right_token_set = set(right_tokens)
    overlap_count = sum(1 for token in left_tokens if token in right_token_set)
    overlap_ratio = overlap_count / min(len(left_tokens), len(right_tokens))
    return overlap_ratio >= 0.72


def dedupe_and_cap_items(
    archive_items: list[dict[str, Any]],
    candidate_items: list[dict[str, Any]],
    max_per_tool_per_day: int,
) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    combined = candidate_items + archive_items
    sorted_items = sorted(
        enumerate(combined),
        key=lambda entry: (entry[1]["date"], -entry[0]),
        reverse=True,
    )

    kept: list[dict[str, Any]] = []
    duplicate_skips: list[dict[str, Any]] = []
    tool_cap_skips: list[dict[str, Any]] = []
    per_day_tool_counts: dict[str, defaultdict[str, int]] = defaultdict(lambda: defaultdict(int))

    for _, item in sorted_items:
        if any(items_are_similar(item, existing) for existing in kept):
            duplicate_skips.append(item)
            continue

        tool_ids = item.get("toolIds") or infer_tool_ids(item)
        limit_reached = [tool_id for tool_id in tool_ids if per_day_tool_counts[item["date"]][tool_id] >= max_per_tool_per_day]
        if limit_reached:
            tool_cap_skips.append(item | {"skippedToolIds": limit_reached})
            continue

        for tool_id in tool_ids:
            per_day_tool_counts[item["date"]][tool_id] += 1
        kept.append(item)

    kept.sort(key=lambda item: (item["date"], item["id"]), reverse=True)
    return kept, {
        "duplicatesSkipped": duplicate_skips,
        "toolCapSkipped": tool_cap_skips,
    }


def group_items_for_feed(items: list[dict[str, Any]], tool_visits: dict[str, int]) -> list[dict[str, Any]]:
    grouped: dict[str, list[dict[str, Any]]] = defaultdict(list)
    labels: dict[str, str] = {}
    for item in items:
        grouped[item["date"]].append(item)
        labels[item["date"]] = item["dateLabel"]

    groups: list[dict[str, Any]] = []
    for group_date in sorted(grouped.keys(), reverse=True):
        ordered_items = sorted(
            grouped[group_date],
            key=lambda item: (news_heat_score(item, tool_visits), item["id"]),
            reverse=True,
        )
        groups.append(
            {
                "date": group_date,
                "label": labels[group_date],
                "items": [strip_item_for_app(item) for item in ordered_items],
            }
        )
    return groups


def strip_item_for_app(item: dict[str, Any]) -> dict[str, Any]:
    app_item = {
        "id": item["id"],
        "category": item["category"],
        "title": item["title"],
        "source": item["source"],
        "summary": item["summary"],
        "href": item["href"],
    }
    if item.get("imageUrl"):
        app_item["imageUrl"] = item["imageUrl"]
    if item.get("excerpt"):
        app_item["excerpt"] = item["excerpt"]
    return app_item


def rewrite_app_js_news_feed(grouped_feed: list[dict[str, Any]]) -> None:
    app_js_text = APP_JS_PATH.read_text(encoding="utf-8")
    marker_index, array_end, _ = locate_news_feed_block(app_js_text)
    prefix = app_js_text[:marker_index]
    suffix = app_js_text[array_end:]
    replacement = "const newsFeed = " + json.dumps(grouped_feed, indent=2, ensure_ascii=False)
    APP_JS_PATH.write_text(prefix + replacement + suffix, encoding="utf-8")


def format_date_label(date_value: str) -> str:
    return datetime.strptime(date_value, "%Y-%m-%d").strftime("%B %-d, %Y") if sys.platform != "win32" else datetime.strptime(date_value, "%Y-%m-%d").strftime("%B %#d, %Y")


def validate_static_news_assets(grouped_feed: list[dict[str, Any]], run_date: str, min_daily_items: int) -> dict[str, Any]:
    app_js_text = APP_JS_PATH.read_text(encoding="utf-8")
    html_text = NEWS_HTML_PATH.read_text(encoding="utf-8")
    errors: list[str] = []

    if "id=\"news-feed\"" not in html_text:
        errors.append("news.html is missing #news-feed")
    if "id=\"news-lead-grid\"" not in html_text:
        errors.append("news.html is missing #news-lead-grid")
    if "renderNewsHub()" not in app_js_text:
        errors.append("app.js is missing renderNewsHub()")
    if not grouped_feed:
        errors.append("Grouped news feed is empty")
    run_group = next((group for group in grouped_feed if group["date"] == run_date), None)
    run_group_count = len(run_group["items"]) if run_group else 0
    if run_group_count < min_daily_items:
        errors.append(f"{run_date} has {run_group_count} news items; expected at least {min_daily_items}")

    image_errors: list[str] = []
    for group in grouped_feed:
        for item in group["items"]:
            image_url = item.get("imageUrl")
            if image_url and not image_url.startswith(("http://", "https://")):
                image_path = ROOT / image_url.replace("/", "\\")
                if not image_path.exists():
                    image_errors.append(f"{item['id']}: missing image {image_url}")

    if image_errors:
        errors.extend(image_errors)
    if errors:
        raise RuntimeError("Static news validation failed:\n- " + "\n- ".join(errors))

    return {
        "groups": len(grouped_feed),
        "items": sum(len(group["items"]) for group in grouped_feed),
        "runDateItems": run_group_count,
        "imagesChecked": sum(1 for group in grouped_feed for item in group["items"] if item.get("imageUrl")),
    }


def write_archive(items: list[dict[str, Any]], grouped_feed: list[dict[str, Any]], run_date: str) -> None:
    archive_payload = {
        "updatedAt": datetime.now().isoformat(timespec="seconds"),
        "runDate": run_date,
        "items": items,
    }
    current_feed_payload = {
        "updatedAt": archive_payload["updatedAt"],
        "groups": grouped_feed,
    }
    write_json(ARCHIVE_PATH, archive_payload)
    write_json(CURRENT_FEED_PATH, current_feed_payload)


def write_daily_log(
    run_date: str,
    archive_items: list[dict[str, Any]],
    candidate_items: list[dict[str, Any]],
    kept_items: list[dict[str, Any]],
    grouped_feed: list[dict[str, Any]],
    dedupe_summary: dict[str, Any],
    static_validation: dict[str, Any],
    render_validation: str,
) -> Path:
    NEWS_LOG_DIR.mkdir(parents=True, exist_ok=True)
    path = NEWS_LOG_DIR / f"{run_date}.md"
    run_items = [item for item in kept_items if item["date"] == run_date]
    candidate_ids = {item["id"] for item in candidate_items}
    added_today = [item for item in run_items if item["id"] in candidate_ids]
    archive_ids_before_run = {item["id"] for item in archive_items}
    newly_merged_candidates = [item for item in candidate_items if item["id"] not in archive_ids_before_run]

    preserved_story_lines: list[str] = []
    if path.exists() and not newly_merged_candidates:
        existing_log = path.read_text(encoding="utf-8")
        marker = "## Stories introduced by this run"
        if marker in existing_log:
            section = existing_log.split(marker, 1)[1]
            next_section_match = re.search(r"\n## ", section)
            section_body = section[: next_section_match.start()] if next_section_match else section
            preserved_story_lines = [line.rstrip() for line in section_body.strip().splitlines() if line.strip()]

    lines = [
        f"# Daily AI News Run - {run_date}",
        "",
        f"- Archive items kept: {len(kept_items)}",
        f"- Current feed days: {len(grouped_feed)}",
        f"- Current feed items: {sum(len(group['items']) for group in grouped_feed)}",
        f"- Incoming candidate items: {len(candidate_items)}",
        f"- New items added for {run_date}: {len(added_today)}",
        f"- Candidate stories newly merged into archive: {len(newly_merged_candidates)}",
        f"- Duplicate items skipped: {len(dedupe_summary['duplicatesSkipped'])}",
        f"- Same-tool cap skips: {len(dedupe_summary['toolCapSkipped'])}",
        f"- Static validation: {static_validation['groups']} groups / {static_validation['items']} items / {static_validation['imagesChecked']} images checked",
        f"- Run-date news items: {static_validation.get('runDateItems', 0)}",
        f"- Render validation: {render_validation}",
        "",
        "## Items visible for this run date",
        "",
    ]

    if run_items:
        for item in run_items:
            tools = ", ".join(item.get("toolIds") or []) or "none detected"
            lines.append(f"- {item['title']} [{item['source']}] ({tools})")
    else:
        lines.append("- No stories are currently assigned to this run date.")

    if newly_merged_candidates:
        lines.extend(["", "## Stories introduced by this run", ""])
        for item in newly_merged_candidates:
            lines.append(f"- {item['title']} [{item['source']}] - dated {item['date']}")
    elif preserved_story_lines:
        lines.extend(["", "## Stories introduced by this run", ""])
        lines.extend(preserved_story_lines)

    if dedupe_summary["duplicatesSkipped"]:
        lines.extend(["", "## Duplicate stories skipped", ""])
        for item in dedupe_summary["duplicatesSkipped"][:10]:
            lines.append(f"- {item['date']} - {item['title']} [{item['source']}]")

    if dedupe_summary["toolCapSkipped"]:
        lines.extend(["", "## Same-tool cap skips", ""])
        for item in dedupe_summary["toolCapSkipped"][:10]:
            skipped_tools = ", ".join(item.get("skippedToolIds", [])) or "unknown"
            lines.append(f"- {item['date']} - {item['title']} [{skipped_tools}]")

    path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return path


def run_render_validation(run_date: str, validation_port: int) -> str:
    command = [
        "powershell",
        "-ExecutionPolicy",
        "Bypass",
        "-File",
        str(ROOT / "scripts" / "validate_news_page.ps1"),
        "-Port",
        str(validation_port),
        "-Date",
        run_date,
    ]
    completed = subprocess.run(command, cwd=ROOT, capture_output=True, text=True)
    if completed.returncode != 0:
        stderr = (completed.stderr or completed.stdout).strip()
        raise RuntimeError(f"Render validation failed: {stderr}")
    return (completed.stdout or "").strip() or "passed"


def main() -> int:
    args = parse_args()
    run_date = args.date

    tool_visits = load_tool_visits()
    archive_items = load_archive_items()
    candidate_items = load_candidate_items(run_date)
    kept_items, dedupe_summary = dedupe_and_cap_items(
        archive_items=archive_items,
        candidate_items=candidate_items,
        max_per_tool_per_day=args.max_per_tool_per_day,
    )
    grouped_feed = group_items_for_feed(kept_items, tool_visits)
    rewrite_app_js_news_feed(grouped_feed)
    write_archive(kept_items, grouped_feed, run_date)
    static_validation = validate_static_news_assets(grouped_feed, run_date, args.min_daily_items)
    render_validation = "skipped"
    if not args.skip_render_validation:
        render_validation = run_render_validation(run_date=run_date, validation_port=args.validation_port)

    log_path = write_daily_log(
        run_date=run_date,
        archive_items=archive_items,
        candidate_items=candidate_items,
        kept_items=kept_items,
        grouped_feed=grouped_feed,
        dedupe_summary=dedupe_summary,
        static_validation=static_validation,
        render_validation=render_validation,
    )

    summary = {
        "runDate": run_date,
        "archiveItems": len(kept_items),
        "currentFeedDays": len(grouped_feed),
        "currentFeedItems": sum(len(group["items"]) for group in grouped_feed),
        "candidateItems": len(candidate_items),
        "duplicatesSkipped": len(dedupe_summary["duplicatesSkipped"]),
        "toolCapSkipped": len(dedupe_summary["toolCapSkipped"]),
        "renderValidation": render_validation,
        "logPath": str(log_path),
    }
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
