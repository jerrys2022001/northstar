"""Generate standalone static tool detail pages under tools/."""

from __future__ import annotations

import json
from pathlib import Path
import subprocess


ROOT = Path(__file__).resolve().parent
DATA_FILES = [
    ROOT / "catalog.js",
    ROOT / "catalog_extra_1.js",
    ROOT / "catalog_extra_2.js",
    ROOT / "catalog_extra_3.js",
    ROOT / "catalog_extra_4.js",
    ROOT / "catalog_extra_5.js",
    ROOT / "catalog_extra_6.js",
    ROOT / "catalog_extra_7.js",
    ROOT / "catalog_extra_8.js",
    ROOT / "catalog_extra_9.js",
    ROOT / "catalog_extra_10.js",
    ROOT / "catalog_extra_11.js",
]
OUTPUT_DIR = ROOT / "tools"


def load_tools() -> list[tuple[str, str]]:
    script = f"""
const fs = require("fs");
const vm = require("vm");
const context = {{
  window: {{}},
  console
}};
context.window.window = context.window;
vm.createContext(context);
const files = {json.dumps([str(path) for path in DATA_FILES])};
for (const file of files) {{
  const source = fs.readFileSync(file, "utf8");
  vm.runInContext(source, context, {{ filename: file }});
}}
const catalog = context.window.AI_CATALOG || {{ tools: [] }};
process.stdout.write(JSON.stringify(catalog.tools.map((tool) => [tool.id, tool.name])));
"""
    result = subprocess.run(
        ["node", "-e", script],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(result.stdout)


def render_page(tool_id: str, tool_name: str) -> str:
    title = f"{tool_name} | Northstar AI"
    description = f"Static decision page for {tool_name} in the Northstar AI Directory."
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <meta name="theme-color" content="#f3f4f6">
  <link rel="icon" type="image/svg+xml" href="../favicon.svg">
  <link rel="stylesheet" href="../styles.css">
</head>
<body data-tool-id="{tool_id}" data-detail-mode="static" data-home-href="../index.html" data-directory-href="../index.html#directory" data-asset-prefix="../">
  <div class="page-glow glow-a"></div>
  <div class="page-glow glow-b"></div>

  <header class="topbar detail-topbar">
    <div class="brand">
      <div class="brand-badge">
        <img src="../assets/brand-mark.png" alt="Northstar AI logo">
      </div>
      <div class="brand-copy">
        <strong>Northstar AI</strong>
        <span>WESTERN AI NAVIGATOR</span>
      </div>
    </div>

    <nav class="topnav" aria-label="Primary">
      <a href="../index.html">Home</a>
      <a href="../news.html">NEWS</a>
      <div class="nav-item nav-item-with-panel">
        <a class="nav-trigger" href="../featured.html">
          <span>Featured Flow</span>
        </a>
        <div class="nav-flyout">
          <a class="nav-flyout-link" href="../featured.html"><span class="nav-flyout-icon is-glyph"><span class="prompt-track-monogram">FF</span></span><span class="nav-flyout-label">Featured Overview</span></a>
          <a class="nav-flyout-link" href="../featured.html#today-hot"><span class="nav-flyout-icon is-glyph"><span class="prompt-track-monogram">TH</span></span><span class="nav-flyout-label">Today Hot</span></a>
          <a class="nav-flyout-link" href="../featured.html#editor-picks"><span class="nav-flyout-icon is-glyph"><span class="prompt-track-monogram">EP</span></span><span class="nav-flyout-label">Editor Picks</span></a>
          <a class="nav-flyout-link" href="../featured.html#operator-stack"><span class="nav-flyout-icon is-glyph"><span class="prompt-track-monogram">OS</span></span><span class="nav-flyout-label">Operator Stack</span></a>
          <a class="nav-flyout-link" href="../featured.html#new-notable"><span class="nav-flyout-icon is-glyph"><span class="prompt-track-monogram">NN</span></span><span class="nav-flyout-label">New &amp; Notable</span></a>
        </div>
      </div>
      <div class="nav-item nav-item-with-panel">
        <a class="nav-trigger" href="../prompt-library.html?track=chatgpt">
          <span class="nav-mini-icon" aria-hidden="true">&#9711;</span>
          <span>AI Prompt Library</span>
        </a>
        <div class="nav-flyout" id="prompt-nav-flyout"></div>
      </div>
      <a href="../directory.html">Pro Directory</a>
    </nav>

    <a class="icon-button detail-home-button" href="../index.html#search-hub" aria-label="Go to home search">&#8981;</a>
  </header>

  <main class="detail-page">
    <section class="detail-hero glass" id="detail-hero"></section>

    <section class="detail-layout">
      <div class="detail-main">
        <section class="section-card detail-section" id="detail-overview"></section>
        <section class="section-card detail-section" id="detail-strengths"></section>
        <section class="section-card detail-section" id="detail-pricing"></section>
        <section class="section-card detail-section" id="detail-compare"></section>
      </div>

      <aside class="detail-side">
        <section class="section-card detail-section" id="detail-fit"></section>
        <section class="section-card detail-section" id="detail-decision"></section>
        <section class="section-card detail-section" id="detail-sources"></section>
      </aside>
    </section>

    <section class="section-card detail-section" id="detail-similar"></section>
  </main>

  <footer class="footer">
    <p>Northstar AI Directory</p>
    <p>Decision-ready tool profiles for Western users choosing among mainstream AI products.</p>
  </footer>

  <script src="../catalog.js"></script>
  <script src="../catalog_extra_1.js"></script>
  <script src="../catalog_extra_2.js"></script>
  <script src="../catalog_extra_3.js"></script>
  <script src="../catalog_extra_4.js"></script>
  <script src="../catalog_extra_5.js"></script>
  <script src="../catalog_extra_6.js"></script>
  <script src="../catalog_extra_7.js"></script>
  <script src="../catalog_extra_8.js"></script>
  <script src="../catalog_extra_9.js"></script>
  <script src="../catalog_extra_10.js"></script>
  <script src="../catalog_extra_11.js"></script>
  <script src="../app.js"></script>
  <script src="../detail.js"></script>
</body>
</html>
"""


def main() -> None:
    OUTPUT_DIR.mkdir(exist_ok=True)
    tools = load_tools()
    for tool_id, tool_name in tools:
        output_path = OUTPUT_DIR / f"{tool_id}.html"
        output_path.write_text(render_page(tool_id, tool_name), encoding="utf-8")
    print(f"Generated {len(tools)} static tool pages in {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
