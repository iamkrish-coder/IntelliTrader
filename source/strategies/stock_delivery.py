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

    def execute_virtual_strategy(self, args):
        start_time = time.time()                 
              
        # Extracting arguments into variables
        symbol = args['symbol']
        exchange = args['exchange']
        virtual_timeframe = args['virtual_timeframe']
        max_allocation = args['max_allocation']
        quantity = args['quantity']
        tpsl_method = args['tpsl_method']
        target = args['target']
        stop_loss = args['stop_loss']
        trail_profit = args['trail_profit']
        trail_stop_loss = args['trail_stop_loss']

        # Get the symbols from Baskets to run virtual Trade
        stock_list = self.get_stock_basket(exchange, symbol)
        print(stock_list)
        # Get Live data for symbols in Stock Basket
        

        # Compute the Indicator Values
        # rsi = self.modules['indicator'].use_indicator('rsi', data, 8)
        # wma5 = self.modules['indicator'].use_indicator('wma', data, 5)
        # wma20 = self.modules['indicator'].use_indicator('wma', data, 20)
        # supertrend = self.modules['indicator'].use_indicator('supertrend', data, [4, 2])

        # filtered_stocks = []
        # rsi_data = json.loads(rsi)
        # logging.info(rsi_data)


        # Execute Virtual Trade on filtered stocks

        # Store the result of Virtual Trade

        # Display the result of Virtual Trade

        end_time = time.time()
        execution_time = end_time - start_time
        logging.info(f"Execution time: {execution_time} seconds")

    def get_stock_basket(self, exchange, symbol):
        stock_basket = []       
        if(exchange.upper() == Exchange.NSE.value):
            if(symbol.upper() == "DEFAULT"):
               symbols_list = pd.read_csv(DEFAULT_BASKET)
               stock_basket = symbols_list['Symbol'].tolist()
            else:
                stock_basket.append(symbol.upper())
        elif(exchange.upper() == Exchange.BSE.value):
            if(symbol.upper() == "DEFAULT"):
                stock_basket = pd.read_csv(DEFAULT_BASKET)
            else:
                stock_basket.append(symbol.upper())
        else:
            logging.info(f"Invalid Exchange {exchange}")
                    
        return stock_basket        
