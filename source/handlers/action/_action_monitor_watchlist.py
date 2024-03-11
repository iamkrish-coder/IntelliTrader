# handlers/actions

import datetime
import time
from source.constants.constants import *
from source.enumerations.enums import *
from source.shared.logging_utils import *
from source.handlers.action._action_subscriber import ActionSubscriber
from source.handlers.action._action_process_alerts import ActionProcessAlerts
from source.handlers.action._action_candlesticks import ActionCandlesticks
from source.handlers.action._action_evaluate_secondary_conditions import ActionEvaluateSecondaryConditions

class ActionMonitorWatchlist:
    
    def __init__(self, modules, parameters):
        self.modules = modules
        self.parameters = parameters
        self.watchlist = []
        self.candlesticks_handler_object = None
        self.evaluate_conditions_handler_object = None
        self.candlestick_data_list = None
        self.alerts = None
        self.attempts = 0

    def initialize(self):
        self.start_monitoring_subscriptions()

    def start_monitoring_subscriptions(self):
        # This method constantly checks for watchlist alerts
        while True:
            self.get_current_watchlist()
            
            if len(self.watchlist) > 0:
                print(f"Current Watchlist: {self.watchlist}")
                self.monitor_watchlist()
            
            # Sleep for 10 seconds before checking again                
            time.sleep(10) 
            

    def get_current_watchlist(self):
        
        subscriber_handler = ActionSubscriber(self.modules, self.parameters)
        self.message       = subscriber_handler.initialize()
        
        alert_handlers     = ActionProcessAlerts(self.modules, self.message, self.parameters)
        watchlist          = alert_handlers.initialize()
        if watchlist is not None:
            self.watchlist.extend(watchlist)


    def monitor_watchlist(self):

        current_time = datetime.datetime.now()
        if current_time.minute % 2 == 0:      
                  
            if self.candlesticks_handler_object is None:
               self.candlesticks_handler = ActionCandlesticks(self.modules, self.watchlist, self.parameters)

            self.candlestick_data_list = self.candlesticks_handler_object.initialize()
            
                # if self.evaluate_conditions_handler is None:
                #     self.call_evaluate_conditions_handler()
            
                # self.evaluate_conditions()

                # if self.conditions_met():
                #     self.store_trade_details()
        # else:
        #     log_info(f"Sleeping for {60 - current_time.second} seconds before checking again")            
        #     time.sleep(60 - current_time.second)
                 

    def call_evaluate_conditions_handler(self):
        self.evaluate_conditions_handler = ActionEvaluateSecondaryConditions(self.modules, self.candlestick_data_list, self.parameters)

    def evaluate_conditions(self):
        self.alerts = self.evaluate_conditions_handler.initialize()
        print(self.alerts)
        
    def conditions_met(self):
        # Implement your condition logic here
        pass

    def store_trade_details(self):
        # Implement your order placement logic here
        pass