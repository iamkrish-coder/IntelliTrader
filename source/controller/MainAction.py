# # strategies/actions_handler.py
import datetime
import time
import math
import boto3
import asyncio

from ast import List
from time import sleep
from pandas import qcut
from source.enumerations.enums import Strategy
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.modules.action.BaseAction import BaseAction
from source.modules.action._action_configurations import ActionConfigurations
from source.modules.action._action_parameters import ActionParameters
from source.modules.action._action_monitor_watchlist import ActionMonitorWatchlist

class ActionController(BaseAction):
    
    def __init__(self, connection, modules, configuration):
        super().__init__(connection, modules) 
        self.configuration = configuration
        self.watchlist = None
        self.parameters = None
        
    ###########################################
    # Initialize Actions Handler
    ###########################################        

    def initialize(self):
        return self.handle_action()    

    def handle_action(self):
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

        **Current functionality:**
            - Loads configurations and parameters from ActionConfigurations and ActionParameters handlers.

        **Note:** The commented-out sections suggest potential functionalities that are not currently implemented. 
        These sections might be placeholders for future development or might require additional information about the specific actions your strategy performs.
        """

        configuration_handler = ActionConfigurations(self.configuration)
        settings = configuration_handler.initialize()
            
        parameters_handler = ActionParameters(settings)
        parameters_handler.initialize()
        self.parameters = parameters_handler.get_parameters()

        # monitor_handlers = ActionMonitorWatchlist(self.modules, self.parameters)
        # monitor_handlers.initialize()

        # subscriber_handler = ActionSubscriber(self.modules, params)
        # message = subscriber_handler.initialize()
        
        # alert_handlers = ActionProcessAlerts(self.modules, message, params)
        # watchlist = alert_handlers.initialize()

        # candlesticks_handler = ActionCandlesticks(self.modules, watchlist, params)
        # candlestick_data_list = candlesticks_handler.initialize()
        
        # evaluate_conditions_handler = ActionEvaluateSecondaryConditions(self.modules, candlestick_data_list, params) 
        # alerts = evaluate_conditions_handler.initialize()

        # conditions_met = self.evaluate_secondary_conditions(candlestick_data)
        # if conditions_met:
        #     self.is_stock_monitored = False
        #     return candlestick_data
