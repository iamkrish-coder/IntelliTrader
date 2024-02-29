# strategies/shared.py

import pandas as pd
import numpy as np
import datetime as dt
import yfinance as yf
import logging
import calendar
from source.constants.constants import *
from source.enumerations.enums import *

class Shared:
    def __init__(self, connection, modules):
        self.connection = connection
        self.modules = modules

    def get_indicator_values(self, indicator, datasource, setting):
        indicator_values = self.modules['indicator'].use_indicator(indicator, datasource, setting)
        return indicator_values

    def get_stock_basket(self, exchange, symbol):
        stock_basket = []       
        if exchange.upper() == Exchange.NSE.value:
            if symbol.upper() == "DEFAULT":
                symbols_list = pd.read_csv(DEFAULT_BASKET)
                stock_basket = symbols_list['Symbol'].tolist()
            else:
                stock_basket.append(symbol.upper())
        elif exchange.upper() == Exchange.BSE.value:
            if symbol.upper() == "DEFAULT":
                stock_basket = pd.read_csv(DEFAULT_BASKET)
            else:
                stock_basket.append(symbol.upper())
        else:
            logging.info(f"Invalid Exchange {exchange}")            
        return stock_basket
  

    def get_local_market_sentiment(self):
        pass

    def get_global_market_sentiment(self):
        pass
    
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

    def process_same_day_candles(self, candles_same_day):
        ohlcv_same_day_data = {}
        # Same Day Candles
        ohlcv_same_day_data['open']                  = candles_same_day.get('open', []).tolist()
        ohlcv_same_day_data['high']                  = candles_same_day.get('high', []).tolist()
        ohlcv_same_day_data['low']                   = candles_same_day.get('low', []).tolist()
        ohlcv_same_day_data['close']                 = candles_same_day.get('close', []).tolist()
        ohlcv_same_day_data['volume']                = candles_same_day.get('volume', []).tolist()

        return ohlcv_same_day_data


    
    def get_duration_week(self, depth=1):
        today = dt.date.today()
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
        today = dt.date.today()
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
            logging.error("The derivative instrument provided is invalid")
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
        contracts['time_to_expiry'] = (pd.to_datetime(contracts['expiry']) - dt.datetime.now()).dt.days
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
