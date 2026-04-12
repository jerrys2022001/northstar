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

## Cache local tool icons

```powershell
python download_tool_icons.py
```

The downloader now prefers each product's own `apple-touch-icon`, `manifest`, declared HTML icons, and root favicon paths before falling back to third-party favicon services. Results are recorded in `assets/tool-icons/manifest.json`.
