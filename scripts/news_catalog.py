from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATHS = [ROOT / "catalog.js", *sorted(ROOT.glob("catalog_extra_*.js"))]

# Curated official feeds for tools that already exist in the site catalog.
# Unreachable feeds are ignored by callers, so this list can be conservative.
CATALOG_TOOL_FEEDS = {
    "airtable": [("Airtable Blog", "https://www.airtable.com/blog/rss.xml")],
    "descript": [("Descript Blog", "https://www.descript.com/blog/rss.xml")],
    "elevenlabs": [("ElevenLabs Blog", "https://elevenlabs.io/blog/rss.xml")],
    "figma": [("Figma Blog", "https://www.figma.com/blog/rss.xml")],
    "grammarly": [("Grammarly Blog", "https://www.grammarly.com/blog/rss.xml")],
    "heygen": [("HeyGen Blog", "https://www.heygen.com/blog/rss.xml")],
    "hubspot": [("HubSpot AI Blog", "https://blog.hubspot.com/marketing/topic/ai/rss.xml")],
    "miro": [("Miro Blog", "https://miro.com/blog/rss/")],
    "notion": [("Notion Blog", "https://www.notion.so/blog/rss.xml")],
    "otter": [("Otter Blog", "https://otter.ai/blog/rss.xml")],
    "replit": [("Replit Blog", "https://blog.replit.com/rss.xml")],
    "runway": [("Runway Blog", "https://runwayml.com/blog/rss.xml")],
    "synthesia": [("Synthesia Blog", "https://www.synthesia.io/blog/rss.xml")],
    "zapier": [("Zapier Blog", "https://zapier.com/blog/rss.xml")],
}

GENERIC_ALIAS_TOKENS = {
    "advanced",
    "agent",
    "agents",
    "ai",
    "app",
    "apps",
    "assistant",
    "assistants",
    "labs",
    "platform",
    "product",
    "products",
    "pro",
    "software",
    "studio",
    "suite",
    "tool",
    "tools",
    "workspace",
    "workspaces",
}
RISKY_SINGLE_WORD_ALIASES = {
    "base",
    "browse",
    "dust",
    "hex",
    "lex",
    "make",
    "mint",
    "note",
    "read",
    "reflect",
    "relay",
    "stitch",
    "tempo",
    "tome",
}
DISALLOWED_VENDOR_ONLY_ALIASES = {
    "adobe",
    "amazon",
    "apple",
    "aws",
    "bytedance",
    "google",
    "meta",
    "microsoft",
    "openai",
    "xai",
}


def js_object_literal_to_python(js_literal: str) -> Any:
    json_like = re.sub(r"([{\[,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:", r'\1"\2":', js_literal)
    json_like = re.sub(r",(\s*[}\]])", r"\1", json_like)
    return json.loads(json_like)


def extract_balanced_block(text: str, start_index: int, open_char: str, close_char: str) -> tuple[str, int]:
    depth = 0
    in_string = False
    quote_char = ""
    escaped = False

    for index in range(start_index, len(text)):
        char = text[index]
        if in_string:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == quote_char:
                in_string = False
            continue

        if char in {'"', "'", "`"}:
            in_string = True
            quote_char = char
            continue

        if char == open_char:
            depth += 1
        elif char == close_char:
            depth -= 1
            if depth == 0:
                return text[start_index : index + 1], index + 1

    raise ValueError(f"Could not find closing {close_char!r} for block starting at {start_index}")


def load_catalog_tools(paths: list[Path] | None = None) -> list[dict[str, Any]]:
    tools_by_id: dict[str, dict[str, Any]] = {}
    for path in paths or CATALOG_PATHS:
        if not path.exists():
            continue

        text = path.read_text(encoding="utf-8").lstrip("\ufeff")
        try:
            if "addTools(" in text:
                collected_tools: list[dict[str, Any]] = []
                search_start = 0
                while True:
                    marker_index = text.find("addTools(", search_start)
                    if marker_index == -1:
                        break
                    array_start = text.find("[", marker_index)
                    if array_start == -1:
                        break
                    array_literal, search_start = extract_balanced_block(text, array_start, "[", "]")
                    batch = js_object_literal_to_python(array_literal)
                    if isinstance(batch, list):
                        collected_tools.extend(item for item in batch if isinstance(item, dict))
                payload = {"tools": collected_tools}
            elif ".tools.push(" in text:
                push_start = text.find("(", text.find(".tools.push"))
                if push_start == -1:
                    continue
                push_literal, _ = extract_balanced_block(text, push_start, "(", ")")
                payload = {"tools": js_object_literal_to_python("[" + push_literal[1:-1].strip() + "]")}
            else:
                object_start = text.find("{")
                if object_start == -1:
                    continue
                object_literal, _ = extract_balanced_block(text, object_start, "{", "}")
                payload = js_object_literal_to_python(object_literal.strip())
        except (json.JSONDecodeError, ValueError):
            continue
        if not isinstance(payload, dict):
            continue

        tools = payload.get("tools")
        if not isinstance(tools, list):
            continue

        for raw_tool in tools:
            if not isinstance(raw_tool, dict):
                continue
            tool_id = str(raw_tool.get("id") or "").strip()
            if not tool_id:
                continue
            if tool_id not in tools_by_id:
                tools_by_id[tool_id] = raw_tool

    return sorted(
        tools_by_id.values(),
        key=lambda item: int(item.get("monthlyVisits") or 0),
        reverse=True,
    )


def normalize_alias(value: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9]+", " ", value.lower())).strip()


def alias_is_useful(alias: str) -> bool:
    if not alias:
        return False
    tokens = alias.split()
    if not tokens:
        return False
    if len(alias) < 4 and not any(char.isdigit() for char in alias):
        return False
    if len(tokens) == 1 and alias in RISKY_SINGLE_WORD_ALIASES:
        return False
    if all(token in GENERIC_ALIAS_TOKENS for token in tokens):
        return False
    return True


def alias_variants_from_tool(tool: dict[str, Any]) -> set[str]:
    variants: set[str] = set()
    tool_name = str(tool.get("name") or "")
    vendor_name = str(tool.get("vendor") or "")
    tool_name_alias = normalize_alias(tool_name)
    vendor_alias = normalize_alias(vendor_name)
    raw_values = [tool_name]
    if vendor_name and (vendor_alias not in DISALLOWED_VENDOR_ONLY_ALIASES or vendor_alias in tool_name_alias):
        raw_values.append(vendor_name)

    tool_url = str(tool.get("url") or "").strip()
    if tool_url:
        host = urlparse(tool_url).netloc.lower()
        if host.startswith("www."):
            host = host[4:]
        host_parts = [part for part in host.split(".") if part]
        if len(host_parts) >= 2:
            raw_values.append(host_parts[-2])

    for raw_value in raw_values:
        alias = normalize_alias(raw_value)
        if not alias_is_useful(alias):
            continue
        variants.add(alias)

        trimmed = normalize_alias(
            re.sub(
                r"\b(ai|agent|agents|assistant|assistants|app|platform|studio|workspace|workspaces)\b",
                " ",
                alias,
            )
        )
        if alias_is_useful(trimmed):
            variants.add(trimmed)

    return variants


def build_tool_alias_map(
    base_aliases: dict[str, set[str]],
    catalog_tools: list[dict[str, Any]],
) -> dict[str, set[str]]:
    merged = {tool_id: set(aliases) for tool_id, aliases in base_aliases.items()}
    for tool in catalog_tools:
        tool_id = str(tool.get("id") or "").strip()
        if not tool_id:
            continue
        merged.setdefault(tool_id, set()).update(alias_variants_from_tool(tool))
    return merged


def build_catalog_feed_queue(
    catalog_tools: list[dict[str, Any]],
    existing_feed_urls: set[str] | None = None,
) -> list[tuple[str, str, str]]:
    seen_urls = {url.lower() for url in existing_feed_urls or set()}
    queue: list[tuple[str, str, str]] = []

    for tool in catalog_tools:
        tool_id = str(tool.get("id") or "").strip()
        if not tool_id:
            continue
        for feed_name, feed_url in CATALOG_TOOL_FEEDS.get(tool_id, []):
            normalized_url = feed_url.lower()
            if normalized_url in seen_urls:
                continue
            seen_urls.add(normalized_url)
            queue.append((tool_id, feed_name, feed_url))

    return queue
