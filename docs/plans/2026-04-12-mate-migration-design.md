# Mate to Northstar 1:1 Migration Design

## Goal

Copy the full static-site product from `mate` into `northstar` so `northstar` gains the same user-facing capabilities, assets, data, and helper scripts while keeping the existing `northstar` Git history.

## Scope

- Copy all top-level site files from `/Users/jerry/workspace/AI/web/mate` into `/Users/jerry/workspace/AI/web/northstar`, excluding only `.git`.
- Bring over the full static site surface, including:
  - landing and directory pages
  - featured, rankings, prompt library, and use case pages
  - tool detail entry points and pre-generated `tools/*.html` pages
  - catalog data files and icon manifests
  - brand assets and tool icons
  - local preview and page-generation scripts
  - repository config such as `.gitignore`, `CNAME`, and `README.md`

## Approach

Use a repository-level file sync from `mate` to `northstar` that preserves `northstar/.git` and copies the rest of the project tree as-is. This is safer than hand-porting individual pages because `mate` is already a coherent static-site artifact with cross-file dependencies between HTML, JS, data, generated pages, and assets.

## Verification

- Confirm the expected top-level entry files exist in `northstar`.
- Confirm the expected directories exist in `northstar`.
- Confirm `northstar` now contains the same site-facing file set as `mate` for the copied tree.
- Report any known limitation, such as not running a browser preview during this turn.

## Assumptions

- The approved migration mode is a 1:1 copy, not a partial feature port.
- Preserving the `northstar` Git repository metadata is required.
- Structural verification is sufficient for this pass because `northstar` currently has no existing automated test harness.
