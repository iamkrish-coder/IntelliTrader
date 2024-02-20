# strategies/options_strategy.py
from ast import arg
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
    def __init__(self, connection, modules, timeframe, ticker, strike, exchange, symbol, expiry, offset):
        super().__init__(connection, modules)
        
    def execute_live_strategy(self):
        pass

    def execute_virtual_strategy(self, v_args, m_args):
        start_time = time.time()      
        
        ###########################################
        # Declare variables
        ###########################################

        instruments_list = []
        watchlist_stocks = []
        local_indices = []
        global_indices = []
        stock_alerts = []
        
        stock_data = {}
        indicator_data = {}
        ohlcv_data = {}
        
        ###########################################
        # Extracting arguments into variables
        ###########################################
        
        # Virtual Trade Params
        symbol = v_args['symbol']
        exchange = v_args['exchange']
        historical_data_subscription = v_args['historical_data_subscription']
        interval = v_args['interval']
        duration = int(v_args['duration'])
        max_allocation = v_args['max_allocation']
        quantity = v_args['quantity']
        tpsl_method = v_args['tpsl_method']
        target = v_args['target']
        stop_loss = v_args['stop_loss']
        trail_profit = v_args['trail_profit']
        trail_stop_loss = v_args['trail_stop_loss']

        # Market Params
        market_trend_study  = m_args['market_trend_study']
        

        ###########################################
        # Market Trend Study
        ###########################################  
        if market_trend_study:
            
            local_market_sentiment = self.get_local_market_sentiment()
            global_market_sentiment = self.get_global_market_sentiment()


        ###########################################
        # Get Live Data
        ###########################################

        stock_basket = self.get_stock_basket(exchange, symbol)
        instruments_list = self.modules['fetch'].fetch_instruments(exchange)  
        watchlist_stocks = [instrument for instrument in instruments_list if instrument['tradingsymbol'] in stock_basket]

        for stock in watchlist_stocks:
            trading_symbol = stock['tradingsymbol']
            instrument_quote = self.modules['fetch'].fetch_quote(exchange, trading_symbol)

            # Extract relevant information and store it
            stock_data[trading_symbol] = {
                'summary_data': stock,
                'quote_data': instrument_quote
            }
            
            if historical_data_subscription:
                datasource = self.modules['fetch'].fetch_ohlc(exchange, trading_symbol, interval, duration)
            else: 
                pass

            # Process Indicator and Candle Data                    
            ohlcv_data['open'] = datasource['open'].tolist()
            ohlcv_data['high'] = datasource['high'].tolist()
            ohlcv_data['low'] = datasource['low'].tolist()
            ohlcv_data['close'] = datasource['close'].tolist()
            ohlcv_data['volume'] = datasource['volume'].tolist()

            indicator_data['rsi'] = self.get_indicator_values('rsi', datasource, RSI.RSI_8.value)
            indicator_data['wma5'] = self.get_indicator_values('wma', datasource, WMA.WMA_5.value)
            indicator_data['wma20'] = self.get_indicator_values('wma', datasource, WMA.WMA_21.value)
            indicator_data['supertrend'] = self.get_indicator_values('supertrend', datasource,  Supertrend.SUPERTREND_4_2.value)

            # Evaluate Strategy conditions based on obtained Candle and Indicator data
            primary_conditions = self.evaluate_strategy_conditions(indicator_data, ohlcv_data)
            if primary_conditions:
                # Check Secondary Conditions
                print(f"Conditions Met: Stock Alert : {trading_symbol}")
                stock_alerts.append(trading_symbol)
                pass
            else:
                continue


        print(stock_alerts)            
        end_time = time.time()
        execution_time = end_time - start_time
        logging.info(f"Execution time: {execution_time} seconds")

        


    ###########################################
    # Evaluate Strategy Conditions
    ###########################################
        
    def evaluate_strategy_conditions(self, ohlcv_data, indicator_data):

        open = ohlcv_data['close']
        close = ohlcv_data['close']
        close = ohlcv_data['close']
        close = ohlcv_data['close']

        rsi = indicator_data['rsi']
        wma5 = indicator_data['wma5']
        wma20 = indicator_data['wma20']
        supertrend = indicator_data['supertrend']
        
        # Condition 1
        condition1 = wma5[-1] > wma20[-1]

        # Condition 2
        condition2 = close[-1] > supertrend[-1]

        # Condition 3
        condition3 = close[-2] <= supertrend[-2]

        # Condition 4
        condition4 = rsi[-1] > 60

        # Condition 5
        condition5 = rsi[-2] <= 60

        # Final Strategy Condition
        if condition1 and condition2 and condition3 and condition4 and condition5:
            return True
        else:
            return False
