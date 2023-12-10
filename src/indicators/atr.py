def atr(dataset, period=14):
    # Check if dataset contains the required columns
    data = dataset if 'close' in dataset and 'high' in dataset and 'low' in dataset else None
    if data is not None and not data.empty:
        # Extract the necessary columns from the data
        close_prices = data['close'].astype(float)
        high_prices = data['high'].astype(float)
        low_prices = data['low'].astype(float)

        # Check if the data has sufficient length for ATR calculations
        if len(data) < period:
            return None

        true_ranges = []
        for i in range(1, len(data)):
            high_low = high_prices[i] - low_prices[i]
            high_close = abs(high_prices[i] - close_prices[i - 1])
            low_close = abs(low_prices[i] - close_prices[i - 1])
            true_range = max(high_low, high_close, low_close)
            true_ranges.append(true_range)

        atr = [sum(true_ranges[:period]) / period]
        for i in range(period, len(true_ranges)):
            atr.append((atr[-1] * (period - 1) + true_ranges[i]) / period)

        return atr