# handlers/strategy

import os
import time
import datetime
import json
import asyncio
import math
import boto3
import uuid
import pandas as pd

from functools import wraps
from ast import arg
from ctypes import alignment
from numpy import histogram
from turtle import st
from msilib.schema import CustomAction

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.controllers.BaseController import BaseController  
from source.modules.strategy._strategy_configurations import StrategyConfigurations
from source.modules.strategy._strategy_market_analysis import StrategyMarketAnalysis
from source.modules.strategy._strategy_watchlist import StrategyWatchlist
from source.modules.strategy._strategy_candlesticks import StrategyCandlesticks
from source.modules.strategy._strategy_indicators import StrategyIndicators
from source.modules.strategy._strategy_scanner import StrategyScanner
from source.modules.strategy._strategy_publisher import StrategyPublisher
from source.configurations.shared_parameters import SharedParameters

class StrategyController(BaseController):
    def __init__(self, _base_):
        super().__init__(_base_.connection, _base_.modules, _base_.configuration, _base_.database)
        self.run_count       = 0
        self.parameters      = None
        self.alerts          = None
    
    async def initialize(self):       
        log_info(f"Running Strategy...{self.run_count} Times")
        return await self.strategy_handler()    
    
    async def strategy_handler(self):
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

        object_parameters_handler = SharedParameters(settings)
        object_parameters_handler.initialize()
        self.parameters = object_parameters_handler.get_parameters()

        # 2. Perform market analysis
        object_market_analysis_handler = StrategyMarketAnalysis(self.modules, self.parameters)
        trend = object_market_analysis_handler.initialize()

        # 3. Manage watchlist
        object_watchlist_handler = StrategyWatchlist(self.modules, self.parameters)
        watchlist = object_watchlist_handler.initialize()

        # 4. Fetch candlestick data
        object_candlesticks_handler = StrategyCandlesticks(self.modules, self.parameters, watchlist)
        try:
            candlestick_data_fetch_task = asyncio.create_task(
                object_candlesticks_handler.initialize()
            )
            candlestick_data_list = await candlestick_data_fetch_task
            if not candlestick_data_list:
                log_info("No candlestick data returned. Skipping indicator calculation.")
                
        except Exception as e:
            print(f"Error fetching candlestick data: {e}. Skipping indicator calculation.")
            
        else:
            # 5. Calculate indicators
            object_indicators_handler = StrategyIndicators(self.modules, self.parameters, candlestick_data_list)
            indicators_data_list = object_indicators_handler.initialize()

            # 6. Scan for trading signals
            object_scanner_handler = StrategyScanner(self.modules, self.parameters, candlestick_data_list, indicators_data_list)
            self.alerts = object_scanner_handler.initialize()

            # 7. Publish alerts
            object_publisher_handler = StrategyPublisher(self.modules, self.parameters, self.database, self.alerts, SNS)
            object_publisher_handler.initialize()

            self.run_count += 1
