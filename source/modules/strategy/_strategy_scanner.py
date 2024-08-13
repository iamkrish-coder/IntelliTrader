# handlers/strategy

from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *
from .BaseStrategy import BaseStrategy
import re


class StrategyScanner(BaseStrategy):
    def __init__(self, connection, modules, parameters, candlesticks_data_list, indicators_data_list,
                 candles_timeframe=None):
        super().__init__(connection, modules)
        self.connection = connection
        self.modules = modules
        self.parameters = parameters
        self.candlesticks_data_list = candlesticks_data_list
        self.indicators_data_list = indicators_data_list
        self.candles_timeframe = candles_timeframe or self.parameters['strategy_params.timeframe']
        self.strategy_id = self.parameters['strategy_params.strategy_id']
        self.strategy_type = self.parameters['strategy_params.strategy_type']
        self.strategy_definition = self.get_strategy_definition()

    def initialize(self):
        return self.scan_primary_conditions()

    def scan_primary_conditions(self):
        results = []
        for stock_index, (candlestick_data, indicator_data) in enumerate(
                zip(self.candlesticks_data_list, self.indicators_data_list)):

            exchange = candlestick_data['exchange']
            symbol = candlestick_data['symbol']
            token = candlestick_data['token']

            parsed_strategy = self.parse_strategy(self.strategy_definition, StrategyDefinition.BUY)
            candlesticks = self.parse_candlesticks(candlestick_data)
            indicators = self.parse_indicators(indicator_data)

            for condition in parsed_strategy:
                condition_result = self.evaluate_condition(condition, candlesticks, indicators)
                if not condition_result:
                    break  # If any condition fails, break the loop
                else:
                    message = f"{exchange}, {symbol}, {token}"
                results.append(message)

        return results

    def evaluate_condition(self, condition, candlestick_data, indicator_data):
        # Dispatch the condition to the appropriate module based on its type
        # e.g., if condition is "RSI > 70":
        #     return calculate_rsi(candlestick_data) > 70
        pass

    def get_strategy_definition(self):
        selected_strategy = self.strategy_id.zfill(3)
        for filename in os.listdir(ALGORITHM_PATH):
            if filename.startswith(f"STR-{selected_strategy}"):
                filepath = os.path.join(ALGORITHM_PATH, filename)
                with open(filepath, 'r') as f:
                    return f.read()
        return None

    def parse_strategy(self, strategy_definition, section):
        conditions = []
        section_header_pattern = r"^(Buy|Sell|Exit|SL|TSL) When:$"
        section_pattern = r"^" + section.value + r" When:$"
        current_section = None

        for line in strategy_definition.splitlines():
            line = line.strip()
            if not line:
                continue

            # Check if line matches the section pattern
            match = re.match(section_header_pattern, line)
            if match:
                if re.match(section_pattern, line):
                    current_section = section.value + " When:"
                    continue
                else:
                    current_section = None

            # Process conditions within the desired section
            if current_section == section.value + " When:":
                # match = re.match(r"indicator (\w+)(?: \((\d+)\))? (>|<|>=|<=|=|\!=) (\d+)", line)
                # Indicator condition
                match = re.match(r"indicator (\w+)\s*\((\d+)\)\s*(>|<=|<|>=|=|\!=)\s*(\d+)", line, re.IGNORECASE)
                if match:
                    indicator, period, operator, value = match.groups()
                    print("Match groups:", match.groups())  # Add debugging line
                    conditions.append((indicator, int(period) if period else None, operator, int(value)))

                # Candle condition
                match = re.match(r"candle \((\d+)\) (=|\!=) (red|green)", line, re.IGNORECASE)
                if match:
                    offset, operator, color = match.groups()
                    conditions.append(("candle", int(offset), operator, color))

        return conditions

    def parse_candlesticks(self, candlesticks_data_list):

        candle_data = {}

        try:
            # Extracting candlestick data
            candles = None
            candles_daily = None
            candles_weekly = None
            candles_monthly = None
            candles_today_5m = None
            candles_today_15m = None
            candles_today_30m = None
            candles_today_60m = None

            candles = candlesticks_data_list['candlestick_data'][self.candles_timeframe]  # First dataframe
            candles_daily = candlesticks_data_list['candlestick_data'][DAY]  # Second dataframe
            candles_weekly = candlesticks_data_list['candlestick_data'][WEEK]  # Third dataframe
            candles_monthly = candlesticks_data_list['candlestick_data'][MONTH]  # Fourth dataframe
            candles_today_5m = candlesticks_data_list['candlestick_data'][TODAY_5M]  # Fifth dataframe
            # candles_today_15m = candlesticks_data_list['candlestick_data'][TODAY_15M]  # Sixth dataframe
            # candles_today_30m = candlesticks_data_list['candlestick_data'][TODAY_30M]  # Seventh dataframe
            # candles_today_60m = candlesticks_data_list['candlestick_data'][TODAY_60M]  # Eighth dataframe

            candle_data['5minute(1)'] = self.get_first_candle_data(candles_today_5m, 1)
            # candle_data['15minute(1)'] = self.get_first_candle_data(candles_today_15m, 1)
            # candle_data['30minute(1)'] = self.get_first_candle_data(candles_today_30m, 1)
            # candle_data['60minute(1)'] = self.get_first_candle_data(candles_today_60m, 1)

            candle_data['default(-1)'] = self.get_last_candle_data(candles, 1)
            candle_data['daily(-1)'] = self.get_last_candle_data(candles_daily, 1)
            candle_data['weekly(-1)'] = self.get_last_candle_data(candles_weekly, 1)
            candle_data['monthly(-1)'] = self.get_last_candle_data(candles_monthly, 1)

            candle_data['default(-2)'] = self.get_last_candle_data(candles, 2)
            candle_data['daily(-2)'] = self.get_last_candle_data(candles_daily, 2)
            candle_data['weekly(-2)'] = self.get_last_candle_data(candles_weekly, 2)
            candle_data['monthly(-2)'] = self.get_last_candle_data(candles_monthly, 2)

            candle_data['default(-3)'] = self.get_last_candle_data(candles, 3)
            candle_data['daily(-3)'] = self.get_last_candle_data(candles_daily, 3)
            candle_data['weekly(-3)'] = self.get_last_candle_data(candles_weekly, 3)
            candle_data['monthly(-3)'] = self.get_last_candle_data(candles_monthly, 3)

            return candle_data

        except Exception as error:
            log_error(f"An error occurred while evaluating primary conditions: {str(error)}")

            # #####################################
            # ########## Default Candles ##########
            # #####################################
            # try:
            #     last_open, last_high, last_low, last_close, last_volume = self.get_nth_last_prices(candles, 1)
            # except (AttributeError, ValueError, TypeError):
            #     last_open, last_high, last_low, last_close, last_volume = None
            #
            # try:
            #     second_last_open, second_last_high, second_last_low, second_last_close, second_last_volume = self.get_nth_last_prices(candles, 2)
            # except (AttributeError, ValueError, TypeError):
            #     second_last_open, second_last_high, second_last_low, second_last_close, second_last_volume = None
            #
            # try:
            #     third_last_open, third_last_high, third_last_low, third_last_close, third_last_volume = self.get_nth_last_prices(candles, 3)
            # except (AttributeError, ValueError, TypeError):
            #     third_last_open, third_last_high, third_last_low, third_last_close, third_last_volume = None
            #
            # #####################################
            # ############ Daily Candles ##########
            # #####################################
            # try:
            #     last_open_daily, last_high_daily, last_low_daily, last_close_daily, last_volume_daily = self.get_nth_last_prices(candles_daily, 1)
            # except (AttributeError, ValueError, TypeError):
            #     last_open_daily, last_high_daily, last_low_daily, last_close_daily, last_volume_daily = None
            #
            # try:
            #     second_last_open_daily, second_last_high_daily, second_last_low_daily, second_last_close_daily, second_last_volume_daily = self.get_nth_last_prices(candles_daily, 2)
            # except (AttributeError, ValueError, TypeError):
            #     second_last_open_daily, second_last_high_daily, second_last_low_daily, second_last_close_daily, second_last_volume_daily = None
            #
            # try:
            #     third_last_open_daily, third_last_high_daily, third_last_low_daily, third_last_close_daily, third_last_volume_daily = self.get_nth_last_prices(candles_daily, 3)
            # except (AttributeError, ValueError, TypeError):
            #     third_last_open_daily, third_last_high_daily, third_last_low_daily, third_last_close_daily, third_last_volume_daily = None
            #
            #
            # #####################################
            # ########### Weekly Candles ##########
            # #####################################
            # try:
            #     last_open_weekly, last_high_weekly, last_low_weekly, last_close_weekly, last_volume_weekly = self.get_nth_last_prices(candles_weekly, 1)
            # except (AttributeError, ValueError, TypeError):
            #     last_open_weekly, last_high_weekly, last_low_weekly, last_close_weekly, last_volume_weekly = None
            #
            # try:
            #     second_last_open_weekly, second_last_high_weekly, second_last_low_weekly, second_last_close_weekly, second_last_volume_weekly = self.get_nth_last_prices(candles_weekly, 2)
            # except (AttributeError, ValueError, TypeError):
            #     second_last_open_weekly, second_last_high_weekly, second_last_low_weekly, second_last_close_weekly, second_last_volume_weekly = None
            #
            # try:
            #     third_last_open_weekly, third_last_high_weekly, third_last_low_weekly, third_last_close_weekly, third_last_volume_weekly = self.get_nth_last_prices(candles_weekly, 3)
            # except (AttributeError, ValueError, TypeError):
            #     third_last_open_weekly, third_last_high_weekly, third_last_low_weekly, third_last_close_weekly, third_last_volume_weekly = None
            #
            # #####################################
            # ########### Monthly Candles #########
            # #####################################
            # try:
            #     last_open_monthly, last_high_monthly, last_low_monthly, last_close_monthly, last_volume_monthly = self.get_nth_last_prices(candles_monthly, 1)
            # except (AttributeError, ValueError, TypeError):
            #     last_open_monthly, last_high_monthly, last_low_monthly, last_close_monthly, last_volume_monthly = None
            #
            # try:
            #     second_last_open_monthly, second_last_high_monthly, second_last_low_monthly, second_last_close_monthly, second_last_volume_monthly = self.get_nth_last_prices(candles_monthly, 2)
            # except (AttributeError, ValueError, TypeError):
            #     second_last_open_monthly, second_last_high_monthly, second_last_low_monthly, second_last_close_monthly, second_last_volume_monthly = None
            #
            # try:
            #     third_last_open_monthly, third_last_high_monthly, third_last_low_monthly, third_last_close_monthly, third_last_volume_monthly = self.get_nth_last_prices(candles_monthly, 3)
            # except (AttributeError, ValueError, TypeError):
            #     third_last_open_monthly, third_last_high_monthly, third_last_low_monthly, third_last_close_monthly, third_last_volume_monthly = None
            #
            # #####################################
            # ########### Today Candles ###########
            # #####################################
            # try:
            #     first_open_today_5m, first_high_today_5m, first_low_today_5m, first_close_today_5m, first_volume_today_5m = self.get_nth_first_prices(candles_today_5m, n=1)
            # except (AttributeError, ValueError, TypeError):
            #     first_open_today_5m = first_high_today_5m = first_low_today_5m = first_close_today_5m = first_volume_today_5m = None
            #
            # try:
            #     first_open_today_15m, first_high_today_15m, first_low_today_15m, first_close_today_15m, first_volume_today_15m = self.get_nth_first_prices(candles_today_15m, n=1)
            # except (AttributeError, ValueError, TypeError):
            #     first_open_today_15m = first_high_today_15m = first_low_today_15m = first_close_today_15m = first_volume_today_15m = None
            #
            # try:
            #     first_open_today_30m, first_high_today_30m, first_low_today_30m, first_close_today_30m, first_volume_today_30m = self.get_nth_first_prices(candles_today_30m, n=1)
            # except (AttributeError, ValueError, TypeError):
            #     first_open_today_30m = first_high_today_30m = first_low_today_30m = first_close_today_30m = first_volume_today_30m = None
            #
            # try:
            #     first_open_today_60m, first_high_today_60m, first_low_today_60m, first_close_today_60m, first_volume_today_60m = self.get_nth_first_prices(candles_today_60m, n=1)
            # except (AttributeError, ValueError, TypeError):
            #     first_open_today_60m = first_high_today_60m = first_low_today_60m = first_close_today_60m = first_volume_today_60m = None


    def parse_indicators(self, indicators_data_list):
        # Example: Check RSI condition
        rsi = indicators_data_list['indicators_data'].get('rsi', [])
        rsi_condition_met = rsi[-1] > 40 if rsi else False

