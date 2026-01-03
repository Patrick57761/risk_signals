import pandas as pd
import numpy as np

# Simple Moving Average
def sma(price: pd.Series, window: int) -> pd.Series:
    return price.rolling(window).mean()

# Exponential Moving Average
def ema(price: pd.Series, window: int) -> pd.Series:
    return price.ewm(span=window, adjust=False).mean() # exponentially weighted moving

# Relative Strength Index
def rsi(price: pd.Series, window: int) -> pd.Series:
    delta = price.diff()

    gains = delta.clip(lower=0) 
    losses = -delta.clip(upper=0)

    avg_gain = gains.rolling(window).mean()
    avg_loss = losses.rolling(window).mean()

    rs = avg_gain / avg_loss # relative strength
    rsi = 100 - (100 / (1 + rs))
    return rsi

# Average True Range
def atr(high: pd.Series, low: pd.Series, close: pd.Series, window: int) -> pd.Series:
    high_low = high - low # today's high - today's low
    high_close = (high - close.shift()).abs() # today's high - yesterday's close
    low_close = (low - close.shift()).abs() # today's low - yesterday's close

    true_range = pd.concat([high_low, high_close, low_close], axis=1).max(axis=1)

    return true_range.rolling(window).mean()
