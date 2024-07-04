# handlers/strategy

from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *
from .BaseStrategy import BaseStrategy


class StrategyScanner(BaseStrategy):
    def __init__(self, connection, modules, parameters, candlesticks_data_list, indicators_data_list, candles_timeframe=None):
        super().__init__(connection, modules)
        self.connection = connection
        self.modules = modules
        self.parameters = parameters
        self.candlesticks_data_list = candlesticks_data_list
        self.indicators_data_list = indicators_data_list
        self.candles_timeframe = candles_timeframe or self.parameters['strategy_params.timeframe']

    def initialize(self):
        return self.scan_primary_conditions()

    def scan_primary_conditions(self):
        """
        Evaluates the trading strategy conditions based on provided data.

        Parameters:
        - candlestick_data (DataFrame): OHLCV data for all timeframes.
        - indicator_data (DataFrame): Additional indicator data used for evaluation.

        Returns:
        - conditions_met (bool): True if strategy conditions are met, False otherwise.
        """

        results = []

        for stock_index, (candlestick_data, indicator_data) in enumerate(
                zip(self.candlesticks_data_list, self.indicators_data_list)):
            candles = None
            candles_daily = None
            candles_weekly = None
            candles_monthly = None
            candles_today_5m = None
            candles_today_15m = None
            candles_today_30m = None
            candles_today_60m = None

            try:
                # Extracting stock details from candlestick_data
                exchange = candlestick_data['exchange']
                symbol = candlestick_data['symbol']
                token = candlestick_data['token']

                # Extracting candlestick data
                candles = candlestick_data['candlestick_data'][self.candles_timeframe]  # First dataframe
                candles_daily = candlestick_data['candlestick_data'][DAY]  # Second dataframe
                candles_weekly = candlestick_data['candlestick_data'][WEEK]  # Third dataframe
                candles_monthly = candlestick_data['candlestick_data'][MONTH]  # Fourth dataframe

                try:
                    candles_today_5m = candlestick_data['candlestick_data'][TODAY_5M]  # Fifth dataframe
                except KeyError:
                    candles_today_5m = None

                try:
                    candles_today_15m = candlestick_data['candlestick_data'][TODAY_15M]  # Sixth dataframe
                except KeyError:
                    candles_today_15m = None

                try:
                    candles_today_30m = candlestick_data['candlestick_data'][TODAY_30M]  # Seventh dataframe
                except KeyError:
                    candles_today_30m = None

                try:
                    candles_today_60m = candlestick_data['candlestick_data'][TODAY_60M]  # Eighth dataframe
                except KeyError:
                    candles_today_60m = None

                # Default Candles
                last_open, last_high, last_low, last_close, last_volume = self.get_nth_last_prices(candles, 1)
                second_last_open, second_last_high, second_last_low, second_last_close, second_last_volume = self.get_nth_last_prices(
                    candles, 2)
                third_last_open, third_last_high, third_last_low, third_last_close, third_last_volume = self.get_nth_last_prices(
                    candles, 3)

                # Daily Candles
                last_open_daily, last_high_daily, last_low_daily, last_close_daily, last_volume_daily = self.get_nth_last_prices(
                    candles_daily, 1)
                second_last_open_daily, second_last_high_daily, second_last_low_daily, second_last_close_daily, second_last_volume_daily = self.get_nth_last_prices(
                    candles_daily, 2)
                third_last_open_daily, third_last_high_daily, third_last_low_daily, third_last_close_daily, third_last_volume_daily = self.get_nth_last_prices(
                    candles_daily, 3)

                # Weekly Candles
                last_open_weekly, last_high_weekly, last_low_weekly, last_close_weekly, last_volume_weekly = self.get_nth_last_prices(
                    candles_weekly, 1)
                second_last_open_weekly, second_last_high_weekly, second_last_low_weekly, second_last_close_weekly, second_last_volume_weekly = self.get_nth_last_prices(
                    candles_weekly, 2)
                third_last_open_weekly, third_last_high_weekly, third_last_low_weekly, third_last_close_weekly, third_last_volume_weekly = self.get_nth_last_prices(
                    candles_weekly, 3)

                # Monthly Candles
                last_open_monthly, last_high_monthly, last_low_monthly, last_close_monthly, last_volume_monthly = self.get_nth_last_prices(
                    candles_monthly, 1)
                second_last_open_monthly, second_last_high_monthly, second_last_low_monthly, second_last_close_monthly, second_last_volume_monthly = self.get_nth_last_prices(
                    candles_monthly, 2)
                third_last_open_monthly, third_last_high_monthly, third_last_low_monthly, third_last_close_monthly, third_last_volume_monthly = self.get_nth_last_prices(
                    candles_monthly, 3)

                # Today Candles
                try:
                    first_open_today_5m, first_high_today_5m, first_low_today_5m, first_close_today_5m, first_volume_today_5m = self.get_nth_first_prices(
                        candles_today_5m, n=1)
                except (AttributeError, ValueError, TypeError):
                    first_open_today_5m = first_high_today_5m = first_low_today_5m = first_close_today_5m = first_volume_today_5m = None

                try:
                    first_open_today_15m, first_high_today_15m, first_low_today_15m, first_close_today_15m, first_volume_today_15m = self.get_nth_first_prices(
                        candles_today_15m, n=1)
                except (AttributeError, ValueError, TypeError):
                    first_open_today_15m = first_high_today_15m = first_low_today_15m = first_close_today_15m = first_volume_today_15m = None

                try:
                    first_open_today_30m, first_high_today_30m, first_low_today_30m, first_close_today_30m, first_volume_today_30m = self.get_nth_first_prices(
                        candles_today_30m, n=1)
                except (AttributeError, ValueError, TypeError):
                    first_open_today_30m = first_high_today_30m = first_low_today_30m = first_close_today_30m = first_volume_today_30m = None

                try:
                    first_open_today_60m, first_high_today_60m, first_low_today_60m, first_close_today_60m, first_volume_today_60m = self.get_nth_first_prices(
                        candles_today_60m, n=1)
                except (AttributeError, ValueError, TypeError):
                    first_open_today_60m = first_high_today_60m = first_low_today_60m = first_close_today_60m = first_volume_today_60m = None

                # Retrieve indicators for the current stock
                indicator_data = indicator_data['indicators_data']

                # Proceed with your evaluation logic here, using candlesticks_data and indicator_data

                # Example: Check RSI condition
                rsi = indicator_data.get('rsi', [])
                rsi_condition_met = rsi[-1] > 40 if rsi else False

                # You can add more conditions similar to the above

                # If all conditions are met for this stock, add it to the results
                if rsi_condition_met:  # Add other condition checks here
                    message = f"{exchange}, {symbol}, {token}"
                    results.append(message)

            except Exception as error:
                log_error(f"An error occurred while evaluating primary conditions for {symbol}: {str(error)}")

        return results
