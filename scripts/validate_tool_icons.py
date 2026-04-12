from __future__ import annotations

import hashlib
import json
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
ICON_DIR = ROOT / "assets" / "tool-icons"
MANIFEST_PATH = ICON_DIR / "manifest.json"

SIGNATURE_FORMATS = {
    b"\x89PNG\r\n\x1a\n": ".png",
    b"\x00\x00\x01\x00": ".ico",
    b"\x00\x00\x02\x00": ".ico",
    b"\xff\xd8\xff": ".jpg",
}

CONTENT_TYPES = {
    ".png": "image/png",
    ".ico": "image/x-icon",
    ".svg": "image/svg+xml",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
}

PLACEHOLDER_HASHES = {
    "07aaae3ff76ed11b42238f377b43b3d8cf93870d6cf13c9db8b10589b2ff9559",
    "9de0b40a6e33b7b37cb418da7f94cef001eebe91e6ce9ccc4c8e85ed278953e2",
    "4cb0c7d8ceccaa1b967464fa6665657e641c288ccc6a841909a15c7435a0a1ea",
}

FORMAT_RANK = {
    ".png": 0,
    ".svg": 1,
    ".webp": 2,
    ".jpg": 3,
    ".jpeg": 3,
    ".ico": 4,
}


def read_manifest() -> dict[str, dict[str, str]]:
    return json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))


def looks_like_html(payload: bytes) -> bool:
    head = payload[:128].lstrip().lower()
    return head.startswith(b"<!doctype html") or head.startswith(b"<html")


def looks_like_svg(payload: bytes) -> bool:
    head = payload[:256].lstrip().lower()
    return (
        head.startswith(b"<svg")
        or head.startswith(b"<?xml")
        or head.startswith(b"<!doctype svg")
        or b"<svg" in head
    )


def detect_format(path: Path) -> str | None:
    if not path.exists() or not path.is_file():
        return None
    data = path.read_bytes()
    if not data or looks_like_html(data):
        return None
    if len(data) >= 12 and data.startswith(b"RIFF") and data[8:12] == b"WEBP":
        return ".webp"
    for signature, detected in SIGNATURE_FORMATS.items():
        if data.startswith(signature):
            return detected
    if looks_like_svg(data):
        return ".svg"
    return path.suffix.lower() or None


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def is_placeholder_svg(path: Path) -> bool:
    try:
        text = path.read_text(encoding="utf-8", errors="ignore")
    except OSError:
        return False
    return (
        'linearGradient id="g"' in text
        and 'text-anchor="middle"' in text
        and 'dominant-baseline="middle"' in text
        and 'font-family="Arial, sans-serif"' in text
        and "fill=\"white\"" in text
        and '<rect width="128" height="128" rx="34" fill="url(#g)"/>' in text
    )


def is_placeholder_asset(path: Path, detected_format: str | None) -> bool:
    if not detected_format:
        return False
    if detected_format == ".svg":
        return is_placeholder_svg(path)
    if detected_format in {".png", ".webp", ".jpg", ".jpeg"}:
        return sha256(path) in PLACEHOLDER_HASHES
    return False


def normalize_candidate(path: Path, detected_format: str) -> Path:
    if path.suffix.lower() == detected_format:
        return path
    normalized = path.with_suffix(detected_format)
    if normalized.exists() and detect_format(normalized) == detected_format:
        return normalized
    shutil.copyfile(path, normalized)
    return normalized


def candidate_files(tool_id: str, entry: dict[str, str]) -> list[Path]:
    names = {entry.get("file"), entry.get("fallback")}
    names.update(path.name for path in ICON_DIR.glob(f"{tool_id}.*"))
    candidates = []
    for name in names:
        if not name:
            continue
        path = ICON_DIR / name
        if path.exists() and path.is_file():
            candidates.append(path)
    return sorted(candidates)


def pick_best_candidate(tool_id: str, entry: dict[str, str]) -> tuple[Path | None, str | None, bool]:
    best: tuple[tuple[int, int, int, str], Path, str] | None = None
    fallback_name = entry.get("fallback")
    for path in candidate_files(tool_id, entry):
        detected = detect_format(path)
        if not detected:
            continue
        is_placeholder = is_placeholder_asset(path, detected)
        rank = (
            1 if is_placeholder else 0,
            1 if path.name == fallback_name else 0,
            FORMAT_RANK.get(detected, 99),
            path.name,
        )
        if best is None or rank < best[0]:
            best = (rank, path, detected)
    if not best:
        return None, None, False
    _, path, detected = best
    normalized = normalize_candidate(path, detected)
    return normalized, detected, is_placeholder_asset(normalized, detected)


def local_url(filename: str) -> str:
    return f"local://assets/tool-icons/{filename}"


def repair_entry(tool_id: str, entry: dict[str, str]) -> bool:
    changed = False
    best_path, detected_format, is_placeholder = pick_best_candidate(tool_id, entry)

    if best_path and detected_format:
        expected_type = CONTENT_TYPES.get(detected_format)
        if entry.get("file") != best_path.name:
            entry["file"] = best_path.name
            changed = True
        if expected_type and entry.get("content_type") != expected_type:
            entry["content_type"] = expected_type
            changed = True
        expected_source = "local-fallback" if is_placeholder else "local"
        if entry.get("source") != expected_source:
            entry["source"] = expected_source
            changed = True
        expected_url = local_url(best_path.name)
        if entry.get("url") != expected_url:
            entry["url"] = expected_url
            changed = True
        return changed

    if "content_type" in entry:
        del entry["content_type"]
        changed = True
    if "file" in entry:
        del entry["file"]
        changed = True
    if entry.get("source") != "missing":
        entry["source"] = "missing"
        changed = True
    if entry.get("url") != "local://missing":
        entry["url"] = "local://missing"
        changed = True
    return changed


def main() -> None:
    manifest = read_manifest()
    changed_ids: list[str] = []
    for tool_id, entry in manifest.items():
        if repair_entry(tool_id, entry):
            changed_ids.append(tool_id)

    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Validated {len(manifest)} icon entries.")
    if changed_ids:
        print("Repaired entries:")
        for tool_id in changed_ids:
            print(f" - {tool_id}")
    else:
        print("No repairs needed.")


if __name__ == "__main__":
    main()
