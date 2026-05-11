#!/usr/bin/env python3
"""Run the Northstar NEWS refresh and optionally commit/push the result.

This script is the single automation entrypoint used by GitHub Actions and by
local Windows scheduled tasks. The lower-level run_news_backfill.py still owns
fetching and merging; this wrapper owns synchronization, logging, and publish.
"""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from datetime import date, datetime, timedelta, timezone, tzinfo
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo


ROOT = Path(__file__).resolve().parents[1]
BACKFILL_SCRIPT = ROOT / "scripts" / "run_news_backfill.py"
NEWS_LOG_DIR = ROOT / "output" / "news-logs"
DEFAULT_RUN_LOG_DIR = ROOT / "output" / "news-update-logs"
FIXED_TIME_ZONES: dict[str, tzinfo] = {
    "UTC": timezone.utc,
    "Asia/Shanghai": timezone(timedelta(hours=8), name="Asia/Shanghai"),
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Refresh Northstar NEWS, then optionally commit and push changed assets."
    )
    parser.add_argument("--repo-root", type=Path, default=ROOT)
    parser.add_argument("--date", help="Target digest date in YYYY-MM-DD. Defaults to today in --time-zone.")
    parser.add_argument(
        "--single-date",
        action="store_true",
        help="Only process --date instead of catching up recent missing days through --date.",
    )
    parser.add_argument("--time-zone", default="Asia/Shanghai")
    parser.add_argument("--max-backfill-days", type=int, default=3)
    parser.add_argument("--limit", type=int, default=96)
    parser.add_argument("--fetch-min-items", type=int, default=80)
    parser.add_argument("--max-fetch-min-items", type=int, default=80)
    parser.add_argument("--max-fetch-limit", type=int, default=96)
    parser.add_argument("--max-window-hours", type=int, default=72)
    parser.add_argument("--initial-catalog-expansion-feeds", type=int, default=48)
    parser.add_argument("--max-catalog-expansion-feeds", type=int, default=48)
    parser.add_argument("--min-daily-items", type=int, default=10)
    parser.add_argument("--max-auto-per-tool-per-day", type=int, default=3)
    parser.add_argument("--skip-render-validation", action="store_true")
    parser.add_argument("--git-commit", action="store_true")
    parser.add_argument("--git-push", action="store_true")
    parser.add_argument("--git-remote", default="origin")
    parser.add_argument("--git-branch", default="main")
    parser.add_argument("--git-user-name", default="")
    parser.add_argument("--git-user-email", default="")
    parser.add_argument("--push-attempts", type=int, default=3)
    parser.add_argument("--log-dir", type=Path, default=DEFAULT_RUN_LOG_DIR)
    return parser.parse_args()


def resolve_digest_zone(zone_name: str) -> tzinfo:
    try:
        return ZoneInfo(zone_name)
    except Exception as exc:  # pragma: no cover - depends on host tzdata
        fallback_zone = FIXED_TIME_ZONES.get(zone_name)
        if fallback_zone is not None:
            return fallback_zone
        raise ValueError(f"Unsupported time zone: {zone_name}") from exc


def resolve_target_date(raw_date: str | None, zone_name: str) -> date:
    if raw_date:
        return date.fromisoformat(raw_date)
    return datetime.now(resolve_digest_zone(zone_name)).date()


def normalize_repo_root(path: Path) -> Path:
    return path.resolve()


def resolve_git_command() -> str:
    resolved = shutil.which("git")
    if resolved:
        return resolved

    candidates = [
        Path(r"C:\Program Files\Git\cmd\git.exe"),
        Path(r"C:\Program Files\Git\bin\git.exe"),
        Path.home() / "AppData" / "Local" / "Programs" / "Git" / "cmd" / "git.exe",
    ]
    for candidate in candidates:
        if candidate.exists():
            return str(candidate)

    raise RuntimeError("Unable to resolve git executable.")


def append_run_log(log_dir: Path, message: str) -> None:
    log_dir.mkdir(parents=True, exist_ok=True)
    now = datetime.now().astimezone()
    log_path = log_dir / f"{now.date().isoformat()}.log"
    with log_path.open("a", encoding="utf-8") as handle:
        handle.write(f"[{now.strftime('%Y-%m-%d %H:%M:%S %z')}] {message}\n")


def run_command(
    args: list[str],
    *,
    cwd: Path,
    label: str,
    check: bool = True,
    echo: bool = False,
) -> subprocess.CompletedProcess[str]:
    completed = subprocess.run(
        args,
        cwd=cwd,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        check=False,
    )
    if echo and completed.stdout:
        print(completed.stdout, end="")
    if echo and completed.stderr:
        print(completed.stderr, end="", file=sys.stderr)
    if check and completed.returncode != 0:
        stderr = completed.stderr.strip()
        stdout = completed.stdout.strip()
        detail = stderr or stdout
        suffix = f": {detail}" if detail else ""
        raise RuntimeError(f"{label} failed with exit code {completed.returncode}{suffix}")
    return completed


def run_git(
    git_command: str,
    repo_root: Path,
    args: list[str],
    *,
    check: bool = True,
) -> subprocess.CompletedProcess[str]:
    return run_command([git_command, *args], cwd=repo_root, label=f"git {' '.join(args)}", check=check)


def parse_json_from_stdout(stdout: str) -> dict[str, Any]:
    text = stdout.strip()
    if not text:
        return {}
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        start = text.find("{")
        end = text.rfind("}")
        if start == -1 or end == -1 or end < start:
            raise
        return json.loads(text[start : end + 1])


def managed_status(git_command: str, repo_root: Path) -> str:
    completed = run_git(
        git_command,
        repo_root,
        ["status", "--porcelain", "--", "app.js", "data/news"],
        check=False,
    )
    return completed.stdout.strip()


def sync_branch_best_effort(git_command: str, repo_root: Path, remote: str, branch: str, log_dir: Path) -> None:
    fetch = run_git(git_command, repo_root, ["fetch", remote, branch], check=False)
    append_run_log(log_dir, f"git_fetch exit={fetch.returncode}")
    if fetch.returncode != 0:
        return

    if managed_status(git_command, repo_root):
        append_run_log(log_dir, "git_pull skipped=managed_paths_dirty")
        return

    pull = run_git(git_command, repo_root, ["pull", "--ff-only", remote, branch], check=False)
    append_run_log(log_dir, f"git_pull_ff_only exit={pull.returncode}")


def build_backfill_command(args: argparse.Namespace, repo_root: Path, target_date: date) -> list[str]:
    command = [
        sys.executable,
        str(repo_root / "scripts" / "run_news_backfill.py"),
        "--time-zone",
        args.time_zone,
        "--end-date",
        target_date.isoformat(),
        "--limit",
        str(args.limit),
        "--fetch-min-items",
        str(args.fetch_min_items),
        "--max-fetch-min-items",
        str(args.max_fetch_min_items),
        "--max-fetch-limit",
        str(args.max_fetch_limit),
        "--max-window-hours",
        str(args.max_window_hours),
        "--initial-catalog-expansion-feeds",
        str(args.initial_catalog_expansion_feeds),
        "--max-catalog-expansion-feeds",
        str(args.max_catalog_expansion_feeds),
        "--min-daily-items",
        str(args.min_daily_items),
        "--max-auto-per-tool-per-day",
        str(args.max_auto_per_tool_per_day),
    ]
    if args.single_date:
        command.extend(["--start-date", target_date.isoformat()])
    else:
        command.extend(["--max-backfill-days", str(args.max_backfill_days)])
    if args.skip_render_validation:
        command.append("--skip-render-validation")
    return command


def run_backfill(args: argparse.Namespace, repo_root: Path, target_date: date) -> dict[str, Any]:
    completed = run_command(
        build_backfill_command(args, repo_root, target_date),
        cwd=repo_root,
        label="NEWS backfill",
        check=False,
    )
    summary = parse_json_from_stdout(completed.stdout)
    summary["returnCode"] = completed.returncode
    if completed.returncode != 0:
        detail = (completed.stderr or completed.stdout).strip()
        if detail:
            summary["error"] = detail
    return summary


def restore_managed_news_paths(git_command: str, repo_root: Path) -> None:
    run_git(
        git_command,
        repo_root,
        ["restore", "--source=HEAD", "--worktree", "--staged", "--", "app.js", "data/news"],
        check=False,
    )


def extract_processed_dates(summary: dict[str, Any], target_date: date) -> set[str]:
    dates = {target_date.isoformat()}
    for raw_date in summary.get("processDates", []) or []:
        if isinstance(raw_date, str) and raw_date:
            dates.add(raw_date)
    for result in summary.get("results", []) or []:
        if isinstance(result, dict) and isinstance(result.get("date"), str):
            dates.add(result["date"])
    return dates


def stage_news_changes(
    git_command: str,
    repo_root: Path,
    processed_dates: set[str],
) -> None:
    run_git(git_command, repo_root, ["add", "--", "app.js", "data/news"])
    log_paths = [
        NEWS_LOG_DIR / f"{processed_date}.md"
        for processed_date in sorted(processed_dates)
    ]
    existing_log_paths = [path for path in log_paths if path.exists()]
    if existing_log_paths:
        run_git(
            git_command,
            repo_root,
            ["add", "-f", "--", *[str(path.relative_to(repo_root)) for path in existing_log_paths]],
        )


def cached_diff_is_empty(git_command: str, repo_root: Path) -> bool:
    completed = run_git(git_command, repo_root, ["diff", "--cached", "--quiet"], check=False)
    return completed.returncode == 0


def latest_commit(git_command: str, repo_root: Path) -> str:
    completed = run_git(git_command, repo_root, ["rev-parse", "HEAD"], check=False)
    return completed.stdout.strip()


def configure_git_identity(git_command: str, repo_root: Path, user_name: str, user_email: str) -> None:
    if user_name:
        run_git(git_command, repo_root, ["config", "user.name", user_name])
    if user_email:
        run_git(git_command, repo_root, ["config", "user.email", user_email])


def commit_and_maybe_push(
    git_command: str,
    repo_root: Path,
    args: argparse.Namespace,
    target_date: date,
    processed_dates: set[str],
) -> dict[str, Any]:
    stage_news_changes(git_command, repo_root, processed_dates)
    if cached_diff_is_empty(git_command, repo_root):
        return {
            "status": "no-changes",
            "commit": latest_commit(git_command, repo_root),
            "pushed": False,
        }

    commit_message = f"Update AI news feed for {target_date.isoformat()}"
    run_git(git_command, repo_root, ["commit", "-m", commit_message])
    commit_sha = latest_commit(git_command, repo_root)

    if not args.git_push:
        return {
            "status": "committed",
            "commit": commit_sha,
            "pushed": False,
        }

    attempts = max(1, args.push_attempts)
    last_error = ""
    for attempt in range(1, attempts + 1):
        pull = run_git(
            git_command,
            repo_root,
            ["pull", "--rebase", "--autostash", args.git_remote, args.git_branch],
            check=False,
        )
        if pull.returncode != 0:
            last_error = f"pull failed on attempt {attempt}"
            continue

        push = run_git(
            git_command,
            repo_root,
            ["push", args.git_remote, f"HEAD:{args.git_branch}"],
            check=False,
        )
        if push.returncode == 0:
            return {
                "status": "committed+pushed",
                "commit": latest_commit(git_command, repo_root),
                "pushed": True,
                "pushAttempts": attempt,
            }
        last_error = f"push failed on attempt {attempt}"

    raise RuntimeError(last_error or "push failed")


def main() -> int:
    args = parse_args()
    repo_root = normalize_repo_root(args.repo_root)
    log_dir = args.log_dir if args.log_dir.is_absolute() else repo_root / args.log_dir
    git_command = resolve_git_command()
    target_date = resolve_target_date(args.date, args.time_zone)
    should_commit = args.git_commit or args.git_push

    append_run_log(
        log_dir,
        f"start target_date={target_date.isoformat()} single_date={str(args.single_date).lower()} "
        f"commit={str(should_commit).lower()} push={str(args.git_push).lower()}",
    )

    managed_dirty_before = managed_status(git_command, repo_root) if should_commit else ""
    if should_commit and managed_dirty_before:
        append_run_log(log_dir, "abort reason=managed_paths_dirty")
        print(
            json.dumps(
                {
                    "targetDate": target_date.isoformat(),
                    "processedDates": [target_date.isoformat()],
                    "backfill": None,
                    "publish": {
                        "status": "skipped-dirty",
                        "commit": latest_commit(git_command, repo_root),
                        "pushed": False,
                    },
                },
                ensure_ascii=False,
                indent=2,
            )
        )
        return 1

    if should_commit:
        configure_git_identity(git_command, repo_root, args.git_user_name, args.git_user_email)
        sync_branch_best_effort(git_command, repo_root, args.git_remote, args.git_branch, log_dir)

    summary = run_backfill(args, repo_root, target_date)
    if int(summary.get("returnCode") or 0) != 0:
        processed_dates = extract_processed_dates(summary, target_date)
        if should_commit and not managed_dirty_before:
            restore_managed_news_paths(git_command, repo_root)
        append_run_log(
            log_dir,
            "deferred "
            f"target_date={target_date.isoformat()} "
            f"reason=insufficient_unique_items "
            f"processed_dates={','.join(sorted(processed_dates))} "
            f"return_code={summary.get('returnCode')}",
        )
        print(
            json.dumps(
                {
                    "targetDate": target_date.isoformat(),
                    "processedDates": sorted(processed_dates),
                    "backfill": summary,
                    "publish": {
                        "status": "deferred",
                        "commit": latest_commit(git_command, repo_root),
                        "pushed": False,
                    },
                },
                ensure_ascii=False,
                indent=2,
            )
        )
        return 1

    processed_dates = extract_processed_dates(summary, target_date)
    publish_summary: dict[str, Any] = {
        "status": "not-requested",
        "commit": latest_commit(git_command, repo_root),
        "pushed": False,
    }
    if should_commit:
        publish_summary = commit_and_maybe_push(
            git_command=git_command,
            repo_root=repo_root,
            args=args,
            target_date=target_date,
            processed_dates=processed_dates,
        )

    output = {
        "targetDate": target_date.isoformat(),
        "processedDates": sorted(processed_dates),
        "backfill": summary,
        "publish": publish_summary,
    }
    append_run_log(
        log_dir,
        "done "
        f"target_date={target_date.isoformat()} "
        f"publish_status={publish_summary.get('status')} "
        f"pushed={str(bool(publish_summary.get('pushed'))).lower()}",
    )
    print(json.dumps(output, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
