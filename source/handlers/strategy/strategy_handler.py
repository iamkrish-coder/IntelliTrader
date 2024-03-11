# handlers/strategy

import os
import time
import json
import asyncio
import boto3
import uuid
import pandas as pd

from source.enumerations.enums import Strategy
from ast import arg
from ctypes import alignment
from numpy import histogram
from turtle import st
from msilib.schema import CustomAction
from source.handlers.strategy.base_strategy import BaseStrategy
from source.constants.constants import *
from source.enumerations.enums import *
from source.queue.awsPublisher import aws_publish
from source.shared.logging_utils import *
from source.handlers.strategy._strategy_configurations import StrategyConfigurations
from source.handlers.strategy._strategy_parameters import StrategyParameters
from source.handlers.strategy._strategy_market_analysis import StrategyMarketAnalysis
from source.handlers.strategy._strategy_stock_baskets import StrategyStockBaskets
from source.handlers.strategy._strategy_candlesticks import StrategyCandlesticks
from source.handlers.strategy._strategy_indicators import StrategyIndicators
from source.handlers.strategy._strategy_evaluate_primary_conditions import StrategyEvaluatePrimaryConditions
from source.handlers.strategy._strategy_publisher import StrategyPublisher

class StrategyHandler(BaseStrategy):
    
    def __init__(self, connection, modules, configuration):
        super().__init__(connection, modules) 
        self.configuration = configuration
        
    ###########################################
    # Initialize Strategy Handler
    ###########################################
    def initialize(self):
        return self.handle_strategy()    

    def handle_strategy(self):
        
        configuration_handler = StrategyConfigurations(self.configuration)
        settings = configuration_handler.initialize()

        parameters_handler = StrategyParameters(settings)
        parameters_handler.initialize()
        params = parameters_handler.get_parameters()

        market_analysis_handler = StrategyMarketAnalysis(self.modules, params)
        trend = market_analysis_handler.initialize()

        stock_baskets_handler = StrategyStockBaskets(self.modules, params)
        watchlist = stock_baskets_handler.initialize()

        candlesticks_handler = StrategyCandlesticks(self.modules, watchlist, params)
        candlestick_data_list = candlesticks_handler.initialize()
        
        indicators_handler = StrategyIndicators(self.modules, candlestick_data_list, params)
        indicators_data_list = indicators_handler.initialize()

        evaluate_conditions_handler = StrategyEvaluatePrimaryConditions(self.modules, candlestick_data_list, indicators_data_list, params) 
        alerts = evaluate_conditions_handler.initialize()

        publisher_handler = StrategyPublisher(self.modules, alerts, params)
        publisher_handler.initialize()
        
   
        # self.process_data(strategy)
        # self.analyze_data(strategy)
        # self.execute_strategy(strategy)
        