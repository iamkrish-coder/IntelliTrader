# strategies/options_strategy.py
from ast import arg
from src.strategies.base_strategy import BaseStrategy
from src.handlers.virtual_strategy_handler import VirtualStrategyHandler
import os
import pandas
import time
import json

class StockDelivery(BaseStrategy):
    def __init__(self, connection, modules, timeframe, ticker, strike, exchange, symbol, expiry, offset):
        super().__init__(connection, modules)
        
    def execute_live_strategy(self):
        pass

    def execute_virtual_strategy(self, args):
        start_time = time.time()                                 
        virtual_handler = VirtualStrategyHandler()
        
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

        # Get the symbols from Baskets to run virtual 
        stock_list = virtual_handler.get_stock_baskets(exchange, symbol)
        print(sorted(stock_list))
        

        # Compute the Indicator Values
        # rsi = self.modules['indicator'].use_indicator('rsi', data, 8)
        # wma5 = self.modules['indicator'].use_indicator('wma', data, 5)
        # wma20 = self.modules['indicator'].use_indicator('wma', data, 20)
        # supertrend = self.modules['indicator'].use_indicator('supertrend', data, [4, 2])

        # filtered_stocks = []
        # rsi_data = json.loads(rsi)
        # print(rsi_data)


        # Execute Virtual Trade on filtered stocks

        # Store the result of Virtual Trade

        # Display the result of Virtual Trade

        end_time = time.time()
        execution_time = end_time - start_time
        print("Execution time:", execution_time, "seconds")