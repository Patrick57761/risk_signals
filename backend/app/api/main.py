from fastapi import FastAPI, HTTPException # type: ignore

from backend.app.ingestion.market_data import get_prices
from backend.app.analytics.signals import summary, technical_risk_score
from backend.app.analytics.final_score import final_score

from backend.app.psychology.fear_greed import get_fear_greed_index, fear_greed_scale

app = FastAPI(title="Risk Signals API")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/sector/{ticker}")
def sector_signals(ticker: str):
    try:
        # market data
        df = get_prices(ticker)
        df = df.set_index("Date")
        prices = df["Close"]

        # technical signals
        signals = summary(prices).dropna()
        latest = signals.iloc[-1]
        risk_score = technical_risk_score(latest)

        # fear greed
        fear_greed = get_fear_greed_index()

        # combined score
        final = final_score(risk_score, fear_greed_scale(fear_greed["value"]))

        return {
            "ticker": ticker.upper(),
            "date": latest.name.date().isoformat(),

            "technical": {
                "risk_score": float(risk_score),
                "volatility_regime": float(latest["volatility_regime"]),
                "trend_state": int(latest["trend_state"]),
                "momentum_state": int(latest["momentum_state"]),
                "trend_strength": float(latest["trend_strength"]),
                "momentum_strength": float(latest["momentum_strength"]),
            },

            "psychology": {
                "fear_greed": fear_greed
            },

            "final_score": final
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
