from __future__ import annotations

import asyncio

from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect

from .db import Database
from .engine import MvpEngine, WebSocketHub
from .models import PortfolioOut, RuleCreate, RuleOut, TradeOut

app = FastAPI(title="Sentidex Zero-Cost MVP", version="0.1.0")

db = Database()
hub = WebSocketHub()
engine = MvpEngine(db=db, hub=hub)


@app.on_event("startup")
async def startup() -> None:
    app.state.engine_task = asyncio.create_task(engine.run())


@app.on_event("shutdown")
async def shutdown() -> None:
    engine.running = False
    task = getattr(app.state, "engine_task", None)
    if task:
        await asyncio.wait([task], timeout=2)


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/rules", response_model=RuleOut)
def create_rule(rule: RuleCreate) -> dict:
    payload = rule.model_dump()
    rule_id = db.insert_rule(payload)
    return {"id": rule_id, **payload}


@app.get("/rules", response_model=list[RuleOut])
def list_rules() -> list[dict]:
    return db.list_rules()


@app.delete("/rules/{rule_id}")
def delete_rule(rule_id: int) -> dict:
    ok = db.delete_rule(rule_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Rule not found")
    return {"deleted": True}


@app.get("/portfolio", response_model=PortfolioOut)
def get_portfolio() -> dict:
    return engine.get_portfolio_summary()


@app.get("/trades", response_model=list[TradeOut])
def list_trades() -> list[dict]:
    return db.list_trades()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket) -> None:
    await hub.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        hub.disconnect(websocket)
