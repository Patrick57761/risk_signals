import pandas as pd

from .returns import compute_returns
from .volatility import compute_volatility
from .indicators import sma, rsi

# volatiility ratio for month / year
def volatility_regime(price: pd.Series, short_window: int = 20, long_window: int = 252) -> pd.Series:
    returns = compute_returns(price)

    short_vol = compute_volatility(returns, short_window)
    long_vol = compute_volatility(returns, long_window)

    return short_vol / long_vol

# 50sma vs 200sma
def trend_strength(price: pd.Series, fast_window: int = 50, slow_window: int = 200) -> pd.Series:
    fast = sma(price, fast_window)
    slow = sma(price, slow_window)
    return (fast - slow) / slow

def trend_state(price: pd.Series, fast_window: int = 50, slow_window: int = 200) -> pd.Series:
    fast = sma(price, fast_window)
    slow = sma(price, slow_window)

    state = pd.Series(index=price.index, dtype="float")
    state[fast > slow] = 1
    state[fast < slow] = -1
    state[fast == slow] = 0

    return state

# RSI above or below thresholds
def momentum_strength(price: pd.Series, window: int = 14, upper: int = 70, lower: int = 30) -> pd.Series:
    momentum = rsi(price, window)
    return (momentum - 50) / 50

def momentum_state(price: pd.Series, window: int = 14, upper: int = 70, lower: int = 30) -> pd.Series:
    momentum = rsi(price, window)

    state = pd.Series(index=price.index, dtype="float")
    state[momentum > upper] = 1
    state[momentum < lower] = -1
    state[(momentum <= upper) & (momentum >= lower)] = 0

    return state


def summary(price: pd.Series) -> pd.DataFrame:
    return pd.DataFrame(
        {
            "volatility_regime": volatility_regime(price),
            "trend_state": trend_state(price),
            "momentum_state": momentum_state(price),
            "trend_strength": trend_strength(price),
            "momentum_strength": momentum_strength(price)
        }
    )

# -100 to 100
def technical_risk_score(row: pd.Series) -> float:
    vol_norm = min(row["volatility_regime"] / 2, 1)
    trend_norm = max(min(row["trend_strength"] / 0.05, 1), -1)
    momentum_norm = max(min(row["momentum_strength"] / 0.05, 1), -1)
    direction = 0.6 * trend_norm + 0.4 * momentum_norm
    score = direction * vol_norm
    return 100 * score
