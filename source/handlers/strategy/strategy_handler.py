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
from source.handlers.strategy.BaseStrategy import BaseStrategy
from source.constants.constants import *
from source.enumerations.enums import *
from source.shared.logging_utils import *
from source.handlers.strategy._strategy_configurations import StrategyConfigurations
from source.handlers.strategy._strategy_parameters import StrategyParameters
from source.handlers.strategy._strategy_market_analysis import StrategyMarketAnalysis
from source.handlers.strategy._strategy_stock_baskets import StrategyStockBaskets
from source.handlers.strategy._strategy_candlesticks import StrategyCandlesticks
from source.handlers.strategy._strategy_indicators import StrategyIndicators
from source.handlers.strategy._strategy_evaluate_primary_conditions import StrategyEvaluatePrimaryConditions
from source.handlers.strategy._strategy_publisher_sqs import StrategyPublisherSQS
from source.handlers.strategy._strategy_publisher_sns import StrategyPublisherSNS

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
        
        object_configuration_handler = StrategyConfigurations(self.configuration)
        settings = object_configuration_handler.initialize()

        object_parameters_handler = StrategyParameters(settings)
        object_parameters_handler.initialize()
        parameters = object_parameters_handler.get_parameters()

        object_market_analysis_handler = StrategyMarketAnalysis(self.modules, parameters)
        trend = object_market_analysis_handler.initialize()

        object_stock_baskets_handler = StrategyStockBaskets(self.modules, parameters)
        watchlist = object_stock_baskets_handler.initialize()

        object_candlesticks_handler = StrategyCandlesticks(self.modules, watchlist, parameters)
        candlestick_data_list = object_candlesticks_handler.initialize()
        
        object_indicators_handler = StrategyIndicators(self.modules, candlestick_data_list, parameters)
        indicators_data_list = object_indicators_handler.initialize()

        object_evaluate_conditions_handler = StrategyEvaluatePrimaryConditions(self.modules, candlestick_data_list, indicators_data_list, parameters) 
        alerts = object_evaluate_conditions_handler.initialize()

        object_publisher_handler = StrategyPublisherSNS(self.modules, alerts, parameters)
        object_publisher_handler.initialize()
        
   