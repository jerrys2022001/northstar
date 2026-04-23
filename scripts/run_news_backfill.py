from __future__ import annotations

import argparse
import json
import subprocess
import sys
from datetime import date, datetime, timedelta, timezone, tzinfo
from pathlib import Path
from zoneinfo import ZoneInfo


ROOT = Path(__file__).resolve().parents[1]
CURRENT_FEED_PATH = ROOT / "data" / "news" / "current_feed.json"
FETCH_SCRIPT_PATH = ROOT / "scripts" / "fetch_ai_news_radar.py"
MERGE_SCRIPT_PATH = ROOT / "scripts" / "run_daily_news_task.py"

FIXED_TIME_ZONES: dict[str, tzinfo] = {
    "UTC": timezone.utc,
    "Asia/Shanghai": timezone(timedelta(hours=8), name="Asia/Shanghai"),
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Catch up missing Northstar NEWS digest dates by running the fetch and merge "
            "pipeline for every missing local day through the target end date."
        )
    )
    parser.add_argument(
        "--time-zone",
        default="UTC",
        help="IANA time zone used to determine the local digest date.",
    )
    parser.add_argument(
        "--start-date",
        help="Optional first digest date (YYYY-MM-DD). Defaults to the day after the latest current feed date.",
    )
    parser.add_argument(
        "--end-date",
        help="Optional last digest date (YYYY-MM-DD). Defaults to today in --time-zone.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=36,
        help="Maximum number of fetched candidate items per digest date.",
    )
    parser.add_argument(
        "--max-backfill-days",
        type=int,
        default=3,
        help="Maximum number of local dates to process in one run when catching up automatically.",
    )
    parser.add_argument(
        "--min-daily-items",
        type=int,
        default=10,
        help="Target minimum number of visible stories for each processed digest date.",
    )
    parser.add_argument(
        "--max-per-tool-per-day",
        type=int,
        default=2,
        help="Base same-tool daily cap passed into the merge step.",
    )
    parser.add_argument(
        "--max-auto-per-tool-per-day",
        type=int,
        default=3,
        help="Maximum same-tool daily cap the merge step may auto-relax to.",
    )
    parser.add_argument(
        "--initial-catalog-expansion-feeds",
        type=int,
        default=4,
        help="Initial number of site-tool official feeds to activate when fetching sparse NEWS days.",
    )
    parser.add_argument(
        "--catalog-expansion-step",
        type=int,
        default=4,
        help="Number of additional site-tool official feeds to enable after each short run.",
    )
    parser.add_argument(
        "--max-catalog-expansion-feeds",
        type=int,
        default=24,
        help="Maximum number of site-tool official feeds the fetch step may activate while topping up a sparse day.",
    )
    parser.add_argument(
        "--skip-render-validation",
        action="store_true",
        help="Pass through to run_daily_news_task.py.",
    )
    return parser.parse_args()


def resolve_digest_zone(zone_name: str) -> tzinfo:
    try:
        return ZoneInfo(zone_name)
    except Exception as exc:  # pragma: no cover - depends on host tzdata
        fallback_zone = FIXED_TIME_ZONES.get(zone_name)
        if fallback_zone is not None:
            return fallback_zone
        raise ValueError(f"Unsupported time zone: {zone_name}") from exc


def resolve_date(raw_value: str | None, fallback_value: date) -> date:
    if not raw_value:
        return fallback_value
    return datetime.strptime(raw_value, "%Y-%m-%d").date()


def load_latest_feed_date() -> date | None:
    if not CURRENT_FEED_PATH.exists():
        return None

    payload = json.loads(CURRENT_FEED_PATH.read_text(encoding="utf-8"))
    groups = payload.get("groups")
    if not isinstance(groups, list) or not groups:
        return None

    parsed_dates = [
        datetime.strptime(str(group.get("date")), "%Y-%m-%d").date()
        for group in groups
        if isinstance(group, dict) and group.get("date")
    ]
    return max(parsed_dates, default=None)


def planned_dates(
    latest_feed_date: date | None,
    start_date: date | None,
    end_date: date,
    max_backfill_days: int,
) -> list[date]:
    if start_date is not None:
        first_date = start_date
    elif latest_feed_date is None:
        first_date = end_date
    elif latest_feed_date < end_date:
        first_date = latest_feed_date + timedelta(days=1)
    else:
        first_date = end_date

    if first_date > end_date:
        return []

    if max_backfill_days > 0:
        earliest_allowed_date = end_date - timedelta(days=max_backfill_days - 1)
        if first_date < earliest_allowed_date:
            first_date = earliest_allowed_date

    total_days = (end_date - first_date).days + 1
    return [first_date + timedelta(days=offset) for offset in range(total_days)]


def run_json_command(command: list[str]) -> dict[str, object]:
    completed = subprocess.run(command, cwd=ROOT, capture_output=True, text=True)
    if completed.returncode != 0:
        stderr = (completed.stderr or completed.stdout).strip()
        raise RuntimeError(f"Command failed ({completed.returncode}): {' '.join(command)}\n{stderr}")
    stdout = (completed.stdout or "").strip()
    if not stdout:
        return {}
    return json.loads(stdout)


def process_digest_date(run_date: date, args: argparse.Namespace) -> dict[str, object]:
    date_value = run_date.isoformat()
    expansion_budget = min(
        max(0, args.initial_catalog_expansion_feeds),
        max(0, args.max_catalog_expansion_feeds),
    )
    expansion_step = max(1, args.catalog_expansion_step)
    attempts = 0

    while True:
        attempts += 1
        fetch_command = [
            sys.executable,
            str(FETCH_SCRIPT_PATH),
            "--date",
            date_value,
            "--time-zone",
            args.time_zone,
            "--limit",
            str(args.limit),
            "--max-catalog-expansion-feeds",
            str(expansion_budget),
        ]
        if attempts > 1:
            fetch_command.append("--force-catalog-feed-expansion")
        merge_command = [
            sys.executable,
            str(MERGE_SCRIPT_PATH),
            "--date",
            date_value,
            "--min-daily-items",
            str(args.min_daily_items),
            "--max-per-tool-per-day",
            str(args.max_per_tool_per_day),
            "--max-auto-per-tool-per-day",
            str(args.max_auto_per_tool_per_day),
        ]
        if args.skip_render_validation:
            merge_command.append("--skip-render-validation")

        fetch_summary = run_json_command(fetch_command)
        merge_summary = run_json_command(merge_command)
        run_date_items = int(merge_summary.get("runDateItems") or 0)
        available_expansion_feeds = int(fetch_summary.get("catalogExpansionFeedsAvailable") or 0)
        current_feed_budget = int(fetch_summary.get("catalogExpansionFeedsConfigured") or expansion_budget)

        if run_date_items >= args.min_daily_items:
            return {
                "date": date_value,
                "attempts": attempts,
                "catalogExpansionFeedsConfigured": current_feed_budget,
                "catalogExpansionFeedsAvailable": available_expansion_feeds,
                "fetch": fetch_summary,
                "merge": merge_summary,
            }

        if available_expansion_feeds == 0 or current_feed_budget >= min(args.max_catalog_expansion_feeds, available_expansion_feeds):
            return {
                "date": date_value,
                "attempts": attempts,
                "catalogExpansionFeedsConfigured": current_feed_budget,
                "catalogExpansionFeedsAvailable": available_expansion_feeds,
                "fetch": fetch_summary,
                "merge": merge_summary,
            }

        expansion_budget = min(current_feed_budget + expansion_step, args.max_catalog_expansion_feeds)


def main() -> int:
    args = parse_args()
    digest_zone = resolve_digest_zone(args.time_zone)
    today_local = datetime.now(digest_zone).date()
    end_date = resolve_date(args.end_date, today_local)
    latest_feed_date = load_latest_feed_date()
    start_date = resolve_date(args.start_date, end_date) if args.start_date else None

    dates_to_process = planned_dates(
        latest_feed_date=latest_feed_date,
        start_date=start_date,
        end_date=end_date,
        max_backfill_days=args.max_backfill_days,
    )
    if not dates_to_process:
        raise RuntimeError("No NEWS digest dates were selected for processing.")

    results = [process_digest_date(run_date, args) for run_date in dates_to_process]

    print(
        json.dumps(
            {
                "latestFeedDate": latest_feed_date.isoformat() if latest_feed_date else None,
                "processDates": [run_date.isoformat() for run_date in dates_to_process],
                "timeZone": args.time_zone,
                "results": results,
            },
            ensure_ascii=False,
            indent=2,
        )
    )

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
