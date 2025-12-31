# Risk Signals

A modular market analytics framework for sector-level risk regime assessment using interpretable technical indicators.

## Overview

Risk Signals provides quantitative context for market sectors through momentum, trend, and volatility analysis. Designed for accessibility, the system focuses on sector ETFs rather than individual stocks to reduce noise and complexity. The framework emphasizes contextual risk assessment over price prediction, identifying when sectors appear overextended, oversold, or in transition.

## Architecture

**Ingestion Layer** (`backend/app/ingestion/`)
- Market data fetching via Yahoo Finance API
- Data validation and type enforcement
- Persistent local storage

**Analytics Engine** (`backend/app/analytics/`)
- Returns and volatility calculation
- Technical indicators (SMA, EMA, RSI, ATR)
- Risk signal generation and regime classification

**Data Pipeline** (`data/`)
- Raw OHLCV storage
- Processed datasets with normalized schemas

**API Layer** (in progress)
- RESTful endpoints for risk state queries
- Historical signal retrieval

**Frontend** (planned)
- Sector visualization and comparison
- Risk regime dashboards

## Technical Approach

The framework computes three signal dimensions:

**Momentum State** — RSI identifies overextension through price momentum analysis

**Trend State** — Moving average relationships classify directional regimes

**Volatility Regime** — Short-term to long-term volatility ratio detects risk expansion or compression

Signals are combined into a unified risk summary that emphasizes explanation over prediction.

## Project Structure

```
risk-signals/
├── backend/
│   └── app/
│       ├── ingestion/          # Data fetching and validation
│       ├── analytics/          # Indicators and signals
│       ├── api/                # REST endpoints (in progress)
│       └── services/           # Orchestration layer (planned)
├── data/
│   ├── raw/                    # Market data
│   └── processed/              # Normalized datasets
└── frontend/                   # UI (planned)
```

## Technology Stack

- Python 3.13
- pandas (time series operations)
- yfinance (market data)
- NumPy (numerical computation)

## Installation

```bash
python -m venv .venv && source .venv/bin/activate
pip install yfinance pandas numpy jupyter matplotlib
```

## Usage

```python
from backend.app.ingestion.market_data import get_prices, validate_prices
from backend.app.analytics.signals import risk_summary

data = get_prices("XLK", start="2020-01-01")
validate_prices(data)
signals = risk_summary(data)
```

## Disclaimer

This project is for educational and analytical purposes only and does not constitute financial advice.

## License

Provided for educational purposes.
