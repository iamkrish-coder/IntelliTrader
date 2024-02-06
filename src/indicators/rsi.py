import numpy as np
import json
from datetime import datetime, timezone

def rsi(dataset, period=14):
    # Check if dataset contains the required columns
    if 'close' not in dataset or 'date' not in dataset:
        return None

    symbol = dataset['symbol']
    close_prices = [float(x) for x in dataset['close']]
    timestamps = dataset['date']

    # Check if data has sufficient length for RSI calculations
    if len(close_prices) < period:
        return None

    deltas = np.diff(close_prices)
    seed = deltas[:period + 1]
    up_periods = []
    down_periods = []

    up_periods.append(sum(x for x in seed if x >= 0) / period)
    down_periods.append(abs(sum(x for x in seed if x < 0) / period))

    for i in range(period + 1, len(close_prices)):
        delta = deltas[i - 1]
        if delta > 0:
            up_periods.append((up_periods[-1] * (period - 1) + delta) / period)
            down_periods.append((down_periods[-1] * (period - 1)) / period)
        else:
            up_periods.append((up_periods[-1] * (period - 1)) / period)
            down_periods.append((down_periods[-1] * (period - 1) - delta) / period)

    rs = np.array(up_periods) / np.array(down_periods)
    rsi_line = 100 - (100 / (1 + rs))

    # Correlate RSI values with timestamps
    rsi_with_timestamps = list(zip(timestamps[period:], rsi_line))
    rsi_with_timestamps = [(ts.replace(tzinfo=None), round(rsi, 2)) for ts, rsi in rsi_with_timestamps]
    
    # Assuming rsi_with_timestamps is your list of tuples
    rsi_dict = {
                "rsi_line": {str(ts): rsi for ts, rsi in rsi_with_timestamps},
                "rsi_latest_value": {str(rsi_with_timestamps[-1][0]): rsi_with_timestamps[-1][1]}
                }

    # Convert the dictionary to JSON format
    rsi = json.dumps(rsi_dict)
    return rsi
