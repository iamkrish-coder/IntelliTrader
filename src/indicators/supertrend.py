import pandas as pd
import json

def supertrend(dataset, period=[7, 3]):
    # Check if dataset contains the required columns
    if 'close' not in dataset or 'high' not in dataset or 'low' not in dataset or 'date' not in dataset:
        return json.dumps({"error": "Dataset does not contain 'close', 'high', 'low', or 'date' column"})

    dataset['close'] = dataset['close'].astype(float)
    dataset['high'] = dataset['high'].astype(float)
    dataset['low'] = dataset['low'].astype(float)
    timestamps = dataset['date']

    # Calculate Average True Range (ATR)
    dataset['tr0'] = abs(dataset['high'] - dataset['low'])
    dataset['tr1'] = abs(dataset['high'] - dataset['close'].shift())
    dataset['tr2'] = abs(dataset['low'] - dataset['close'].shift())
    dataset['true_range'] = dataset[['tr0', 'tr1', 'tr2']].max(axis=1)
    dataset['atr'] = dataset['true_range'].rolling(period[0]).mean()

    # Calculate Supertrend
    dataset['upper_band'] = (dataset['high'] + dataset['low']) / 2 + period[1] * dataset['atr']
    dataset['lower_band'] = (dataset['high'] + dataset['low']) / 2 - period[1] * dataset['atr']
    dataset['supertrend'] = 0.0

    for i in range(1, len(dataset)):
        if dataset['close'].iloc[i] <= dataset['upper_band'].iloc[i - 1]:
            dataset.loc[dataset.index[i], 'supertrend'] = dataset.loc[dataset.index[i], 'upper_band']
        elif dataset['close'].iloc[i] > dataset['upper_band'].iloc[i - 1]:
            dataset.loc[dataset.index[i], 'supertrend'] = dataset.loc[dataset.index[i], 'lower_band']


    # Create list of tuples containing timestamps and Supertrend values
    supertrend_with_timestamps = list(zip(timestamps, dataset['supertrend']))
    supertrend_with_timestamps = [(ts.replace(tzinfo=None), round(supertrend, 2)) for ts, supertrend in supertrend_with_timestamps]

    # Convert list of tuples to dictionary format
    supertrend_dict = {
        "supertrend_line": {str(ts): supertrend for ts, supertrend in supertrend_with_timestamps},
        "supertrend_latest_value": {str(supertrend_with_timestamps[-1][0]): supertrend_with_timestamps[-1][1]}
    }

    # Convert the dictionary to JSON format
    supertrend = json.dumps(supertrend_dict)
    return supertrend
