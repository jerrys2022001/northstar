"""Build the static AI directory data file.

This script keeps the catalog refresh path simple:
1. Start from a curated shortlist relevant to Western users.
2. Optionally refresh traffic values from Toolify pages when accessible.
3. Drop tools below the configured minimum traffic threshold.
4. Emit the static JavaScript payload consumed by the site.

When source sites block crawling, the embedded fallback snapshot still lets the
site deploy cleanly.
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "data" / "tools.js"
MIN_MONTHLY_VISITS = 1_000_000
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
)


PAYLOAD = {
    "generatedAt": "2026-04-08",
    "minMonthlyVisits": MIN_MONTHLY_VISITS,
    "sourceSummary": {
        "primary": ["https://www.futurepedia.io/", "https://www.toolify.ai/"],
        "notes": [
            "Traffic signals are normalized from Toolify pages and ranking snapshots.",
            "Taxonomy cues and editorial framing are normalized from Futurepedia categories and tool pages.",
        ],
    },
    "collections": [
        {
            "name": "For operators",
            "description": "AI tools that replace repetitive desk work, summarization, drafting, and research loops.",
            "categories": ["Assistants", "Research", "Productivity"],
            "anchor": "Best for founders, chiefs of staff, and generalists",
        },
        {
            "name": "For creative teams",
            "description": "Image, audio, presentation, and avatar tools with strong user traction and production value.",
            "categories": ["Design", "Video", "Audio"],
            "anchor": "Best for marketers, content studios, and brand teams",
        },
        {
            "name": "For global workflows",
            "description": "Translation, multilingual voice, and localization tools that matter for international teams.",
            "categories": ["Translation", "Writing", "Video", "Audio"],
            "anchor": "Best for Europe, North America, and cross-border companies",
        },
    ],
    "tools": [
        {
            "id": "chatgpt",
            "name": "ChatGPT",
            "vendor": "OpenAI",
            "logoLetter": "C",
            "accent": "linear-gradient(145deg, #0f766e, #14b8a6)",
            "url": "https://chatgpt.com/",
            "summary": "Best overall general-purpose AI workspace for writing, research, coding, and agent-like task execution.",
            "categories": ["Assistants", "Research", "Automation"],
            "audience": ["Founders", "Marketers", "Developers", "Operators"],
            "pricing": "Freemium",
            "monthlyVisits": 560600000,
            "trafficLabel": "560.6M monthly visits",
            "recommendation": "Start here if you want one AI product that can cover most day-to-day knowledge work.",
            "sources": {
                "futurepedia": "https://www.futurepedia.io/tool/chatgpt",
                "toolify": "https://www.toolify.ai/Best-trending-AI-Tools",
            },
        },
        {
            "id": "gemini",
            "name": "Google Gemini",
            "vendor": "Google",
            "logoLetter": "G",
            "accent": "linear-gradient(145deg, #2563eb, #8b5cf6)",
            "url": "https://gemini.google.com/",
            "summary": "A multimodal assistant that fits users already living inside Google products and mobile workflows.",
            "categories": ["Assistants", "Research", "Productivity"],
            "audience": ["Students", "Knowledge workers", "Google Workspace teams"],
            "pricing": "Free / Paid",
            "monthlyVisits": 2100000000,
            "trafficLabel": "2.1B monthly visits",
            "recommendation": "Especially strong when your workflow already depends on Gmail, Docs, Android, or Google Search habits.",
            "sources": {
                "futurepedia": "https://www.futurepedia.io/",
                "toolify": "https://www.toolify.ai/tool/gemini-gemini-advanced",
            },
        },
        {
            "id": "claude",
            "name": "Claude",
            "vendor": "Anthropic",
            "logoLetter": "C",
            "accent": "linear-gradient(145deg, #c26f2e, #eb984d)",
            "url": "https://claude.ai/",
            "summary": "A polished AI assistant known for strong reasoning, long-context work, and reliable writing quality.",
            "categories": ["Assistants", "Research", "Writing"],
            "audience": ["Analysts", "Writers", "Developers", "Teams"],
            "pricing": "Freemium",
            "monthlyVisits": 202900000,
            "trafficLabel": "202.9M monthly visits",
            "recommendation": "A top pick for document-heavy tasks, calm writing workflows, and higher-trust answers.",
            "sources": {
                "futurepedia": "https://www.futurepedia.io/tool/claude",
                "toolify": "https://www.toolify.ai/tool/claude-2",
            },
        },
        {
            "id": "perplexity",
            "name": "Perplexity",
            "vendor": "Perplexity",
            "logoLetter": "P",
            "accent": "linear-gradient(145deg, #0f172a, #2dd4bf)",
            "url": "https://www.perplexity.ai/",
            "summary": "A citation-first AI answer engine built for fast research, comparison, and web-backed discovery.",
            "categories": ["Research", "Assistants"],
            "audience": ["Researchers", "Consultants", "Journalists", "Students"],
            "pricing": "Freemium",
            "monthlyVisits": 170100000,
            "trafficLabel": "170.1M monthly visits",
            "recommendation": "Ideal when you need sources, quick comparisons, and less hallucination-prone browsing support.",
            "sources": {
                "futurepedia": "https://www.futurepedia.io/tool/perplexity-ai",
                "toolify": "https://www.toolify.ai/tool/perplexity-ai",
            },
        },
        {
            "id": "notion",
            "name": "Notion AI",
            "vendor": "Notion",
            "logoLetter": "N",
            "accent": "linear-gradient(145deg, #111827, #4b5563)",
            "url": "https://www.notion.so/product/ai",
            "summary": "An all-in-one workspace that combines docs, wikis, projects, search, and AI productivity in one surface.",
            "categories": ["Productivity", "Writing", "Assistants"],
            "audience": ["Startups", "Remote teams", "PMs", "Operators"],
            "pricing": "Freemium",
            "monthlyVisits": 162500000,
            "trafficLabel": "162.5M monthly visits",
            "recommendation": "A strong fit if you want AI embedded inside the place where your team already writes and plans.",
            "sources": {
                "futurepedia": "https://www.futurepedia.io/",
                "toolify": "https://www.toolify.ai/tool/notion-ai",
            },
        },
        {
            "id": "deepl",
            "name": "DeepL",
            "vendor": "DeepL",
            "logoLetter": "D",
            "accent": "linear-gradient(145deg, #0f2d73, #1b62e8)",
            "url": "https://www.deepl.com/",
            "summary": "The most credible AI translation choice for international business writing, documents, and localization.",
            "categories": ["Translation", "Writing"],
            "audience": ["Global teams", "Localization managers", "Legal", "Support"],
            "pricing": "Freemium",
            "monthlyVisits": 119800000,
            "trafficLabel": "119.8M monthly visits",
            "recommendation": "One of the clearest must-haves for multilingual companies serving Europe and North America.",
            "sources": {
                "futurepedia": "https://www.futurepedia.io/ai-tools",
                "toolify": "https://www.toolify.ai/tool/deepl",
            },
        },
        {
            "id": "grammarly",
            "name": "Grammarly",
            "vendor": "Grammarly",
            "logoLetter": "G",
            "accent": "linear-gradient(145deg, #0a7a52, #18b977)",
            "url": "https://www.grammarly.com/",
            "summary": "A mainstream writing layer for polished English, tone adjustment, and safe business communication.",
            "categories": ["Writing", "Productivity"],
            "audience": ["Professionals", "Sales", "Marketing", "Students"],
            "pricing": "Freemium",
            "monthlyVisits": 55900000,
            "trafficLabel": "55.9M monthly visits",
            "recommendation": "Still one of the easiest wins for people who write emails, decks, docs, and customer-facing copy.",
            "sources": {
                "futurepedia": "https://www.futurepedia.io/tool/grammarly",
                "toolify": "https://www.toolify.ai/tool/grammarly",
            },
        },
        {
            "id": "elevenlabs",
            "name": "ElevenLabs",
            "vendor": "ElevenLabs",
            "logoLetter": "E",
            "accent": "linear-gradient(145deg, #101828, #6366f1)",
            "url": "https://elevenlabs.io/",
            "summary": "The premium AI voice platform for narration, voice cloning, dubbing, and multilingual audio production.",
            "categories": ["Audio", "Translation"],
            "audience": ["Creators", "Studios", "App teams", "Publishers"],
            "pricing": "Freemium",
            "monthlyVisits": 27000000,
            "trafficLabel": "27.0M monthly visits",
            "recommendation": "Best-in-class if voice quality and multilingual delivery matter more than bargain pricing.",
            "sources": {
                "futurepedia": "https://www.futurepedia.io/tool/elevenlabs",
                "toolify": "https://www.toolify.ai/tool/elevenlabs-io",
            },
        },
        {
            "id": "gamma",
            "name": "Gamma",
            "vendor": "Gamma",
            "logoLetter": "G",
            "accent": "linear-gradient(145deg, #5b21b6, #e879f9)",
            "url": "https://gamma.app/",
            "summary": "A fast AI deck and doc builder for modern presentations, mini-sites, and narrative updates.",
            "categories": ["Design", "Productivity", "Writing"],
            "audience": ["Founders", "Sales", "Consultants", "Educators"],
            "pricing": "Freemium",
            "monthlyVisits": 25300000,
            "trafficLabel": "25.3M monthly visits",
            "recommendation": "A strong fit for teams that need investor decks, client narratives, or polished internal updates quickly.",
            "sources": {
                "futurepedia": "https://www.futurepedia.io/ai-tools",
                "toolify": "https://www.toolify.ai/tool/gamma-ai-1",
            },
        },
        {
            "id": "midjourney",
            "name": "Midjourney",
            "vendor": "Midjourney",
            "logoLetter": "M",
            "accent": "linear-gradient(145deg, #0f172a, #0ea5e9)",
            "url": "https://www.midjourney.com/",
            "summary": "A benchmark creative engine for high-end AI imagery, concept exploration, and visual art direction.",
            "categories": ["Design"],
            "audience": ["Designers", "Art directors", "Brand teams", "Creators"],
            "pricing": "Paid",
            "monthlyVisits": 16000000,
            "trafficLabel": "16.0M monthly visits",
            "recommendation": "Still one of the strongest picks when image quality and aesthetics matter more than simplicity.",
            "sources": {
                "futurepedia": "https://www.futurepedia.io/tool/midjourney",
                "toolify": "https://www.toolify.ai/tool/midjourney",
            },
        },
        {
            "id": "heygen",
            "name": "HeyGen",
            "vendor": "HeyGen",
            "logoLetter": "H",
            "accent": "linear-gradient(145deg, #ef4444, #fb7185)",
            "url": "https://www.heygen.com/",
            "summary": "A polished AI avatar platform for multilingual business videos, product explainers, and internal training.",
            "categories": ["Video", "Translation"],
            "audience": ["Marketing", "Sales enablement", "L&D", "Customer success"],
            "pricing": "Freemium",
            "monthlyVisits": 8700000,
            "trafficLabel": "8.7M monthly visits",
            "recommendation": "Best suited for companies that need repeatable video production without a traditional studio workflow.",
            "sources": {
                "futurepedia": "https://www.futurepedia.io/tool/heygen",
                "toolify": "https://www.toolify.ai/tool/heygen",
            },
        },
        {
            "id": "synthesia",
            "name": "Synthesia",
            "vendor": "Synthesia",
            "logoLetter": "S",
            "accent": "linear-gradient(145deg, #0f766e, #06b6d4)",
            "url": "https://www.synthesia.io/",
            "summary": "A business-grade AI video platform for training, onboarding, internal communications, and localization.",
            "categories": ["Video", "Translation"],
            "audience": ["Enterprise teams", "Training", "HR", "Operations"],
            "pricing": "Freemium",
            "monthlyVisits": 1700000,
            "trafficLabel": "1.7M monthly visits",
            "recommendation": "A sensible choice when governance, templates, and repeatable business video matter more than flash.",
            "sources": {
                "futurepedia": "https://www.futurepedia.io/tool/synthesia",
                "toolify": "https://www.toolify.ai/tool/synthesia",
            },
        },
        {
            "id": "globalgpt",
            "name": "GlobalGPT",
            "vendor": "GlobalGPT",
            "logoLetter": "U",
            "accent": "linear-gradient(145deg, #111827, #a855f7)",
            "url": "https://www.globalgpt.com/",
            "summary": "A multi-model AI hub for users who want one subscription to compare several frontier models and media tools.",
            "categories": ["Assistants", "Productivity"],
            "audience": ["Power users", "Agencies", "Early adopters"],
            "pricing": "Paid",
            "monthlyVisits": 1200000,
            "trafficLabel": "1.2M monthly visits",
            "recommendation": "Useful for model shoppers who want breadth, though not as essential as the category leaders above.",
            "sources": {
                "futurepedia": "https://www.futurepedia.io/",
                "toolify": "https://www.toolify.ai/tool/globalgpt",
            },
        },
    ],
}


def fetch_text(url: str) -> str | None:
    request = Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urlopen(request, timeout=20) as response:
            return response.read().decode("utf-8", "ignore")
    except (HTTPError, URLError, TimeoutError):
        return None


def fetch_via_jina(url: str) -> str | None:
    stripped = url.removeprefix("https://").removeprefix("http://")
    return fetch_text(f"https://r.jina.ai/http://{stripped}")


def parse_monthly_visitors(raw_text: str) -> int | None:
    match = re.search(r"Monthly Visitors:\s*([0-9.]+)\s*([MBK])", raw_text, re.IGNORECASE)
    if not match:
        return None

    value = float(match.group(1))
    suffix = match.group(2).upper()
    multiplier = {"K": 1_000, "M": 1_000_000, "B": 1_000_000_000}[suffix]
    return int(value * multiplier)


def format_visits(count: int) -> str:
    if count >= 1_000_000_000:
        return f"{count / 1_000_000_000:.1f}B monthly visits"
    if count >= 1_000_000:
        return f"{count / 1_000_000:.1f}M monthly visits"
    return f"{count} monthly visits"


def refresh_payload(payload: dict) -> dict:
    refreshed = json.loads(json.dumps(payload))
    for tool in refreshed["tools"]:
        source_text = fetch_via_jina(tool["sources"]["toolify"])
        if not source_text:
            continue

        monthly_visits = parse_monthly_visitors(source_text)
        if not monthly_visits:
            continue

        tool["monthlyVisits"] = monthly_visits
        tool["trafficLabel"] = format_visits(monthly_visits)

    refreshed["tools"] = [
        tool for tool in refreshed["tools"] if tool["monthlyVisits"] >= MIN_MONTHLY_VISITS
    ]
    refreshed["tools"].sort(key=lambda item: item["monthlyVisits"], reverse=True)
    return refreshed


def main() -> None:
    refreshed = refresh_payload(PAYLOAD)
    js_content = "window.AI_CATALOG = " + json.dumps(refreshed, indent=2, ensure_ascii=True) + ";\n"
    OUTPUT_PATH.write_text(js_content, encoding="utf-8")
    print(f"Wrote {len(refreshed['tools'])} tools to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
