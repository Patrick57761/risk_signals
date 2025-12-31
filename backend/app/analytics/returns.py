import pandas as pd

# pct_change: (current_element - previous_element) / previous_element

def compute_returns(prices: pd.Series) -> pd.Series:
    return prices.pct_change()