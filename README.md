# Sentidex Zero-Cost MVP Backend

Single-process FastAPI backend implementing the architecture in `docs/architecture/trading-automation-backend-architecture.md`.

## Features

- Simulated forex price ingestion (MVP stand-in for OANDA practice stream)
- In-memory queue event bus
- Indicator engine (RSI, EMA, MACD)
- JSON rule engine (`BUY` / `SELL` / `ALERT`)
- Paper trading simulation with portfolio tracking
- SQLite persistence for rules and trades
- REST + WebSocket API

## Run

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Example rule

```bash
curl -X POST http://127.0.0.1:8000/rules \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "RSI dip buy",
    "instrument": "EUR_USD",
    "conditions": {"rsi_lt": 30, "price_gt_ema": true},
    "action": "BUY",
    "units": 1000
  }'
```

## Useful endpoints

- `GET /health`
- `GET /rules`
- `GET /portfolio`
- `GET /trades`
- `WS /ws`
