# Northstar AI Directory

An Apple-inspired AI tools directory aimed at Europe and North America.

## Local preview

Start a local static server and open the site:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\preview.ps1
```

The preview script now auto-avoids occupied ports and defaults to `4317`, so it will not accidentally open another local site that is already using `4173`.

Open the Prompt Library directly:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\preview.ps1 -PromptLibrary
```

Print the preview URL without opening a browser:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\preview.ps1 -NoOpen
```

## What is included

- A premium-feeling static landing page and searchable directory
- A curated catalog sourced from Futurepedia and Toolify snapshots
- A minimum traffic filter so low-signal tools are excluded
- Local-cached tool icons with brand-source priority and SVG fallbacks

## Files

- `index.html`: the site shell
- `styles.css`: the visual system and responsive layout
- `app.js`: filtering, search, stats, and rendering logic
- `catalog.js`: the curated catalog used by the static site
- `download_tool_icons.py`: refreshes local icons from brand-owned sources first
- `generate_static_tool_pages.py`: rebuilds the standalone tool detail pages

## Refresh static detail pages

```powershell
python generate_static_tool_pages.py
```

This writes standalone pages like `tools/chatgpt.html` and `tools/claude.html`.

## Refresh AI news

Northstar imports AI/tech signals from the public LearnPrompt `ai-news-radar` data format, falls back to curated RSS sources, then merges the result into the existing NEWS page archive.

```powershell
py -3 scripts\run_news_update_and_publish.py --time-zone Asia/Shanghai --date 2026-05-02 --single-date --limit 96 --fetch-min-items 80 --max-fetch-min-items 80 --max-fetch-limit 96 --initial-catalog-expansion-feeds 48 --max-catalog-expansion-feeds 48 --skip-render-validation
```

Use `--git-commit --git-push` when running from an automation context that should publish results:

```powershell
py -3 scripts\run_news_update_and_publish.py --time-zone Asia/Shanghai --skip-render-validation --git-commit --git-push
```

The GitHub Actions workflow at `.github/workflows/update-ai-news.yml` runs this publishing entrypoint from the repository default branch. It starts at 08:45 Asia/Shanghai, then runs fallback checks at 11:15, 16:45, and 21:30. Each run locks to the current Shanghai digest date, catches up recent missing days, retries in-place every 30 minutes if the source window is sparse or a feed is temporarily unavailable, and commits/pushes only NEWS assets. Manual runs can optionally target a specific `digest_date`.

For a VelocAI-style local safety net on a Windows machine, install the Task Scheduler jobs:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\install_news_update_tasks.ps1
```

This installs a primary local NEWS update, three same-day check runs, and an at-logon catch-up task. Every local run uses the same `run_news_update_and_publish.py` entrypoint as GitHub Actions, so reruns are idempotent: if the current Shanghai digest date already has enough items, the task exits without creating a new commit.

## Cache local tool icons

```powershell
python download_tool_icons.py
```

The downloader now prefers each product's own `apple-touch-icon`, `manifest`, declared HTML icons, and root favicon paths before falling back to third-party favicon services. Results are recorded in `assets/tool-icons/manifest.json`.
