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
from source.handlers.action.BaseAction import BaseAction
from source.constants.constants import *
from source.enumerations.enums import *
from source.shared.logging_utils import *
from source.handlers.action._action_configurations import ActionConfigurations
from source.handlers.action._action_parameters import ActionParameters
from source.handlers.action._action_monitor_watchlist import ActionMonitorWatchlist

class ActionHandler(BaseAction):
    
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
