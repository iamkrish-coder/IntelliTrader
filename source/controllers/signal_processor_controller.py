# controller/signal_processor

import os
import time
import datetime
import json
import asyncio
import math
import boto3
import uuid
import pandas as pd

from ast import List
from time import sleep
from pandas import qcut

from ..constants.const import *
from ..enumerations.enums import *

from ..configurations.shared_parameters import SharedParameters
from ..modules.signal_processor._signal_processor_configurations import SignalProcessorConfigurations
from ..modules.signal_processor._signal_processor_subscriber import SignalProcessorSubscriber
from ..modules.signal_processor._signal_processor_process_alerts import SignalProcessorProcessAlerts
from ..modules.signal_processor._signal_processor_candlesticks import SignalProcessorCandlesticks
from ..modules.signal_processor._signal_processor_scanner import SignalProcessorScanner
from ..modules.signal_processor._signal_processor_triggers import  SignalProcessorTriggers
from ..controllers.BaseController import BaseController
from ..utils.logging_utils import *


class SignalProcessorController(BaseController):

    def __init__(self, _base_):
        super().__init__(_base_.connection, _base_.modules, _base_.configuration, _base_.database)
        self.run_count = 0
        self.parameters = None
        self.watchlist = None
        self.subscriber = None
        self.messages = None
        self.alert_signals = None

    async def initialize(self):
        log_info(f"Running signal processor...{self.run_count} Times")
        return await self.signal_processor_handler()

    async def signal_processor_handler(self):
        """
        Orchestrates the execution of a trading strategy, coordinating multiple handlers for various tasks.

        Steps:
        1. Loads signal_processor configurations and parameters.
        2. Polls for new messages from Queue
        3. Adds stock alerts to watchlist
        4. Fetches candlestick data for short timeframes for the assets in the watchlist.
        5. Evaluates secondary conditions and generates trade signals
        6. Store the signals to a table
        """

        # 1. Load configurations and parameters
        object_configuration_handler = SignalProcessorConfigurations(self.configuration)
        settings = object_configuration_handler.initialize()

        object_parameters_handler = SharedParameters(settings)
        object_parameters_handler.initialize()
        self.parameters = object_parameters_handler.get_parameters()

        # 2. Poll for messages in Queue
        self.subscriber = SNS
        object_subscriber_handler = SignalProcessorSubscriber(self.connection, self.modules, self.parameters, self.database, self.subscriber)
        self.messages = object_subscriber_handler.initialize()

        if self.messages is not None:
            # 3. Add Stock Alerts to Watchlist
            alert_handlers = SignalProcessorProcessAlerts(self.connection, self.modules, self.parameters, self.database, self.messages)
            self.watchlist = alert_handlers.initialize()

            # 4. Get Micro Candlesticks Data for Secondary Checks
            object_candlesticks_handler = SignalProcessorCandlesticks(self.connection, self.modules, self.parameters, self.watchlist)
            try:
                candlestick_data_fetch_task = asyncio.create_task(
                    object_candlesticks_handler.initialize()
                )
                candlestick_data_list = await candlestick_data_fetch_task
                if not candlestick_data_list:
                    log_info("No candlestick data found for secondary checks.")

            except Exception as error:
                print(f"Error fetching candlestick data: {error}. Skipping indicator calculation.")

            else:
                # 5. Get Final Trade signals
                object_scanner_handler = SignalProcessorScanner(self.connection, self.modules, self.parameters, candlestick_data_list)
                self.alert_signals = object_scanner_handler.initialize()

                # 6. Store Trade signals
                if self.alert_signals is not None and len(self.alert_signals) > 0:
                    object_trigger_handler = SignalProcessorTriggers(self.connection, self.modules, self.parameters, self.database, self.alert_signals)
                    object_trigger_handler.initialize()
        else:
            log_info("No messages available in the subscribed queue.")

        self.run_count += 1