from __future__ import annotations

import json
import sqlite3
from pathlib import Path
from typing import Any

DB_PATH = Path("data/mvp.sqlite3")


class Database:
    def __init__(self, path: Path = DB_PATH):
        self.path = path
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.conn = sqlite3.connect(self.path, check_same_thread=False)
        self.conn.row_factory = sqlite3.Row
        self._init_schema()

    def _init_schema(self) -> None:
        cur = self.conn.cursor()
        cur.executescript(
            """
            CREATE TABLE IF NOT EXISTS rules (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                instrument TEXT NOT NULL,
                enabled INTEGER NOT NULL,
                conditions TEXT NOT NULL,
                action TEXT NOT NULL,
                units INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS trades (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ts TEXT NOT NULL,
                instrument TEXT NOT NULL,
                side TEXT NOT NULL,
                units INTEGER NOT NULL,
                price REAL NOT NULL,
                pnl REAL NOT NULL
            );
            """
        )
        self.conn.commit()

    def insert_rule(self, data: dict[str, Any]) -> int:
        cur = self.conn.cursor()
        cur.execute(
            """
            INSERT INTO rules(name, instrument, enabled, conditions, action, units)
            VALUES(?, ?, ?, ?, ?, ?)
            """,
            (
                data["name"],
                data["instrument"],
                int(data["enabled"]),
                json.dumps(data["conditions"]),
                data["action"],
                data["units"],
            ),
        )
        self.conn.commit()
        return int(cur.lastrowid)

    def list_rules(self) -> list[dict[str, Any]]:
        rows = self.conn.execute("SELECT * FROM rules ORDER BY id").fetchall()
        return [
            {
                "id": row["id"],
                "name": row["name"],
                "instrument": row["instrument"],
                "enabled": bool(row["enabled"]),
                "conditions": json.loads(row["conditions"]),
                "action": row["action"],
                "units": row["units"],
            }
            for row in rows
        ]

    def delete_rule(self, rule_id: int) -> bool:
        cur = self.conn.cursor()
        cur.execute("DELETE FROM rules WHERE id = ?", (rule_id,))
        self.conn.commit()
        return cur.rowcount > 0

    def insert_trade(self, ts: str, instrument: str, side: str, units: int, price: float, pnl: float) -> int:
        cur = self.conn.cursor()
        cur.execute(
            """
            INSERT INTO trades(ts, instrument, side, units, price, pnl)
            VALUES(?, ?, ?, ?, ?, ?)
            """,
            (ts, instrument, side, units, price, pnl),
        )
        self.conn.commit()
        return int(cur.lastrowid)

    def list_trades(self) -> list[dict[str, Any]]:
        rows = self.conn.execute("SELECT * FROM trades ORDER BY id DESC LIMIT 200").fetchall()
        return [dict(row) for row in rows]
