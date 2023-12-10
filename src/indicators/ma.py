import pandas as pd

def sma(dataset, period=5):
    # Check if dataset contains the required columns
    data = dataset if 'close' in dataset else None
    if data is not None and not data.empty:
        # Check if the data has sufficient length for SMA calculations
        if len(data) < period:
            return None
        
        return data['close'].ewm(span=period, adjust=False).mean()

def ema(dataset, period=5):
    # Check if dataset contains the required columns
    data = dataset if 'close' in dataset else None
    if data is not None and not data.empty:
        # Check if the data has sufficient length for EMA calculations
        if len(data) < period:
            return None
        
        return data['close'].rolling(window=period).mean()