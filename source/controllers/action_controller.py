# strategies/actions_handler.py

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
from ..utils.logging_utils import *
from ..controllers.BaseController import BaseController
from ..modules.action._action_configurations import ActionConfigurations
from ..modules.action._action_subscriber import ActionSubscriber
from ..modules.action._action_process_alerts import ActionProcessAlerts
from ..modules.action._action_candlesticks import ActionCandlesticks
from ..modules.action._action_evaluate_secondary_conditions import ActionEvaluateSecondaryConditions
from ..configurations.shared_parameters import SharedParameters


class ActionController(BaseController):

    def __init__(self, _base_):
        super().__init__(_base_.connection, _base_.modules, _base_.configuration, _base_.database)
        self.run_count = 0
        self.parameters = None
        self.watchlist = None

    async def initialize(self):
        log_info(f"Running actions...{self.run_count} Times")
        return await self.action_handler()

    async def action_handler(self):
        """
        This method handles the execution of an action, likely related to monitoring or processing alerts for a trading strategy.

        Steps (Commented out for now):
            1. Load action configurations and parameters (already implemented).
            2. Potentially monitor a watchlist based on the parameters (commented out).
            3. Possibly subscribe to a message source for updates (commented out).
            4. Potentially process incoming alerts based on the message and parameters (commented out).
            5. Potentially fetch candlestick data for relevant assets (commented out).
            6. Potentially evaluate secondary conditions based on the candlestick data (commented out).
            7. Potentially update the monitored state based on the evaluation (commented out).
            8. Potentially return candlestick data if conditions are met (commented out).
        """

        # 1. Load configurations and parameters
        object_configuration_handler = ActionConfigurations(self.configuration)
        settings = object_configuration_handler.initialize()

        object_parameters_handler = SharedParameters(settings)
        object_parameters_handler.initialize()
        self.parameters = object_parameters_handler.get_parameters()

        object_subscriber_handler = ActionSubscriber(self.modules, self.parameters, self.database, SNS)
        messages = object_subscriber_handler.initialize()
        print(messages)

        # alert_handlers = ActionProcessAlerts(self.modules, messages, self.parameters)
        # watchlist = alert_handlers.initialize()

        # candlesticks_handler = ActionCandlesticks(self.modules, watchlist, self.parameters)
        # candlestick_data_list = candlesticks_handler.initialize()

        # evaluate_conditions_handler = ActionEvaluateSecondaryConditions(self.modules, candlestick_data_list, self.parameters) 
        # alerts = evaluate_conditions_handler.initialize()

        # conditions_met = self.evaluate_secondary_conditions(candlestick_data_list)
        # if conditions_met:
        #     self.is_stock_monitored = False
        #     return candlestick_data_list

    # def start_monitoring_subscriptions(self):
    #     # This method constantly checks for watchlist alerts
    #     while True:
    #         self.get_current_watchlist()

    #         if len(self.watchlist) > 0:
    #             print(f"Current Watchlist: {self.watchlist}")
    #             self.monitor_watchlist()

    #         # Sleep for 10 seconds before checking again                
    #         time.sleep(10) 

    # def get_current_watchlist(self):

    #     subscriber_handler = ActionSubscriber(self.modules, self.parameters)
    #     self.message       = subscriber_handler.initialize()

    #     alert_handlers     = ActionProcessAlerts(self.modules, self.message, self.parameters)
    #     watchlist          = alert_handlers.initialize()
    #     if watchlist is not None:
    #         self.watchlist.extend(watchlist)

    # def monitor_watchlist(self):

    #     current_time = datetime.datetime.now()
    #     if current_time.minute % 2 == 0:      

    #         if self.candlesticks_handler_object is None:
    #            self.candlesticks_handler = ActionCandlesticks(self.modules, self.watchlist, self.parameters)

    #         self.candlestick_data_list = self.candlesticks_handler_object.initialize()

    #             # if self.evaluate_conditions_handler is None:
    #             #     self.call_evaluate_conditions_handler()

    #             # self.evaluate_conditions()

    #             # if self.conditions_met():
    #             #     self.store_trade_details()
    #     # else:
    #     #     log_info(f"Sleeping for {60 - current_time.second} seconds before checking again")            
    #     #     time.sleep(60 - current_time.second)

    # def call_evaluate_conditions_handler(self):
    #     self.evaluate_conditions_handler = ActionEvaluateSecondaryConditions(self.modules, self.candlestick_data_list, self.parameters)

    # def evaluate_conditions(self):
    #     self.alerts = self.evaluate_conditions_handler.initialize()
    #     print(self.alerts)

    # def conditions_met(self):
    #     # Implement your condition logic here
    #     pass

    # def store_trade_details(self):
    #     # Implement your order placement logic here
    #     pass
