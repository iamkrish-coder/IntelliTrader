# handlers/strategy

import os
import time
import json
import asyncio
import boto3
import uuid
import pandas as pd

from functools import wraps  
from source.enumerations.enums import Strategy
from ast import arg
from ctypes import alignment
from numpy import histogram
from turtle import st
from msilib.schema import CustomAction

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.modules.strategy.BaseStrategy import BaseStrategy
from source.modules.strategy._strategy_configurations import StrategyConfigurations
from source.modules.strategy._strategy_parameters import StrategyParameters
from source.modules.strategy._strategy_market_analysis import StrategyMarketAnalysis
from source.modules.strategy._strategy_watchlist import StrategyWatchlist
from source.modules.strategy._strategy_candlesticks import StrategyCandlesticks
from source.modules.strategy._strategy_indicators import StrategyIndicators
from source.modules.strategy._strategy_scanner import StrategyScanner
from source.modules.strategy._strategy_publisher import StrategyPublisher

class StrategyController(BaseStrategy):
    
    def __init__(self, connection, modules, configuration):
        super().__init__(connection, modules) 
        self.configuration = configuration
        self.run_count = 0
        
    def log_execution(func):
        @wraps(func)  # Preserves function metadata
        def wrapper(*args, **kwargs):
            log_info(f"Function '{func.__name__}' triggered")
            return func(*args, **kwargs)
        return wrapper

    ###########################################
    # Initialize Strategy Handler
    ###########################################
    
    async def initialize(self):
        log_info(f"Running Strategy...{self.run_count} Times")
        return await self.handle_strategy()    
    
    async def handle_strategy(self):
        """
        Orchestrates the execution of a trading strategy, coordinating multiple handlers for various tasks.

        Steps:
        1. Loads strategy configurations and parameters.
        2. Performs market analysis to determine the current trend.
        3. Manages a watchlist of assets for potential trading opportunities.
        4. Fetches candlestick data for the assets in the watchlist.
        5. Calculates technical indicators based on the candlestick data.
        6. Scans for trading signals based on the indicators and trend.
        7. Publishes alerts for identified trading signals.
        """

        # 1. Load configurations and parameters
        object_configuration_handler = StrategyConfigurations(self.configuration)
        settings = object_configuration_handler.initialize()

        object_parameters_handler = StrategyParameters(settings)
        object_parameters_handler.initialize()
        parameters = object_parameters_handler.get_parameters()

        # 2. Perform market analysis
        object_market_analysis_handler = StrategyMarketAnalysis(self.modules, parameters)
        trend = object_market_analysis_handler.initialize()

        # 3. Manage watchlist
        object_watchlist_handler = StrategyWatchlist(self.modules, parameters)
        watchlist = object_watchlist_handler.initialize()

        # 4. Fetch candlestick data
        object_candlesticks_handler = StrategyCandlesticks(self.modules, watchlist, parameters)
        candlestick_data_list = object_candlesticks_handler.initialize()

        try:
            candlestick_data_fetch_task = asyncio.create_task(
                object_candlesticks_handler.get_candlestick_information()
            )

            # Await the completion of candlestick data retrieval
            candlestick_data_list = await candlestick_data_fetch_task

            # Continue with calculations and remaining steps...
        except Exception as e:
            # Handle permission error
            print(f"Error fetching candlestick data: {e}. Skipping indicator calculation.")
        else:
            # 5. Calculate indicators
            object_indicators_handler = StrategyIndicators(self.modules, candlestick_data_list, parameters)
            indicators_data_list = object_indicators_handler.initialize()

            # 6. Scan for trading signals
            object_scanner_handler = StrategyScanner(self.modules, candlestick_data_list, indicators_data_list, parameters)
            alerts = object_scanner_handler.initialize()

            # 7. Publish alerts
            object_publisher_handler = StrategyPublisher(self.modules, alerts, parameters, SNS)
            object_publisher_handler.initialize()




        
   