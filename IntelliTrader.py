# Standard library imports
import asyncio
import datetime
import importlib
import os
import time
import threading
import webbrowser

# Third-party library imports
from flask import Flask, render_template, request, redirect, session
from pytz import utc

# Custom application modules
from source.constants import *  
from source.enumerations.enums import *
from source.enumerations.resource_string_enums import * 
from source.controller.MainStrategy import StrategyController
# from source.controller.MainAction import ActionController
from source.language.resources_EN_IN import ResourceStrings
from source.modules.BaseModules import BaseModules
from source.modules.configurations.configuration_module import Configuration
from source.modules.connection.connection_module import Connection

# utils Import
from source.utils.logging_utils import *
from source.utils.scheduler_utils import Scheduler

# IntelliTrader web application (if applicable)
try:
    from IntelliTrader_web import create_app
except ImportError:
    pass  # Handle IntelliTrader_web import error gracefully (optional)

# Application initialization
configure_logging()

class IntelliTrader:
    def __init__(self):
        self.connection = None
        self.modules = None
        self.configuration = None
        self.strategy_instance = None
        self.scheduler_instance = None
        self.initialize_components()
        self.initialize_logging()
        self.cancelled = False


    def initialize_logging(self):
        """ Establishes Logging capabilities """
        strategy_log_path = os.path.join(OUTPUT_PATH, 'strategy.log')
        action_log_path = os.path.join(OUTPUT_PATH, 'actions.log')
        monitoring_log_path = os.path.join(OUTPUT_PATH, 'monitoring.log')
        
        # Create named loggers with desired levels (optional)
        strategy_logger = logging.getLogger(Logger.STRATEGY_LOGGER.value)
        strategy_logger.setLevel(logging.DEBUG)
        action_logger = logging.getLogger(Logger.ACTION_LOGGER.value)
        action_logger.setLevel(logging.DEBUG)
        monitoring_logger = logging.getLogger(Logger.MONITORING_LOGGER.value)
        monitoring_logger.setLevel(logging.DEBUG)


    def get_configuration(self):
            return self.configuration

    def initialize_components(self):
        """ Establishes connection, initializes modules and configuration."""
        self.connection = Connection().connect_to_broker()
        self.modules = BaseModules(self.connection).get_all_modules()
        self.configuration = Configuration().read_input_configuration()


    ###########################################
    ###########################################
    #            STRATEGY CONTROLLER          # 
    ###########################################
    ###########################################    

    async def initialize_strategy_controller(self):
        """Starts the scanning process for watchlist stocks."""
        logger = logging.getLogger(STRATEGY_LOGGER_NAME)

        # Instantiate the Strategy Instance
        strategy_instance = StrategyController(self.connection, self.modules, self.configuration)        
        
        # Instantiate the Scheduler Instance 
        scheduler_instance = Scheduler(self.configuration, strategy_instance, None, ASYNCIO) 
        
        # Start Scheduler
        scheduler_instance.start_scheduler()
        await asyncio.sleep(6000)

    ###########################################
    ###########################################
    #            ACTION CONTROLLER            # 
    ###########################################
    ###########################################    


    async def initialize_action_controller(self):
        """Processes any generated alerts from the scanner."""
        logger = logging.getLogger(ACTION_LOGGER_NAME)
        y = 0
        while not self.cancelled: 
            logger.info(f"Running Actions...{y} Times")
            y += 1
            await asyncio.sleep(10)


    ###########################################
    ###########################################
    #          MONITORING CONTROLLER          #  
    ###########################################
    ###########################################    


    async def initialize_monitoring_controller(self):
        """Monitors existing trades and performs necessary actions."""
        logger = logging.getLogger(MONITORING_LOGGER_NAME)
        z = 0
        while not self.cancelled: 
            logger.info(f"Running Monitoring...{z} Times")
            z += 1
            await asyncio.sleep(10)


    ###########################################
    ###########################################
    #                RUN ALL                  #  
    ###########################################
    ###########################################   

    async def run_async_task(self):
        tasks = [
            self.initialize_strategy_controller()
            # self.initialize_action_controller(),
            # self.initialize_monitoring_controller()
        ]
        await asyncio.gather(*tasks)



######################################################################################
######################################################################################
#                                   APP START                                        #  
######################################################################################
######################################################################################   

if __name__ == "__main__":
    trader = IntelliTrader()
    configuration = trader.get_configuration()
 
    # # Start website
    # app = create_app(configuration)
    # url = f'http://{HOST}:{PORT}/'
    # webbrowser.open(url)
    # app.run(host=HOST, port=PORT)
    
    # Approach 1: Threading

    """
    
    # Start strategy in a separate thread
    strategy_thread = threading.Thread(target=trader.initialize_strategy_controller)
    strategy_thread.start()

    # Start action in a separate thread
    strategy_thread = threading.Thread(target=trader.initialize_action_controller)
    strategy_thread.start()
    
    # Start monitoring in a separate thread
    strategy_thread = threading.Thread(target=trader.initialize_monitoring_controller)
    strategy_thread.start()
    
    """

    # Approach 2: Multiprocessing

    # process1 = Process(target=trader.initialize_strategy_controller)
    # process1.start()

    # process2 = Process(target=trader.initialize_action_controller)
    # process2.start()

    # process3 = Process(target=trader.initialize_monitoring_controller)
    # process3.start()


    
    # Approach 3: Asyncio
    try:
        asyncio.run(trader.run_async_task())
    except (KeyboardInterrupt, asyncio.CancelledError):
        print("\nCaught keyboard interrupt. Canceling tasks...\n")
