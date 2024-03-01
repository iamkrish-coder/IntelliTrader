# strategies/options_strategy.py
from ast import arg
from ctypes import alignment
from msilib.schema import CustomAction
from numpy import histogram
from source.indicators.macd import macd
from source.strategies.base_strategy import BaseStrategy
from turtle import st
from source.constants.constants import *
from source.enumerations.enums import *
import os
import pandas as pd
import time
import json
import logging
import asyncio

class StockDelivery(BaseStrategy):
    def __init__(self, connection, modules):
        super().__init__(connection, modules) 

    def execute_live_strategy(self, v_args, m_args, s_args, c_args):
        pass

    ###########################################
    # Virtual Strategy
    ###########################################

    def execute_virtual_strategy(self, v_args, m_args, s_args, c_args):
        start_time = time.time()      
        
        # Declare variables
        instruments_list   = []
        watchlist_stocks   = []
        local_indices      = []
        global_indices     = []
        stock_alerts       = []
        
        stock_data         = {}
        indicator_data     = {}
        ohlcv_today_data   = {}
        ohlcv_daily_data   = {}
        ohlcv_weekly_data  = {}
        ohlcv_monthly_data = {}
               
        # Virtual Trade Parameters
        self.symbol                       = v_args.get('symbol')
        self.exchange                     = v_args.get('exchange')
        self.historical_data_subscription = v_args.get('historical_data_subscription')
        max_allocation                    = v_args.get('max_allocation')
        quantity                          = v_args.get('quantity')
        tpsl_method                       = v_args.get('tpsl_method')
        target                            = v_args.get('target')
        stop_loss                         = v_args.get('stop_loss')
        trail_profit                      = v_args.get('trail_profit')
        trail_stop_loss                   = v_args.get('trail_stop_loss')

        # Multi Timeframe
        multi_timeframe = m_args.get('multi_timeframe', {})
        self.DAILY      = multi_timeframe.get('daily_interval')
        self.WEEKLY     = multi_timeframe.get('weekly_interval')
        self.MONTHLY    = multi_timeframe.get('monthly_interval')

        # Strategy Parameters
        self.TIMEFRAME = s_args.get('timeframe')

        # Market Parameters
        market_params  = m_args.get('market_params')
        market_indices = m_args.get('market_indices')

        # Common Parameters
        prettier = c_args.get('prettier_print')
        
        # Market Trend Study
        if market_params:
            local_market_sentiment  = self.get_local_market_sentiment()
            global_market_sentiment = self.get_global_market_sentiment()


        # Get Live Data
        stock_basket     = self.get_stock_basket(self.exchange, self.symbol)
        instruments_list = self.modules['fetch'].fetch_instruments(self.exchange)  
        watchlist_stocks = [instrument for instrument in instruments_list if instrument['tradingsymbol'] in stock_basket]

        # Loop through stocks
        for stock in watchlist_stocks:
            self.trading_symbol = stock.get('tradingsymbol')
            if self.trading_symbol is None:
                continue
    
            self.instrument_token = self.modules['fetch'].instrument_token_lookup(self.exchange, self.trading_symbol)
            candles = asyncio.run(self.get_candlestick_data())
            candles_current, candles_daily, candles_weekly, candles_monthly, candles_same_day_5m, candles_same_day_15m = candles

            # Display Output of Candle Data <Debug> 
            # self.modules['help'].format_json_output_print(candles_current, "Today", prettier)
            # self.modules['help'].format_json_output_print(candles_daily, "Daily", prettier)
            # self.modules['help'].format_json_output_print(candles_weekly, "Weekly", prettier)
            # self.modules['help'].format_json_output_print(candles_monthly, "Monthly", prettier)
            # self.modules['help'].format_json_output_print(candles_same_day_5m, "Same Day 5M", prettier)
            # self.modules['help'].format_json_output_print(candles_same_day_15m, "Same Day 15M", prettier)
            
            # Candlestick Processing
            ohlcv_current_data      = self.process_current_candles(candles_current)
            ohlcv_daily_data        = self.process_daily_candles(candles_daily)
            ohlcv_weekly_data       = self.process_weekly_candles(candles_weekly)
            ohlcv_monthly_data      = self.process_monthly_candles(candles_monthly)
            ohlcv_same_day_5m_data  = self.process_same_day_candles(candles_same_day_5m)
            ohlcv_same_day_15m_data = self.process_same_day_candles(candles_same_day_15m)

            # Indicators Data          
            indicator_data = self.calculate_indicators(ohlcv_current_data)

            # Evaluate Strategy conditions based on obtained Candle and Indicator Data
            conditions_met = self.evaluate_strategy_conditions(ohlcv_current_data, ohlcv_daily_data, ohlcv_weekly_data, ohlcv_monthly_data, ohlcv_same_day_5m_data, ohlcv_same_day_15m_data, indicator_data)
            if conditions_met:
                print(f"\nStock Alert: {self.trading_symbol}")
                stock_alerts.append(self.trading_symbol)
            else:
                continue

        print(stock_alerts)
        
        # Secondary condition check - 3M / 1M - Live Streaming Data RabbitMQ
        # Candle Green 
        # Candle Red - Wait
        
        # All condition met?  Buy Signal
        # Code to Buy - Limit Order / Market Order / Qty / Capital Allocation
        # Monitor Trade - Profit / Trail Profit / Trail Stop Loss -> main CORE
        # Stop Loss Hit / Profit Hit / Trailing Profit Hit -> Sell Signal -> Execute Sell Trade

        # Service in python - To Run and Monitor Software Application
        
        # Cloud - AWS Service - Migrate AWS 
        # Testing AWS 

        end_time = time.time()
        execution_time = end_time - start_time
        logging.info(f"Execution time: {execution_time} seconds")

    ###########################################
    # Calculate Indicators Data
    ###########################################
        
    def calculate_indicators(self, ohlcv_current_data):
      """
      Calculates and stores various technical indicators for the given OHLCV data.

      Args:
          ohlcv_current_data (pandas.DataFrame): The OHLCV data

      Returns:
          dict: A dictionary containing calculated indicator values.
      """
      indicator_data = {}
      indicator_data['rsi'] = self.get_indicator_values('rsi', ohlcv_current_data, RSI.RSI_8.value)
      indicator_data['wma5'] = self.get_indicator_values('wma', ohlcv_current_data, WMA.WMA_5.value)
      indicator_data['wma20'] = self.get_indicator_values('wma', ohlcv_current_data, WMA.WMA_21.value)
      indicator_data['supertrend'] = self.get_indicator_values('supertrend', ohlcv_current_data, Supertrend.SUPERTREND_4_2.value)
      indicator_data['truerange'] = self.get_indicator_values('truerange', ohlcv_current_data, TrueRange.TRUERANGE_14.value)
      indicator_data['average_truerange'] = self.get_indicator_values('average_truerange', ohlcv_current_data, AverageTrueRange.AVERAGETRUERANGE_14.value)
      indicator_data['macd'] = self.get_indicator_values('macd', ohlcv_current_data, MACD.MACD_12_26_9.value)
      return indicator_data

    ###########################################
    # Async Processing
    ###########################################
        
    async def get_candlestick_data(self):
      """
      Asynchronously fetches OHLC data for different timeframes.
      """
      if self.historical_data_subscription:
        tasks = [
          self.fetch_ohlc_async(self.exchange, self.trading_symbol, self.instrument_token, self.timeframe)
          for self.timeframe in [self.TIMEFRAME, self.DAILY, self.WEEKLY, self.MONTHLY, SAMEDAY_5M, SAMEDAY_15M]
        ]
        candles = await asyncio.gather(*tasks)
        return candles
      
      else:
        pass

    async def fetch_ohlc_async(self, exchange, symbol, token, timeframe):
      """
      Fetches OHLC data asynchronously for the given timeframe.
      """
      loop = asyncio.get_running_loop()  # Get the current event loop
      candles = await loop.run_in_executor(None, self.modules['fetch'].fetch_ohlc, exchange, symbol, token, timeframe)
      return candles


    ###########################################
    # Evaluate Strategy Conditions
    ###########################################
        
    def evaluate_strategy_conditions(self, ohlcv_current_data, ohlcv_daily_data, ohlcv_weekly_data, ohlcv_monthly_data, ohlcv_same_day_5m_data, ohlcv_same_day_15m_data, indicator_data):

        open                      = ohlcv_current_data.get('open')
        high                      = ohlcv_current_data.get('high')
        low                       = ohlcv_current_data.get('low')
        close                     = ohlcv_current_data.get('close')
        volume                    = ohlcv_current_data.get('volume')

        open_daily                = ohlcv_daily_data.get('open')
        high_daily                = ohlcv_daily_data.get('high')
        low_daily                 = ohlcv_daily_data.get('low')
        close_daily               = ohlcv_daily_data.get('close')
        volume_daily              = ohlcv_daily_data.get('volume')
        
        open_weekly               = ohlcv_weekly_data.get('open')
        high_weekly               = ohlcv_weekly_data.get('high')
        low_weekly                = ohlcv_weekly_data.get('low')
        close_weekly              = ohlcv_weekly_data.get('close')
        volume_weekly             = ohlcv_weekly_data.get('volume')
        
        open_monthly              = ohlcv_monthly_data.get('open')
        high_monthly              = ohlcv_monthly_data.get('high')
        low_monthly               = ohlcv_monthly_data.get('low')
        close_monthly             = ohlcv_monthly_data.get('close')
        volume_monthly            = ohlcv_monthly_data.get('volume')        

        open_5m                   = ohlcv_same_day_5m_data.get('open')
        high_5m                   = ohlcv_same_day_5m_data.get('high')
        low_5m                    = ohlcv_same_day_5m_data.get('low')
        close_5m                  = ohlcv_same_day_5m_data.get('close')
        volume_5m                 = ohlcv_same_day_5m_data.get('volume')
        
        open_15m                  = ohlcv_same_day_15m_data.get('open')
        high_15m                  = ohlcv_same_day_15m_data.get('high')
        low_15m                   = ohlcv_same_day_15m_data.get('low')
        close_15m                 = ohlcv_same_day_15m_data.get('close')
        volume_15m                = ohlcv_same_day_15m_data.get('volume')

        rsi                       = indicator_data.get('rsi')
        wma5                      = indicator_data.get('wma5')
        wma20                     = indicator_data.get('wma20')
        supertrend                = indicator_data.get('supertrend')
        truerange                 = indicator_data.get('truerange')
        average_truerange         = indicator_data.get('average_truerange')
        macd                      = indicator_data.get('macd')
        macd_histogram            = macd['macd_histogram']
        macd_line                 = macd['macd_line']
        macd_signal               = macd['signal_line']
        

        # Define strategy conditions

        try:
            conditions = {
                '1': rsi[-1] > 55,
                # '2': close[-1] > (open[-1] * 1.01),
                # '3': volume[-1] > 200000,
                # '4': close[-1] > 2000,
                # '5': close[-1] > close_daily[-2],                    
                # '6': truerange[-1] > average_truerange[-1],
                # '7': truerange[-1] > 8,
                # '8': close[-1] > close_weekly[-2],                                   
                # '9': close[-1] > close_monthly[-2], 
                # '10': close_weekly[-1] > close_weekly[-2],                                                    
                # '11': close_monthly[-1] > close_monthly[-2],
                # '12': close[-1] > ((open[-1] + high_daily[-2] + close_daily[-2]) / 3),
                # '13': macd_histogram[-1] > 0,
                # '14': macd_line[-1] > macd_signal[-1],
                # '15': close[-1] > high_daily[-2],
                # '16': close[-1] > open_5m[0],
                # '17': close[-1] > supertrend[-1],
                # '18': close[-2] <= supertrend[-2],
                # '19': rsi[-1] > 60,
                # '20': rsi[-2] <= 60,
                # '21': wma5[-1] > wma20[-1]
            }
        except Exception as e:
            logging.ERROR(f"Error: {e}")

        
        # Log and display each Condition check
        print(f"\n::::::: Evaluating Strategy ::::::: {self.trading_symbol}\n")
        for condition_id, condition_check in conditions.items():
            logging.info(f":::::::Condition::::::: {condition_id} Status: {condition_check}")

        print()
        # Final Strategy Condition
        if all(conditions.values()):
            return True
        else:
            return False