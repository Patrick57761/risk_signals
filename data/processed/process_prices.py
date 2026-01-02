from pathlib import Path
import pandas as pd

PROJECT_ROOT = Path(__file__).resolve().parents[2]
RAW_DATA_DIR = PROJECT_ROOT / "data" / "raw"
PROCESSED_DATA_DIR = PROJECT_ROOT / "data" / "processed"

def load_prices(ticker: str) -> pd.DataFrame:
    path = RAW_DATA_DIR / f"{ticker}_daily.csv"
    if not path.exists():
        raise ValueError("Raw data doesn't exist")
    df = pd.read_csv(path)
    df["Date"] = pd.to_datetime(df["Date"])
    return df

def process_prices(df: pd.DataFrame) -> pd.DataFrame:
    # no processing needed
    return df

def save_processed(df: pd.DataFrame, ticker: str) -> None:
    PROCESSED_DATA_DIR.mkdir(parents = True, exist_ok = True)
    output_path = PROCESSED_DATA_DIR / f"{ticker}_processed.csv"
    df.to_csv(output_path)