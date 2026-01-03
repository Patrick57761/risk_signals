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
def trend_state(price: pd.Series, fast_window: int = 50, slow_window: int = 200) -> pd.Series:
    fast = sma(price, fast_window)
    slow = sma(price, slow_window)

    state = pd.Series(0, index=price.index)
    state[fast > slow] = 1
    state[fast < slow] = -1

    return state

# RSI above or below thresholds
def momentum_state(price: pd.Series, window: int = 14, upper: int = 70, lower: int = 30) -> pd.Series:
    momentum = rsi(price, window)

    state = pd.Series(0, index=momentum.index)
    state[momentum > upper] = 1
    state[momentum < lower] = -1

    return state


def summary(price: pd.Series) -> pd.DataFrame:
    return pd.DataFrame(
        {
            "volatility_regime": volatility_regime(price),
            "trend_state": trend_state(price),
            "momentum_state": momentum_state(price),
        }
    )
