# strategies/options_strategy.py
from ast import arg
from ctypes import alignment
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

class StockDelivery(BaseStrategy):
    def __init__(self, connection, modules):
        super().__init__(connection, modules)
        
    def execute_live_strategy(self, v_args, m_args, s_args):
        pass

    def execute_virtual_strategy(self, v_args, m_args, s_args):
        start_time = time.time()      
        
        ###########################################
        # Declare variables
        ###########################################

        instruments_list = []
        watchlist_stocks = []
        local_indices    = []
        global_indices   = []
        stock_alerts     = []
        
        stock_data             = {}
        indicator_data         = {}
        ohlcv_today_data       = {}
        ohlcv_daily_data       = {}
        ohlcv_weekly_data      = {}
        ohlcv_monthly_data     = {}
        
        
        ###########################################
        # Extracting arguments into variables
        ###########################################
        
        # Virtual Trade Parameters
        symbol                       = v_args.get('symbol')
        exchange                     = v_args.get('exchange')
        historical_data_subscription = v_args.get('historical_data_subscription')
        interval                     = v_args.get('interval')    
        duration                     = int(v_args.get('duration', 0))  # Default value is 0 if 'duration' is missing
        max_allocation               = v_args.get('max_allocation')
        quantity                     = v_args.get('quantity')
        tpsl_method                  = v_args.get('tpsl_method')
        target                       = v_args.get('target')
        stop_loss                    = v_args.get('stop_loss')
        trail_profit                 = v_args.get('trail_profit')
        trail_stop_loss              = v_args.get('trail_stop_loss')

        # Multi Timeframe
        multi_timeframe              = m_args.get('multi_timeframe', {})
        daily_interval               = multi_timeframe.get('daily_interval')
        weekly_interval              = multi_timeframe.get('weekly_interval')
        monthly_interval             = multi_timeframe.get('monthly_interval')

        # Market Parameters
        market_params  = m_args.get('market_params')
        market_indices = m_args.get('market_indices')

        ###########################################
        # Market Trend Study
        ###########################################  
        if market_params:
            local_market_sentiment  = self.get_local_market_sentiment()
            global_market_sentiment = self.get_global_market_sentiment()


        ###########################################
        # Get Live Data
        ###########################################

        stock_basket     = self.get_stock_basket(exchange, symbol)
        instruments_list = self.modules['fetch'].fetch_instruments(exchange)  
        watchlist_stocks = [instrument for instrument in instruments_list if instrument['tradingsymbol'] in stock_basket]

        # Loop through stocks
        for stock in watchlist_stocks:
            self.trading_symbol = stock.get('tradingsymbol')
            if self.trading_symbol is None:
                continue
    
            instrument_quote = self.modules['fetch'].fetch_quote(exchange, self.trading_symbol)
    
            # Extract relevant information and store it
            stock_data[self.trading_symbol] = {
                'summary_data': stock,
                'quote_data': instrument_quote
            }

            # Get Current data
            if historical_data_subscription:

                candles_same_day_5     = self.modules['fetch'].fetch_ohlc(exchange, self.trading_symbol, '5minute', 2)
                candles_same_day_15    = self.modules['fetch'].fetch_ohlc(exchange, self.trading_symbol, '15minute', 2)               
                candles_current        = self.modules['fetch'].fetch_ohlc(exchange, self.trading_symbol, interval, duration)
                candles_daily          = self.modules['fetch'].fetch_ohlc(exchange, self.trading_symbol, daily_interval, 5)
                candles_weekly         = self.modules['fetch'].fetch_ohlc(exchange, self.trading_symbol, weekly_interval, duration)
                candles_monthly        = self.modules['fetch'].fetch_ohlc(exchange, self.trading_symbol, monthly_interval, duration)                   
            else:
                pass

            print(candles_daily)
            exit()
            

            # Process Indicator and Candle Data
            ohlcv_same_day_5_data    = self.process_same_day_candles(candles_same_day_5)
            ohlcv_same_day_15_data   = self.process_same_day_candles(candles_same_day_15)
            ohlcv_current_data     = self.process_current_candles(candles_current)
            ohlcv_daily_data       = self.process_daily_candles(candles_daily)
            ohlcv_weekly_data      = self.process_weekly_candles(candles_weekly)
            ohlcv_monthly_data     = self.process_monthly_candles(candles_monthly)
            


            # Display Output of Candle Data <Debug> 
            prettier = False
            
            # self.modules['help'].format_json_output_print(ohlcv_today_data, "Today", prettier)
            # self.modules['help'].format_json_output_print(ohlcv_daily_data, "Daily", prettier)
            # self.modules['help'].format_json_output_print(ohlcv_weekly_data, "Weekly", prettier)
            # self.modules['help'].format_json_output_print(ohlcv_monthly_data, "Monthly", prettier)


            # Indicators values
            indicator_data['rsi']               = self.get_indicator_values('rsi', ohlcv_current_data, RSI.RSI_8.value)
            indicator_data['wma5']              = self.get_indicator_values('wma', ohlcv_current_data, WMA.WMA_5.value)
            indicator_data['wma20']             = self.get_indicator_values('wma', ohlcv_current_data, WMA.WMA_21.value)
            indicator_data['supertrend']        = self.get_indicator_values('supertrend', ohlcv_current_data, Supertrend.SUPERTREND_4_2.value)
            indicator_data['truerange']         = self.get_indicator_values('truerange', ohlcv_current_data, TrueRange.TRUERANGE_14.value)
            indicator_data['average_truerange'] = self.get_indicator_values('average_truerange', ohlcv_current_data, AverageTrueRange.AVERAGETRUERANGE_14.value)
            indicator_data['macd']              = self.get_indicator_values('macd', ohlcv_current_data, MACD.MACD_12_26_9.value)
            

            # Evaluate Strategy conditions based on obtained Candle and Indicator Data
            conditions_met = self.evaluate_strategy_conditions(ohlcv_same_day_5_data, ohlcv_same_day_15_data, ohlcv_current_data, ohlcv_daily_data, ohlcv_weekly_data, ohlcv_monthly_data, indicator_data)
            if conditions_met:
                # Check Secondary Conditions
                print(f"Conditions Met: Stock Alert: {self.trading_symbol}")
                stock_alerts.append(self.trading_symbol)
            else:
                continue

        print(stock_alerts)
        end_time = time.time()
        execution_time = end_time - start_time
        logging.info(f"Execution time: {execution_time} seconds")


    ###########################################
    # Evaluate Strategy Conditions
    ###########################################
        
    def evaluate_strategy_conditions(self, ohlcv_same_day_5_data, ohlcv_same_day_15_data, ohlcv_current_data, ohlcv_daily_data, ohlcv_weekly_data, ohlcv_monthly_data, indicator_data):

        open_5                    = ohlcv_same_day_5_data.get('open')
        high_5                    = ohlcv_same_day_5_data.get('high')
        low_5                     = ohlcv_same_day_5_data.get('low')
        close_5                   = ohlcv_same_day_5_data.get('close')
        volume_5                  = ohlcv_same_day_5_data.get('volume')
        
        open_15                   = ohlcv_same_day_15_data.get('open')
        high_15                   = ohlcv_same_day_15_data.get('high')
        low_15                    = ohlcv_same_day_15_data.get('low')
        close_15                  = ohlcv_same_day_15_data.get('close')
        volume_15                 = ohlcv_same_day_15_data.get('volume')

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
                'condition1': rsi[-1] > 55,
                'condition2': close[-1] > (open[-1] * 1.01),
                'condition3': volume[-1] > 200000,
                'condition4': close[-1] > 2000,
                'condition5': close[-1] > close_daily[-2],                                           
                'condition6': truerange[-1] > average_truerange[-1],
                'condition7': truerange[-1] > 8,
                'condition8': close[-1] > close_weekly[-2],                                            
                'condition9': close[-1] > close_monthly[-2], 
                'condition10': close_weekly[-1] > close_weekly[-2],                                                      
                'condition11': close_monthly[-1] > close_monthly[-2],
                'condition12': close[-1] > ((open[-1] + high_daily[-2] + close_daily[-2]) / 3),
                'condition13': macd_histogram[-1] > 0,
                'condition14': macd_line[-1] > macd_signal[-1],
                'condition15': close[-1] > high_daily[-2],
                'condition16': close[-1] > open_5[0]
                # 'condition17': close[-1] > supertrend[-1],
                # 'condition18': close[-2] <= supertrend[-2],
                # 'condition19': rsi[-1] > 60,
                # 'condition20': rsi[-2] <= 60,
                # 'condition21': wma5[-1] > wma20[-1]
            }
        except Exception as e:
            logging.FATAL(f"Fatal Error: {e}")
            
        


        # Secondary condition check - 3M / 1M
        # Candle Green 
        # Candle Red - Wait
        
        # All condition met?  Buy Signal
        # Code to Buy - Limit Order / Market Order / Qty / Capital Allocation
        # Monitor Trade - Profit / Trail Profit / Trail Stop Loss -> main CORE
        # Stop Loss Hit / Profit Hit / Trailing Profit Hit -> Sell Signal -> Execute Sell Trade

        # Service in python - To Run and Monitor Software Application
        
        # Cloud - AWS Service - Migrate AWS 
        # Testing AWS 

        
        # Log and display each condition check
        print(f"\nEvaluating Strategy: {self.trading_symbol}\n")
        for condition_id, condition_check in conditions.items():
            logging.info(f"{condition_id}: {condition_check}")

        # Final Strategy Condition
        if all(conditions.values()):
            return True
        else:
            return False