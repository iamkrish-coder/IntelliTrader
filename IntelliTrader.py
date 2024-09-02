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
from source.language.resources_EN_IN import ResourceStrings
from source.configurations.configuration import Configuration

from source.modules.BaseModules import BaseModules
from source.modules.restore.factory_reset import FactoryReset
from source.modules.connection.connection_module import Connection
from source.modules.database.database_module import Database as DatabaseManager
from source.modules.strategy.strategy_module import Strategy as StrategyManager
from source.modules.helper.helper_module import Helper

from source.controllers.BaseController import BaseController
from source.controllers.strategy_controller import StrategyController
from source.controllers.signal_processor_controller import SignalProcessorController

# from source.controllers.monitoring_controller import MonitoringController

# utils Import
from source.utils.logging_utils import *
from source.utils.scheduler_utils import Scheduler

# IntelliTrader web application (if applicable)
try:
    from IntelliTrader_web import create_web_app
except ImportError:
    pass  # Handle IntelliTrader_web import error gracefully (optional)


class IntelliTrader:
    def __init__(self):
        self.connection = None
        self.modules = None
        self.configuration = None
        self.database = None
        self.strategy = None
        self.strategy_controller_instance = None
        self.signal_processor_controller_instance = None
        self.monitoring_controller_instance = None
        self.scheduler_instance = None
        self.cancelled = False
        self.initialize_logging()
        self.controller = self.initialize_components()

    def initialize_logging(self):
        """Prepares logging for the application."""
        Helper().create_output_directory()
        configure_logging()

        """Establishes Logging capabilities"""
        database_log_path = os.path.join(OUTPUT_PATH, "database.log")
        strategy_log_path = os.path.join(OUTPUT_PATH, "strategy.log")
        signal_processor_log_path = os.path.join(OUTPUT_PATH, "signal_processor.log")
        monitoring_log_path = os.path.join(OUTPUT_PATH, "monitoring.log")

        # Create named loggers with desired levels (optional)
        database_logger = logging.getLogger(Logger.DATABASE_LOGGER.value)
        database_logger.setLevel(logging.DEBUG)
        strategy_logger = logging.getLogger(Logger.STRATEGY_LOGGER.value)
        strategy_logger.setLevel(logging.DEBUG)
        signal_processor_logger = logging.getLogger(Logger.signal_processor_logger.value)
        signal_processor_logger.setLevel(logging.DEBUG)
        monitoring_logger = logging.getLogger(Logger.MONITORING_LOGGER.value)
        monitoring_logger.setLevel(logging.DEBUG)

    def initialize_components(self):
        """Establishes connection, initializes modules and configuration."""
        self.connection = Connection().connect_to_broker()
        self.modules = BaseModules(self.connection).get_all_modules()
        self.app_configuration = Configuration().read_app_configuration()
        self.table_configuration = Configuration().read_table_configuration()

        if self.app_configuration is not None and self.table_configuration is not None:
            self.database = DatabaseManager(
                self.connection,
                self.modules,
                self.app_configuration,
                self.table_configuration,
            )
            self.strategy = StrategyManager(
                self.connection,
                self.modules,
                self.app_configuration,
                self.table_configuration,
            )
            return BaseController(
                self.connection, self.modules, self.app_configuration, self.database
            )
        else:
            log_error(
                "Incomplete configuration: App or Table configuration is missing. Please verify the setup..."
            )
            return None

    def get_configuration(self):
        return self.app_configuration

    ###########################################
    ###########################################
    #                RUN ALL                  #
    ###########################################
    ###########################################

    async def run_async_task(self):

        if self.controller is not None:
            """Initialize database connection and module prerequisites"""
            if not self.initialize_module_prerequisites():
                log_error(
                    f"Application failed to initialize required modules. Please check the setup."
                )
                return False
            else:
                """Initialize controllers only if all module initialization succeeded"""
                self.strategy_controller_instance = StrategyController(self.controller)
                self.signal_processor_controller_instance = SignalProcessorController(self.controller)
                # self.monitoring_controller_instance = None

                tasks = [
                    #self.strategy_controller(),
                    self.signal_processor_controller(),
                    #self.monitoring_controller()
                ]
                await asyncio.gather(*tasks)
        else:
            log_error(
                f"Application failed to initialize controller. Please check the setup."
            )
            return False

    ###########################################
    ###########################################
    #            MODULE PRE-REQUISITES        #
    ###########################################
    ###########################################

    def initialize_module_prerequisites(self):
        # Restore Factory Settings if Reset App is requested
        reset_application = self.app_configuration.get("reset_app")
        if reset_application is True:
            factory_reset_object = FactoryReset(
                self.connection,
                self.modules,
                self.app_configuration,
                self.table_configuration,
            )
            factory_reset_object.initialize()

        # Establishes Database Connection
        logger = logging.getLogger(DATABASE_LOGGER_NAME)
        if not self.database.initialize():
            return False

        # Establishes Module Prerequisites
        logger = logging.getLogger(STRATEGY_LOGGER_NAME)
        if not self.strategy.initialize():
            return False

        return True

    ###########################################
    ###########################################
    #            STRATEGY CONTROLLER          #
    ###########################################
    ###########################################

    async def strategy_controller(self):
        """Starts the scanning process for watchlist stocks."""
        logger = logging.getLogger(STRATEGY_LOGGER_NAME)
        await self.strategy_controller_instance.initialize()  # FOR TESTING

        # Instantiate the Scheduler Instance
        # scheduler_instance = Scheduler(self.configuration, strategy_controller_instance, None, ASYNCIO)

        # # Start Scheduler
        # scheduler_instance.start_scheduler()
        # await asyncio.sleep(6000)

    ###########################################
    ###########################################
    #       SIGNAL PROCESSOR CONTROLLER       #
    ###########################################
    ###########################################

    async def signal_processor_controller(self):
        """Processes any generated alerts from the scanner."""
        logger = logging.getLogger(SIGNAL_PROCESSOR_LOGGER_NAME)
        await self.signal_processor_controller_instance.initialize()

        # Instantiate the Scheduler Instance
        # scheduler_instance = Scheduler(self.configuration, signal_processor_controller_instance, None, ASYNCIO)

        # # Start Scheduler
        # scheduler_instance.start_scheduler()
        # await asyncio.sleep(6000)

    ###########################################
    ###########################################
    #          MONITORING CONTROLLER          #
    ###########################################
    ###########################################

    async def monitoring_controller(self):
        """Monitors existing trades and performs necessary actions."""
        logger = logging.getLogger(MONITORING_LOGGER_NAME)
        await self.monitoring_controller_instance.initialize()


######################################################################################
######################################################################################
#                                   APP START                                        #
######################################################################################
######################################################################################

if __name__ == "__main__":
    trader = IntelliTrader()

    # Approach 3: Asyncio
    try:
        asyncio.run(trader.run_async_task())
    except (KeyboardInterrupt, asyncio.CancelledError):
        print("\nCaught keyboard interrupt. Canceling tasks...\n")

    # Start website
    # configuration = trader.get_configuration()
    # app = create_web_app(configuration)
    # url = f'http://{HOST}:{PORT}/'
    # webbrowser.open(url)
    # app.run(host=HOST, port=PORT)

    """ DEPRECATED METHODS """

    # Approach 1: Threading

    """
    
    # Start strategy in a separate thread
    strategy_thread = threading.Thread(target=trader.initialize_strategy_controller)
    strategy_thread.start()

    # Start signal_processor in a separate thread
    strategy_thread = threading.Thread(target=trader.initialize_signal_processor_controller)
    strategy_thread.start()
    
    # Start monitoring in a separate thread
    strategy_thread = threading.Thread(target=trader.initialize_monitoring_controller)
    strategy_thread.start()
    
    """

    # Approach 2: Multiprocessing

    """
    
    process1 = Process(target=trader.initialize_strategy_controller)
    process1.start()

    process2 = Process(target=trader.initialize_signal_processor_controller)
    process2.start()

    process3 = Process(target=trader.initialize_monitoring_controller)
    process3.start()

    """
