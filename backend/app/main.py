import argparse

from backend.app.ingestion.market_data import get_prices
from backend.app.analytics.signals import summary


def main():
    parser = argparse.ArgumentParser(
        description="Run sector-level risk signal analysis"
    )

    parser.add_argument(
        "--ticker",
        type=str,
        default="XLK",
        help="Sector ETF ticker (e.g. XLK, XLF, XLV, SPY)",
    )

    parser.add_argument(
        "--start",
        type=str,
        default="2015-01-01",
        help="Start date (YYYY-MM-DD)",
    )

    args = parser.parse_args()

    df = get_prices(args.ticker, start=args.start)
    prices = df["Close"]

    signals = summary(prices).dropna()
    latest = signals.iloc[-1]

    print("Summary")
    print(f"Ticker: {args.ticker}")
    print(f"Start Date: {args.start}")
    print("----------------------------")
    print(latest)


if __name__ == "__main__":
    main()