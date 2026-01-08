import requests
from functools import lru_cache

from backend.app.utils.cache_time import current_macro_date

# https://edition.cnn.com/markets/fear-and-greed
CNN_FEAR_GREED_URL = "https://production.dataviz.cnn.io/index/fearandgreed/graphdata"
"""

{
  "fear_and_greed": {
    "score": 50.9428571428571,
    "rating": "neutral",
    "timestamp": "2026-01-07T18:52:06+00:00",
    "previous_close": 52.1142857142857,
    "previous_1_week": 44,
    "previous_1_month": 38.1428571428571,
    "previous_1_year": 34.3142857142857
  },
  ...

  """

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept": "application/json",
    "Referer": "https://edition.cnn.com/markets/fear-and-greed",
}

@lru_cache(maxsize=14)
def fetch_fear_greed(macro_date: str) -> dict:
    response = requests.get(CNN_FEAR_GREED_URL, headers=HEADERS, timeout=5)
    response.raise_for_status()
    data = response.json()

    latest = data["fear_and_greed"]["score"]
    label = data["fear_and_greed"]["rating"]

    return {
        "value": int(latest),
        "label": label,
        "source": "CNN"
    }

def get_fear_greed_index() -> dict:
    macro_date = current_macro_date()

    return fetch_fear_greed(macro_date)

# Scale from 0-100 to -100 100
def fear_greed_scale(value: int) -> float:
    return (value - 50) * 2