import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
LEDGER_FILE = BASE_DIR / "data" / "trust_ledger.json"


def ensure_ledger_file():
    LEDGER_FILE.parent.mkdir(parents=True, exist_ok=True)

    if not LEDGER_FILE.exists():
        LEDGER_FILE.write_text(
            "[]",
            encoding="utf-8",
        )


def load_ledger():
    ensure_ledger_file()

    try:
        return json.loads(
            LEDGER_FILE.read_text(
                encoding="utf-8"
            )
        )
    except (json.JSONDecodeError, OSError):
        return []


def save_ledger(ledger):
    ensure_ledger_file()

    LEDGER_FILE.write_text(
        json.dumps(
            ledger,
            indent=2,
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )


def calculate_hash(
    action,
    timestamp,
    metadata,
    previous_hash,
):
    payload = {
        "action": action,
        "timestamp": timestamp,
        "metadata": metadata,
        "previous_hash": previous_hash,
    }

    serialized = json.dumps(
        payload,
        sort_keys=True,
        separators=(",", ":"),
        ensure_ascii=False,
    )

    return hashlib.sha256(
        serialized.encode("utf-8")
    ).hexdigest()


def record_action(
    action,
    metadata=None,
):
    ledger = load_ledger()

    timestamp = datetime.now(
        timezone.utc
    ).isoformat()

    previous_hash = (
        ledger[-1]["current_hash"]
        if ledger
        else "GENESIS"
    )

    metadata = metadata or {}

    current_hash = calculate_hash(
        action=action,
        timestamp=timestamp,
        metadata=metadata,
        previous_hash=previous_hash,
    )

    record = {
        "id": len(ledger) + 1,
        "action": action,
        "timestamp": timestamp,
        "metadata": metadata,
        "previous_hash": previous_hash,
        "current_hash": current_hash,
    }

    ledger.append(record)

    save_ledger(ledger)

    return record


def verify_chain():
    ledger = load_ledger()

    if not ledger:
        return {
            "valid": True,
            "records": 0,
            "message": "No ledger records yet.",
        }

    for index, record in enumerate(ledger):

        expected_previous_hash = (
            ledger[index - 1]["current_hash"]
            if index > 0
            else "GENESIS"
        )

        if record["previous_hash"] != expected_previous_hash:
            return {
                "valid": False,
                "records": len(ledger),
                "failed_record": record["id"],
                "message": (
                    "Chain integrity failed: "
                    "previous hash does not match."
                ),
            }

        expected_current_hash = calculate_hash(
            action=record["action"],
            timestamp=record["timestamp"],
            metadata=record["metadata"],
            previous_hash=record["previous_hash"],
        )

        if record["current_hash"] != expected_current_hash:
            return {
                "valid": False,
                "records": len(ledger),
                "failed_record": record["id"],
                "message": (
                    "Chain integrity failed: "
                    "record data has been modified."
                ),
            }

    return {
        "valid": True,
        "records": len(ledger),
        "message": "All records are authentic.",
    }


def get_ledger():
    return load_ledger()