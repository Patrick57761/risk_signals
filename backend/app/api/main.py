from fastapi import FastAPI, HTTPException

from backend.app.ingestion.market_data import get_prices
from backend.app.analytics.signals import summary

app = FastAPI(title="Risk Signals API")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/sector/{ticker}")
def sector_signals(ticker: str):
    try:
        df = get_prices(ticker, start="2016-01-01")
        prices = df["Close"]

        signals = summary(prices).dropna()
        latest = signals.iloc[-1]

        return {
            "ticker": ticker.upper(),
            "date": str(latest.name),
            "volatility_regime": float(latest["volatility_regime"]),
            "trend_state": int(latest["trend_state"]),
            "momentum_state": int(latest["momentum_state"]),
            "trend_strength": float(latest["trend_strength"]),
            "momentum_strength": float(latest["momentum_strength"])
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
