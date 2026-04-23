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
        default=7,
        help="Maximum number of local dates to process in one run when catching up automatically.",
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


def run_command(command: list[str]) -> None:
    completed = subprocess.run(command, cwd=ROOT, text=True)
    if completed.returncode != 0:
        raise RuntimeError(f"Command failed ({completed.returncode}): {' '.join(command)}")


def process_digest_date(run_date: date, args: argparse.Namespace) -> None:
    date_value = run_date.isoformat()

    fetch_command = [
        sys.executable,
        str(FETCH_SCRIPT_PATH),
        "--date",
        date_value,
        "--time-zone",
        args.time_zone,
        "--limit",
        str(args.limit),
    ]
    merge_command = [
        sys.executable,
        str(MERGE_SCRIPT_PATH),
        "--date",
        date_value,
    ]
    if args.skip_render_validation:
        merge_command.append("--skip-render-validation")

    run_command(fetch_command)
    run_command(merge_command)


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

    print(
        json.dumps(
            {
                "latestFeedDate": latest_feed_date.isoformat() if latest_feed_date else None,
                "processDates": [run_date.isoformat() for run_date in dates_to_process],
                "timeZone": args.time_zone,
            },
            ensure_ascii=False,
            indent=2,
        )
    )

    for run_date in dates_to_process:
        process_digest_date(run_date, args)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
