# strategies/shared_handler.py

import pandas as pd
import numpy as np
import yfinance as yf
import calendar
import math
import hashlib
import datetime
import json
import uuid
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *

class SharedHandler:
    def __init__(self, connection, modules):
        self.connection = connection
        self.modules = modules

    def is_red(self, candle):
        return candle['close'] < candle['open']

    def is_green(self, candle):
        return candle['close'] > candle['open']
    
    def calculate_candle_range(self, candle):
        return candle['high'] - candle['low']

    def calculate_candle_body_size(self, candle):
        return abs(candle['close'] - candle['open'])

    def calculate_candle_wick_size(self, candle):
        return max(candle['high'] - max(candle['open'], candle['close']), max(candle['open'], candle['close']) - candle['low'])

    def is_doji(self, candle, threshold=0.01):  
        return abs(candle['close'] - candle['open']) < threshold * self.calculate_candle_range(candle)

    def is_higher_high(self, candle, previous_candle):
        return candle['high'] > previous_candle['high']

    def is_lower_low(self, candle, previous_candle):
        return candle['low'] < previous_candle['low']

    def is_engulfing_pattern(self, candle, previous_candle):
        return candle['high'] > previous_candle['high'] and candle['low'] < previous_candle['low']

    def is_hammer(self, candle):
        body_size = abs(candle['close'] - candle['open'])
        upper_shadow = candle['high'] - max(candle['open'], candle['close'])
        lower_shadow = min(candle['open'], candle['close']) - candle['low']
        return upper_shadow >= 2 * body_size and lower_shadow <= body_size

    def is_shooting_star(self, candle):
        body_size = abs(candle['close'] - candle['open'])
        upper_shadow = candle['high'] - max(candle['open'], candle['close'])
        lower_shadow = min(candle['open'], candle['close']) - candle['low']
        return upper_shadow >= 2 * body_size and lower_shadow >= body_size

    def is_inside_bar(self, candle, previous_candle):
        return candle['high'] < previous_candle['high'] and candle['low'] > previous_candle['low']

    def is_bearish_engulfing(candle, previous_candle):
        return candle['close'] < candle['open'] and previous_candle['close'] < previous_candle['open'] and \
               candle['open'] >= previous_candle['close'] and candle['close'] <= previous_candle['open']

    def is_bearish_engulfing(candle, previous_candle):
        return candle['close'] < candle['open'] and previous_candle['close'] < previous_candle['open'] and \
           candle['open'] >= previous_candle['close'] and candle['close'] <= previous_candle['open']

    def is_bullish_harami(candle, previous_candle):
        return previous_candle['close'] > previous_candle['open'] and candle['close'] > candle['open'] and \
           candle['open'] < previous_candle['close'] and candle['close'] > previous_candle['open']

    def is_bearish_harami(candle, previous_candle):
        return previous_candle['close'] < previous_candle['open'] and candle['close'] < candle['open'] and \
           candle['open'] > previous_candle['close'] and candle['close'] < previous_candle['open']

    def get_last_n_candles(self, candles, n):
        """
        Get the last n candles from the given candle dataset.
        """
        return candles.iloc[-n:]

    def get_first_candle_of_day(self, candles):
        """
        Get the first candle of the day from the given candle dataset.
        """
        return candles.iloc[0] if candles else None

    def get_nth_last_prices(self, candles, n=1):
        """
        Get the nth last open, high, low, close, and volume from the dataset.
        """
        if not candles.empty and len(candles) >= n:
            nth_last_candle = candles.iloc[-n]
            nth_last_open = nth_last_candle.get('open')
            nth_last_high = nth_last_candle.get('high')
            nth_last_low = nth_last_candle.get('low')
            nth_last_close = nth_last_candle.get('close')
            nth_last_volume = nth_last_candle.get('volume')
            return nth_last_open, nth_last_high, nth_last_low, nth_last_close, nth_last_volume
        else:
            return None, None, None, None, None

    def get_nth_first_prices(self, candles, n=1):
        """
        Get the nth first open, high, low, close, and volume from the dataset.
        """
        if not candles.empty and len(candles) >= n:
            nth_first_candle = candles.iloc[n - 1]
            nth_first_open = nth_first_candle.get('open')
            nth_first_high = nth_first_candle.get('high')
            nth_first_low = nth_first_candle.get('low')
            nth_first_close = nth_first_candle.get('close')
            nth_first_volume = nth_first_candle.get('volume')
            return nth_first_open, nth_first_high, nth_first_low, nth_first_close, nth_first_volume
        else:
            return None, None, None, None, None
  
    def get_local_market_sentiment(self):
        pass

    def get_global_market_sentiment(self):
        pass
    
    def calculate_quantity_per_capita(self, max_allocation, stock_last_traded_price, lot_size=1):
        try:
            max_allocation = float(max_allocation)
            stock_last_traded_price = float(stock_last_traded_price)
            
            # Calculate the quantity of stocks based on maximum allocation
            quantity = max_allocation / (stock_last_traded_price * lot_size)
            return quantity
        except ValueError:
            # Handle the case where the inputs are not valid numbers
            return None        
        
    def compute_quantity(self):
        if self.max_allocation is not None:
            if self.quantity == "per capita":
                self.symbol_ltp = self.modules['fetch'].fetch_ltp(self.exchange, self.symbol)
                quantity_per_capita = math.floor(self.calculate_quantity_per_capita(self.max_allocation, self.symbol_ltp))
                log_info(f"Quantity per capital {self.max_allocation}: {quantity_per_capita}")
                return quantity_per_capita
            else:
                quantity = int(self.quantity)                
                if quantity <= 0:
                    # Handle the case where quantity is not positive
                    log_error("Error: Quantity cannot be less than or equal to 0")
                    return None
                return quantity
        else:
            return None

    def process_current_candles(self, candles_current):
        ohlcv_current_data = {}
        # Current Interval Candles
        ohlcv_current_data['open']                  = candles_current.get('open', []).tolist()
        ohlcv_current_data['high']                  = candles_current.get('high', []).tolist()
        ohlcv_current_data['low']                   = candles_current.get('low', []).tolist()
        ohlcv_current_data['close']                 = candles_current.get('close', []).tolist()
        ohlcv_current_data['volume']                = candles_current.get('volume', []).tolist()
            
        return ohlcv_current_data
    
    def process_daily_candles(self, candles_daily):
        ohlcv_daily_data = {}
        # Daily Candles
        ohlcv_daily_data['open']            = candles_daily.get('open', []).tolist()
        ohlcv_daily_data['high']            = candles_daily.get('high', []).tolist()
        ohlcv_daily_data['low']             = candles_daily.get('low', []).tolist()
        ohlcv_daily_data['close']           = candles_daily.get('close', []).tolist()
        ohlcv_daily_data['volume']          = candles_daily.get('volume', []).tolist()
            
        return ohlcv_daily_data
    
    def process_weekly_candles(self, candles_weekly):
        ohlcv_weekly_data = {}
        # Weekly Candles
        ohlcv_weekly_data['open']           = candles_weekly.get('open', []).tolist()
        ohlcv_weekly_data['high']           = candles_weekly.get('high', []).tolist()
        ohlcv_weekly_data['low']            = candles_weekly.get('low', []).tolist()
        ohlcv_weekly_data['close']          = candles_weekly.get('close', []).tolist()
        ohlcv_weekly_data['volume']         = candles_weekly.get('volume', []).tolist()
            
        return ohlcv_weekly_data
    
    def process_monthly_candles(self, candles_monthly):
        ohlcv_monthly_data = {}
        # Monthly Candles
        ohlcv_monthly_data['open']          = candles_monthly.get('open', []).tolist()
        ohlcv_monthly_data['high']          = candles_monthly.get('high', []).tolist()
        ohlcv_monthly_data['low']           = candles_monthly.get('low', []).tolist()
        ohlcv_monthly_data['close']         = candles_monthly.get('close', []).tolist()
        ohlcv_monthly_data['volume']        = candles_monthly.get('volume', []).tolist()
            
        return ohlcv_monthly_data

    def process_today_candles(self, candles_today):
        ohlcv_today_data = {}
        # Today Candles
        ohlcv_today_data['open']                  = candles_today.get('open', []).tolist()
        ohlcv_today_data['high']                  = candles_today.get('high', []).tolist()
        ohlcv_today_data['low']                   = candles_today.get('low', []).tolist()
        ohlcv_today_data['close']                 = candles_today.get('close', []).tolist()
        ohlcv_today_data['volume']                = candles_today.get('volume', []).tolist()

        return ohlcv_today_data

    def get_duration_week(self, depth=1):
        today = datetime.date.today()
        current_year = today.year
        current_month = today.month
        current_day = today.weekday()
        
        duration = 0
        for i in range(0, depth):
            days_in_week = 7
            if i == 0:
                days_in_current_week = today.weekday() + 1
                duration = days_in_current_week
            else:
                duration += days_in_week

        return duration

    def get_duration_month(self, depth=1):
        today = datetime.date.today()
        current_year = today.year
        current_month = today.month
        current_day = today.day
        
        # Get the number of days in the current month
        duration = 0
        for i in range(1, depth):
            month = 12 if current_month - i == 0 else current_month - i
            days_in_month = calendar.monthrange(current_year, month )[1]
            if i == 0:
                weekends_in_month = (int(current_day) // 7) * 2
                duration = current_day
            else:
                weekends_in_month = (int(days_in_month) // 7) * 2
                duration += days_in_month
        
        return duration

    def get_underlying_ltp(ticker):
        stock = ticker if ticker not in ('NIFTY', 'BANKNIFTY') else None

        if ticker == 'NIFTY':
            underlying = '^NSEI'
        elif ticker == 'BANKNIFTY':
            underlying = '^NSEBANK'
        elif stock is not None:
            underlying = stock + '.NS'
        else:
            log_error("The derivative instrument provided is invalid")
            return False

        hist_data = yf.download(underlying, period='5d')
        underlying_current_price = hist_data['Adj Close'].iloc[-1]
        return underlying_current_price

    def get_options(dump, ticker, strike, exchange):
        contracts = []
        for instrument in dump:
            if instrument['name'] == ticker or instrument['tradingsymbol'] == ticker and instrument['instrument_type'] == strike:
                contracts.append(instrument)
        return pd.DataFrame(contracts)

    def get_options_with_expiry(contracts, expiry_span):
        contracts['time_to_expiry'] = (pd.to_datetime(contracts['expiry']) - datetime.datetime.now()).datetime.days
        next_expiry_in_days = np.sort(contracts['time_to_expiry'].unique())
        if expiry_span <= len(next_expiry_in_days):
            expiry_eta = next_expiry_in_days[expiry_span]
        else:
            min_day_count = None 
        return (contracts[contracts['time_to_expiry'] == expiry_eta]).reset_index(drop=True)

    def get_options_ce_atm(contracts, current_index_price):
        return abs(contracts['strike'] - current_index_price).argmin()

    def get_options_pe_atm(contracts, current_index_price):
        return abs(contracts['strike'] - current_index_price).argmin()

    def get_call_option_chain(contracts, current_index_price, strike_span):
        contracts.sort_values(by=['strike'], inplace=True, ignore_index=True)
        atm_index = (abs(contracts['strike'] - current_index_price).argmin()) + 2
        return contracts.iloc[atm_index-strike_span:atm_index] 

    def get_put_option_chain(contracts, current_index_price, strike_span):
        contracts.sort_values(by=['strike'], inplace=True, ignore_index=True)
        atm_index = (abs(contracts['strike'] - current_index_price).argmin()) + 1
        return contracts.iloc[atm_index:atm_index+strike_span] 

    def generate_record_hash(self, record):
        # Create a unique hash from the string data
        hash_object = hashlib.sha256(record.encode("utf-8"))
        return hash_object.hexdigest()

    def get_current_timestamp(self):
        current_timestamp = datetime.datetime.now(datetime.timezone.utc)
        formatted_timestamp = current_timestamp.strftime("%Y%m%d%H%M")
        return formatted_timestamp

    def generate_aws_sns_topic_name(self, strategy_id):

        # Create a mapping between strategy IDs and topic names
        strategy_id_enum = Strategy[f"ALGORITHM_{strategy_id}"]
        strategy_topic_mapping = {
            Strategy.ALGORITHM_1: Topics.TOPIC_1,
            Strategy.ALGORITHM_2: Topics.TOPIC_2,
            Strategy.ALGORITHM_3: Topics.TOPIC_3,
            Strategy.ALGORITHM_4: Topics.TOPIC_4,
            Strategy.ALGORITHM_5: Topics.TOPIC_5,
            Strategy.ALGORITHM_6: Topics.TOPIC_6,
        }

        if strategy_id_enum in strategy_topic_mapping:
            return strategy_topic_mapping[strategy_id_enum].value
        else:
            return None

    def generate_aws_sns_topic_arn(self, strategy_id, topic_type=None):

        # ARN Template: arn:aws:sns:<region>:<account-id>:<topic-name>
        topic_name = self.generate_aws_sns_topic_name(strategy_id)

        enum_arn = AWS_SNS.ARN.value
        emum_aws = AWS_SNS.AWS.value
        emum_sns = AWS_SNS.SNS.value
        emum_region = AWS_SNS.REGION.value
        emum_account_id = AWS_SNS.ACCOUNT_ID.value
        emum_topic_name = topic_name

        if topic_type == FIFO:
            topic_name = topic_name + ".fifo"
            arn_formatted = f"{enum_arn}:{emum_aws}:{emum_sns}:{emum_region}:{emum_account_id}:{emum_topic_name}" + ".fifo"
        else:
            arn_formatted = f"{enum_arn}:{emum_aws}:{emum_sns}:{emum_region}:{emum_account_id}:{emum_topic_name}"     

        return arn_formatted, topic_name        

    def get_aws_sqs_queue_name(self, strategy_id):

        # Create a mapping between strategy IDs and queue names
        strategy_id_enum = Strategy[f"ALGORITHM_{strategy_id}"]
        strategy_queue_mapping = {
            Strategy.ALGORITHM_1: Queues.QUEUE_1,
            Strategy.ALGORITHM_2: Queues.QUEUE_2,
            Strategy.ALGORITHM_3: Queues.QUEUE_3,
            Strategy.ALGORITHM_4: Queues.QUEUE_4,
            Strategy.ALGORITHM_5: Queues.QUEUE_5,
            Strategy.ALGORITHM_6: Queues.QUEUE_6
        }

        if strategy_id_enum in strategy_queue_mapping:
            return strategy_queue_mapping[strategy_id_enum].value
        else:
            return None 

    def generate_aws_sqs_queue_arn(self, strategy_id, queue_type=None):
            
        # ARN Template: arn:aws:sns:<region>:<account-id>:<topic-name>
        queue_name  = self.get_aws_sqs_queue_name(strategy_id)
        queue_url = self.get_aws_sqs_queue_url(queue_name)

        enum_arn        = AWS_SQS.ARN.value
        emum_aws        = AWS_SQS.AWS.value
        emum_sqs        = AWS_SQS.SQS.value
        emum_region     = AWS_SQS.REGION.value
        emum_account_id = AWS_SQS.ACCOUNT_ID.value
        emum_queue_name = queue_name
        
        if queue_type == FIFO:
            queue_name = queue_name + ".fifo"
            queue_arn_formatted = f"{enum_arn}:{emum_aws}:{emum_sqs}:{emum_region}:{emum_account_id}:{emum_queue_name}" + ".fifo"
            queue_url = queue_url + ".fifo"
        else:
            queue_arn_formatted = f"{enum_arn}:{emum_aws}:{emum_sqs}:{emum_region}:{emum_account_id}:{emum_queue_name}"                

        return queue_arn_formatted, queue_name, queue_url        

    def get_aws_sqs_queue_url(self, queue_name):
        # Get the SQS queue URL
        queue_url = f'{AWS_SQS.URL.value}/{AWS_SQS.ACCOUNT_ID.value}/{queue_name}'
        return queue_url