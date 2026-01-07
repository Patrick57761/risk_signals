import requests
from datetime import datetime, timezone
from functools import lru_cache

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

@lru_cache(maxsize=1)
def get_fear_greed_index() -> dict:
    response = requests.get(CNN_FEAR_GREED_URL, timeout=5)
    response.raise_for_status()
    data = response.json()

    latest = data["fear_and_greed"]["score"]
    label = data["fear_and_greed"]["rating"]

    return {
        "value": int(latest),
        "label": label,
        "as_of_date": datetime.now(timezone.utc).isoformat(),
        "source": "CNN"
    }
