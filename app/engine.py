from __future__ import annotations

import asyncio
import random
from collections import defaultdict, deque
from dataclasses import asdict
from datetime import datetime, timezone
from queue import Queue
from typing import Any

from .db import Database
from .models import IndicatorSnapshot, SignalEvent, TickEvent


class WebSocketHub:
    def __init__(self) -> None:
        self.connections = set()

    async def connect(self, websocket) -> None:
        await websocket.accept()
        self.connections.add(websocket)

    def disconnect(self, websocket) -> None:
        self.connections.discard(websocket)

    async def broadcast(self, payload: dict[str, Any]) -> None:
        dead = []
        for ws in self.connections:
            try:
                await ws.send_json(payload)
            except Exception:
                dead.append(ws)
        for ws in dead:
            self.disconnect(ws)


class MvpEngine:
    def __init__(self, db: Database, hub: WebSocketHub):
        self.db = db
        self.hub = hub
        self.event_bus: Queue[TickEvent] = Queue()
        self.portfolio = {
            "balance": 10000.0,
            "open_positions": defaultdict(int),
            "avg_price": defaultdict(float),
            "realized_pnl": 0.0,
        }
        self.price_history: dict[str, deque[float]] = defaultdict(lambda: deque(maxlen=200))
        self.running = False

    async def run(self) -> None:
        self.running = True
        await asyncio.gather(self._price_feed_loop(), self._pipeline_loop())

    async def _price_feed_loop(self) -> None:
        prices = {"EUR_USD": 1.0850}
        while self.running:
            await asyncio.sleep(1)
            for instrument, px in list(prices.items()):
                move = random.uniform(-0.0004, 0.0004)
                next_px = max(px + move, 0.0001)
                prices[instrument] = next_px
                tick = TickEvent(
                    instrument=instrument,
                    bid=round(next_px - 0.00005, 5),
                    ask=round(next_px + 0.00005, 5),
                    timestamp=asyncio.get_event_loop().time(),
                )
                self.event_bus.put(tick)

    async def _pipeline_loop(self) -> None:
        while self.running:
            if self.event_bus.empty():
                await asyncio.sleep(0.05)
                continue

            tick = self.event_bus.get()
            mid = (tick.bid + tick.ask) / 2
            indicators = self._update_indicators(tick.instrument, mid)
            await self.hub.broadcast({"type": "tick", "data": asdict(tick), "indicators": asdict(indicators)})

            for rule in self.db.list_rules():
                if not rule["enabled"] or rule["instrument"] != tick.instrument:
                    continue
                signal = self._evaluate_rule(rule, mid, indicators)
                if signal:
                    await self._handle_signal(signal)

    def _update_indicators(self, instrument: str, price: float) -> IndicatorSnapshot:
        h = self.price_history[instrument]
        h.append(price)
        values = list(h)
        ema = None
        if len(values) >= 10:
            alpha = 2 / (10 + 1)
            e = values[0]
            for v in values[1:]:
                e = alpha * v + (1 - alpha) * e
            ema = e

        rsi = None
        if len(values) >= 15:
            gains = []
            losses = []
            for i in range(-14, 0):
                d = values[i] - values[i - 1]
                gains.append(max(d, 0))
                losses.append(max(-d, 0))
            avg_gain = sum(gains) / 14
            avg_loss = sum(losses) / 14
            if avg_loss == 0:
                rsi = 100.0
            else:
                rs = avg_gain / avg_loss
                rsi = 100 - (100 / (1 + rs))

        macd = None
        if len(values) >= 26:
            macd = self._ema(values, 12) - self._ema(values, 26)

        return IndicatorSnapshot(rsi=rsi, ema=ema, macd=macd)

    @staticmethod
    def _ema(values: list[float], period: int) -> float:
        alpha = 2 / (period + 1)
        out = values[0]
        for v in values[1:]:
            out = alpha * v + (1 - alpha) * out
        return out

    def _evaluate_rule(self, rule: dict[str, Any], price: float, indicators: IndicatorSnapshot) -> SignalEvent | None:
        conds = rule["conditions"]
        if "rsi_lt" in conds:
            if indicators.rsi is None or indicators.rsi >= float(conds["rsi_lt"]):
                return None
        if conds.get("price_gt_ema"):
            if indicators.ema is None or price <= indicators.ema:
                return None
        if conds.get("price_lt_ema"):
            if indicators.ema is None or price >= indicators.ema:
                return None

        return SignalEvent(
            rule_id=rule["id"],
            instrument=rule["instrument"],
            side=rule["action"],
            units=rule["units"],
            price=price,
            metadata={"conditions": conds},
        )

    async def _handle_signal(self, signal: SignalEvent) -> None:
        await self.hub.broadcast({"type": "signal", "data": asdict(signal)})
        if signal.side == "ALERT":
            return

        pos = self.portfolio["open_positions"][signal.instrument]
        avg = self.portfolio["avg_price"][signal.instrument]
        signed_units = signal.units if signal.side == "BUY" else -signal.units

        pnl = 0.0
        if pos != 0 and (pos > 0 > signed_units or pos < 0 < signed_units):
            close_units = min(abs(pos), abs(signed_units))
            direction = 1 if pos > 0 else -1
            pnl = (signal.price - avg) * close_units * direction
            self.portfolio["balance"] += pnl
            self.portfolio["realized_pnl"] += pnl

        new_pos = pos + signed_units
        if new_pos != 0:
            if pos == 0 or (pos > 0 and signed_units > 0) or (pos < 0 and signed_units < 0):
                self.portfolio["avg_price"][signal.instrument] = (
                    ((abs(pos) * avg) + (abs(signed_units) * signal.price)) / abs(new_pos)
                    if pos != 0
                    else signal.price
                )
        else:
            self.portfolio["avg_price"][signal.instrument] = 0.0

        self.portfolio["open_positions"][signal.instrument] = new_pos

        trade_id = self.db.insert_trade(
            ts=datetime.now(timezone.utc).isoformat(),
            instrument=signal.instrument,
            side=signal.side,
            units=signal.units,
            price=signal.price,
            pnl=round(pnl, 5),
        )
        await self.hub.broadcast({"type": "trade", "data": {"id": trade_id, "pnl": pnl}})

    def get_portfolio_summary(self) -> dict[str, Any]:
        return {
            "balance": round(self.portfolio["balance"], 2),
            "open_positions": {k: v for k, v in self.portfolio["open_positions"].items() if v != 0},
            "realized_pnl": round(self.portfolio["realized_pnl"], 5),
        }
