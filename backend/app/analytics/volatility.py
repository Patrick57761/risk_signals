import pandas as pd

# \sqrt{1/{n-1} * \sum_0^{n-1}(prev - avg)^2}
# .rolling(window) creates sliding window, ddof = 1 takes 1/{n-1}

def compute_volatility(returns: pd.Series, window: int) -> pd.Series:
    return returns.rolling(window).std(ddof = 1)