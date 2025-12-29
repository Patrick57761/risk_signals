from pathlib import Path

import yfinance as yf
import pandas as pd

REQUIRED_COLUMNS = ["Date", "Volume", "High", "Low", "Open", "Close"]

def get_prices(ticker: str, start: str = "2016-01-01") -> pd.DataFrame:
    df = yf.download(ticker, start = start, progress = False)
    df.reset_index(inplace=True)
    df.columns = df.columns.get_level_values(0)
    return df

def validate_prices(df: pd.DataFrame) -> None:
    # Check empty
    if df.empty:
        raise ValueError("Empty data")

    missing_cols = [col for col in REQUIRED_COLUMNS if col not in df.columns]
    if missing_cols:
        raise ValueError(f"Missing required columns: {missing_cols}")

    # Check correct type
    if not pd.api.types.is_datetime64_any_dtype(df["Date"]):
        raise ValueError("Invalid date(s)")

    numeric_cols = ["Open", "High", "Low", "Close", "Volume"]
    for col in numeric_cols:
        if not pd.api.types.is_numeric_dtype(df[col]):
            raise ValueError(f"Column {col} is not numeric")
        

PROJECT_ROOT = Path(__file__).resolve().parents[3]
RAW_DATA_DIR = PROJECT_ROOT / "data" / "raw"

def save_prices(df: pd.DataFrame, ticker: str) -> None:
    RAW_DATA_DIR.mkdir(parents=True, exist_ok=True)
    output_path = RAW_DATA_DIR / f"{ticker}_daily.csv"
    df.to_csv(output_path, index=False)