from backend.app.ingestion.market_data import get_prices
from backend.app.analytics.signals import summary

import argparse

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--ticker", default="XLK")
    args = parser.parse_args()

    df = get_prices(args.ticker, start="2016-01-01")
    prices = df["Close"]

    signals = summary(prices)
    print(signals.dropna().tail(1))


if __name__ == "__main__":
    main()