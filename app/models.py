from __future__ import annotations

from dataclasses import dataclass, field
from typing import Literal

from pydantic import BaseModel, Field


class RuleCreate(BaseModel):
    name: str
    instrument: str = "EUR_USD"
    enabled: bool = True
    # Example: {"rsi_lt": 30, "price_gt_ema": true}
    conditions: dict = Field(default_factory=dict)
    action: Literal["BUY", "SELL", "ALERT"] = "BUY"
    units: int = 1000


class RuleOut(RuleCreate):
    id: int


class TradeOut(BaseModel):
    id: int
    ts: str
    instrument: str
    side: str
    units: int
    price: float
    pnl: float


class PortfolioOut(BaseModel):
    balance: float
    open_positions: dict[str, int]
    realized_pnl: float


@dataclass
class TickEvent:
    instrument: str
    bid: float
    ask: float
    timestamp: float


@dataclass
class IndicatorSnapshot:
    rsi: float | None = None
    ema: float | None = None
    macd: float | None = None


@dataclass
class SignalEvent:
    rule_id: int
    instrument: str
    side: Literal["BUY", "SELL", "ALERT"]
    units: int
    price: float
    metadata: dict = field(default_factory=dict)
