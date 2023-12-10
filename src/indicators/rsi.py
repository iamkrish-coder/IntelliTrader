import numpy as np

def rsi(dataset, period=14):
    # Check if dataset contains the required columns
    data = dataset['close'] if 'close' in dataset else None
    # Check if data has sufficient length for RSI calculations
    if len(data) < period:
        return None

    close_prices = [float(x) for x in data]
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
    
    return rsi_line
