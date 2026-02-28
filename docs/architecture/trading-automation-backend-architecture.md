# Trading Automation Platform — Zero-Cost MVP Backend Architecture

## 1. Purpose and Scope

This document defines the **$0 MVP backend architecture** for validating the trading automation product quickly.

The MVP is intentionally constrained to prove only core product value:

- Users can create simple workflow rules.
- Rules evaluate correctly on live-ish market data.
- Signals can be paper-executed and logged.

This version explicitly avoids production-scale infrastructure until there is real user validation.

---

## 2. Build / Do-Not-Build Boundaries

### Build now (MVP)

- Workflow/rule engine (core value)
- Basic forex market ingestion from free sources
- Paper trading simulation
- Python backend in a single local process

### Do **not** build yet

- Kafka clusters
- Kubernetes
- Paid broker execution
- High-frequency / ultra-low-latency infrastructure
- Complex microservice decomposition

These are post-validation concerns.

---

## 3. Free Market Data Strategy

### Recommended primary source

- **OANDA practice account stream**
  - Free practice environment
  - Realistic forex ticks
  - Good fit for paper trading flows

### Optional fallback/additional sources

- Alpha Vantage (free tier, rate-limited)
- Twelve Data (free tier)

For MVP speed and realism, prefer OANDA practice first.

---

## 4. MVP Technology Stack (100% Free)

- **Language**: Python
- **Backend framework**: FastAPI
- **Realtime transport**: WebSockets
- **Data processing**: pandas, numpy, pandas-ta
- **Storage**: SQLite (`sqlite3` built in)
- **Runtime target**: Local machine (single process)

Install baseline dependencies:

```bash
pip install fastapi uvicorn pandas numpy websockets pandas-ta
```

This stack intentionally replaces Kafka/Redis/microservices for the MVP phase.

---

## 5. Minimal Local Architecture

Single-process event flow:

```text
Price Feed -> Indicator Logic -> Rule Engine -> Paper Execution -> Web UI
```

### In-memory event bus (Kafka replacement)

```python
from queue import Queue

event_bus = Queue()
```

This is sufficient for local testing and product validation.

---

## 6. Core MVP Components

## 6.1 Price Ingestion

Responsibilities:

- Connect to OANDA practice stream.
- Normalize incoming ticks into a simple internal event schema.
- Push events into the in-memory queue.

Output example fields:

- `instrument`
- `bid`
- `ask`
- `timestamp`

## 6.2 Indicator Engine

Responsibilities:

- Maintain a rolling local history per instrument.
- Compute indicators with `pandas-ta`.

MVP indicators:

- RSI
- EMA / moving averages
- MACD

## 6.3 Rule Engine

Responsibilities:

- Load user rules stored as JSON.
- Evaluate trigger + condition logic on each incoming event.
- Emit signal events (`BUY`, `SELL`, `ALERT`).

Example MVP rule:

```text
IF RSI < 30 AND price > EMA: BUY
```

## 6.4 Paper Trading Engine

Responsibilities:

- Simulate instant fills when rules trigger.
- Update virtual balance and positions.
- Track realized/unrealized PnL.
- Persist trade logs to SQLite.

Example in-memory portfolio state:

```python
portfolio = {
    "balance": 10000,
    "positions": []
}
```

## 6.5 API + WebSocket Layer

Responsibilities:

- Expose REST endpoints for rules, positions, and history.
- Broadcast price/signal/trade updates over WebSocket.

Note: For strict MVP scope, a dashboard is optional; backend validation can run via logs + API responses.

## 6.6 Persistence Layer (SQLite)

Use SQLite for:

- Rules
- Paper orders/trades
- Position snapshots
- Basic event logs

No PostgreSQL, TimescaleDB, Redis, or MongoDB is required at this stage.

---

## 7. Deployment Model (MVP)

Primary target:

- One process
- One machine
- Local development environment

Optional free hosting later:

- Render free tier
- Railway free tier
- Fly.io free tier

Online deployment is optional; local validation is enough for the MVP milestone.

---

## 8. $0 MVP Implementation Sequence

1. **Price Feed (2–3 hours)**
   - Connect to OANDA practice stream.
   - Log ticks.

2. **Indicators (1 day)**
   - Add RSI + moving averages (and optionally MACD).

3. **Rule Engine (1–2 days)**
   - Parse/evaluate JSON rules.
   - Emit buy/sell/alert signals.

4. **Paper Trading (1 day)**
   - Simulate positions and PnL.
   - Record trade history in SQLite.

5. **Basic UI/inspection layer (1 day)**
   - Show price, signals, and paper trades (or inspect through API/logs).

Expected result: a working automation core at zero infrastructure cost.

---

## 9. What This MVP Must Prove

Success criteria:

- Users can build and save workflow rules.
- Signals trigger correctly and consistently.
- Paper execution behavior is understandable.
- Product flow is intuitive enough to use.

Not required for MVP success:

- Microservices
- Kafka
- Kubernetes
- Multi-broker execution
- Sub-100ms production latency guarantees

---

## 10. Post-Validation Upgrade Path

Only after user validation, progressively add:

1. Managed message bus (Kafka/NATS/Redis Streams)
2. Service separation (ingestion, rules, execution)
3. PostgreSQL/TimescaleDB for scale analytics
4. Real broker execution beyond paper mode
5. Kubernetes and advanced observability

This sequencing minimizes cost and engineering drag before product-market learning.
