import pandas as pd
import json

# SMA
def sma(dataset, period=5):
    # Check if dataset contains the required columns
    if 'close' not in dataset or 'date' not in dataset:
        return json.dumps({"error": "Dataset does not contain 'close' or 'date' column"})

    dataset['close'] = dataset['close'].astype(float)
    timestamps = dataset['date']

    # Check if the data has sufficient length for SMA calculations
    if len(dataset) < period:
        return json.dumps({"error": f"Insufficient data for SMA calculation. Minimum {period} data points required"})

    # Calculate SMA
    sma_values = []
    for i in range(len(dataset) - period + 1):
        sma_values.append(dataset['close'].iloc[i:i + period].mean())

    # Create list of tuples containing timestamps and SMA values
    sma_with_timestamps = list(zip(timestamps.iloc[period - 1:], sma_values))
    sma_with_timestamps = [(ts.replace(tzinfo=None), round(sma, 2)) for ts, sma in sma_with_timestamps]

    # Convert list of tuples to dictionary format
    sma_dict = {
        "sma_line": {str(ts): sma for ts, sma in sma_with_timestamps},
        "sma_latest_value": {str(sma_with_timestamps[-1][0]): sma_with_timestamps[-1][1]}
    }

    # Convert the dictionary to JSON format
    sma = json.dumps(sma_dict)
    return sma

# EMA
def ema(dataset, period=5):
    # Check if dataset contains the required columns
    if 'close' not in dataset or 'date' not in dataset:
        return json.dumps({"error": "Dataset does not contain 'close' or 'date' column"})

    dataset['close'] = dataset['close'].astype(float)
    timestamps = dataset['date']

    # Check if the data has sufficient length for EMA calculations
    if len(dataset) < period:
        return json.dumps({"error": f"Insufficient data for EMA calculation. Minimum {period} data points required"})

    # Calculate EMA
    alpha = 2 / (period + 1)
    ema_values = [dataset['close'].iloc[0]]  # EMA for first data point is the same as the close price
    for i in range(1, len(dataset)):
        ema_values.append(alpha * dataset['close'].iloc[i] + (1 - alpha) * ema_values[-1])

    # Create list of tuples containing timestamps and EMA values
    ema_with_timestamps = list(zip(timestamps, ema_values))
    ema_with_timestamps = [(ts.replace(tzinfo=None), round(ema, 2)) for ts, ema in ema_with_timestamps]

    # Convert list of tuples to dictionary format
    ema_dict = {
        "ema_line": {str(ts): ema for ts, ema in ema_with_timestamps},
        "ema_latest_value": {str(ema_with_timestamps[-1][0]): ema_with_timestamps[-1][1]}
    }

    # Convert the dictionary to JSON format
    ema = json.dumps(ema_dict)
    return ema

# WMA 
def wma(dataset, period=5):
    # Check if dataset contains the required columns
    if 'close' not in dataset or 'date' not in dataset:
        return json.dumps({"error": "Dataset does not contain 'close' or 'date' column"})

    dataset['close'] = dataset['close'].astype(float)
    timestamps = dataset['date']

    # Check if the data has sufficient length for WMA calculations
    if len(dataset) < period:
        return json.dumps({"error": f"Insufficient data for WMA calculation. Minimum {period} data points required"})

    # Calculate the weighted moving average
    weights = list(range(1, period + 1))
    weighted_sum = sum(dataset['close'].iloc[:period] * weights)
    total_weight = sum(weights)
    wma_values = [weighted_sum / total_weight]

    for i in range(period, len(dataset)):
        weighted_sum = weighted_sum - dataset['close'].iloc[i - period] * weights[0] + dataset['close'].iloc[i] * weights[-1]
        wma_values.append(weighted_sum / total_weight)

    # Create list of tuples containing timestamps and WMA values
    wma_with_timestamps = list(zip(timestamps.iloc[period - 1:], wma_values))
    wma_with_timestamps = [(ts.replace(tzinfo=None), round(wma, 2)) for ts, wma in wma_with_timestamps]

    # Convert list of tuples to dictionary format
    wma_dict = {
        "wma_line": {str(ts): wma for ts, wma in wma_with_timestamps},
        "wma_latest_value": {str(wma_with_timestamps[-1][0]): wma_with_timestamps[-1][1]}
    }

    # Convert the dictionary to JSON format
    wma = json.dumps(wma_dict)
    return wma