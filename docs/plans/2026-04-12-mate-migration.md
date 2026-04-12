# Mate to Northstar Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Copy the complete `mate` static site into `northstar` so `northstar` has the same pages, data, scripts, and assets.

**Architecture:** This migration uses a repo-level sync from `/Users/jerry/workspace/AI/web/mate` into `/Users/jerry/workspace/AI/web/northstar`, excluding only `.git` so the target keeps its own repository history. Verification is structural because the target repo is currently almost empty and does not ship an automated test suite.

**Tech Stack:** Static HTML, CSS, JavaScript, Python utility scripts, PowerShell preview script, Git-managed assets

---

### Task 1: Prepare migration context

**Files:**
- Create: `docs/plans/2026-04-12-mate-migration-design.md`
- Create: `docs/plans/2026-04-12-mate-migration.md`

**Step 1: Confirm source and target repositories**

Run: `git -C /Users/jerry/workspace/AI/web/mate status --short`
Expected: source repo is readable for copy operations

**Step 2: Confirm target repository branch state**

Run: `git -C /Users/jerry/workspace/AI/web/northstar status --short --branch`
Expected: target repo branch information is available and `.git` remains untouched

**Step 3: Record the approved migration mode**

Use the design document to capture that the migration is a 1:1 full copy from `mate` to `northstar`.

### Task 2: Copy the site tree

**Files:**
- Modify: `README.md`
- Create or Modify: `.gitignore`
- Create or Modify: `CNAME`
- Create or Modify: `index.html`
- Create or Modify: `directory.html`
- Create or Modify: `featured.html`
- Create or Modify: `rankings.html`
- Create or Modify: `prompt-library.html`
- Create or Modify: `tool.html`
- Create or Modify: `usecases.html`
- Create or Modify: `app.js`
- Create or Modify: `detail.js`
- Create or Modify: `catalog.js`
- Create or Modify: `catalog_extra_1.js`
- Create or Modify: `catalog_extra_2.js`
- Create or Modify: `catalog_extra_3.js`
- Create or Modify: `styles.css`
- Create or Modify: `favicon.svg`
- Create or Modify: `download_tool_icons.py`
- Create or Modify: `generate_static_tool_pages.py`
- Create or Modify: `assets/**`
- Create or Modify: `data/**`
- Create or Modify: `scripts/**`
- Create or Modify: `tools/**`

**Step 1: Sync all source files except Git metadata**

Run: `rsync -a --exclude '.git' /Users/jerry/workspace/AI/web/mate/ /Users/jerry/workspace/AI/web/northstar/`
Expected: all site files and directories are copied into `northstar`

**Step 2: Confirm target repo metadata remains intact**

Run: `git -C /Users/jerry/workspace/AI/web/northstar rev-parse --show-toplevel`
Expected: output is `/Users/jerry/workspace/AI/web/northstar`

### Task 3: Verify migrated capabilities

**Files:**
- Test: `index.html`
- Test: `directory.html`
- Test: `featured.html`
- Test: `rankings.html`
- Test: `prompt-library.html`
- Test: `tool.html`
- Test: `app.js`
- Test: `detail.js`
- Test: `catalog.js`
- Test: `assets/tool-icons/manifest.json`
- Test: `scripts/preview.ps1`
- Test: `tools/`

**Step 1: Check critical entry files**

Run: `ls /Users/jerry/workspace/AI/web/northstar/index.html /Users/jerry/workspace/AI/web/northstar/directory.html /Users/jerry/workspace/AI/web/northstar/featured.html /Users/jerry/workspace/AI/web/northstar/rankings.html /Users/jerry/workspace/AI/web/northstar/prompt-library.html /Users/jerry/workspace/AI/web/northstar/tool.html`
Expected: all files exist

**Step 2: Check supporting directories**

Run: `ls -d /Users/jerry/workspace/AI/web/northstar/assets /Users/jerry/workspace/AI/web/northstar/data /Users/jerry/workspace/AI/web/northstar/scripts /Users/jerry/workspace/AI/web/northstar/tools`
Expected: all directories exist

**Step 3: Compare copied file inventory at a high level**

Run: `diff -rq /Users/jerry/workspace/AI/web/mate /Users/jerry/workspace/AI/web/northstar -x .git -x docs`
Expected: no migration-relevant differences, or only documented exceptions

**Step 4: Report verification outcome**

State exactly which checks were run and whether browser preview was or was not executed during this turn.
