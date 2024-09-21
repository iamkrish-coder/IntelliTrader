from backend.utils.logging_utils import *

from backend.controllers.database_controller import DatabaseController
from backend.controllers.cloud_controller import CloudController


class FactoryReset:

    def __init__(self, connection, modules, app_configuration, table_configuration):
        self.connection = connection
        self.modules = modules
        self.app_configuration = app_configuration
        self.table_configuration = table_configuration

    ###########################################
    # Initialize Database Module
    ###########################################

    def initialize(self):
        log_info("********* Resetting the application to its factory defaults. Hang tight, we're on it! ********* ")
        self.restore_factory_defaults()

    def restore_factory_defaults(self):
        database_object = DatabaseController(self.connection, self.modules, self.app_configuration,
                                          self.table_configuration)
        strategy_object = CloudController(self.connection, self.modules, self.app_configuration,
                                          self.table_configuration)

        # Delete Tables | Delete Caches | Delete Configs | Delete Subscriptions | Delete Topics | Delete Queues

        log_info("Removing subscriptions...")
        if not strategy_object.delete_subscriptions():
            return False

        log_info("Removing topics...")
        if not strategy_object.delete_topics():
            return False

        log_info("Removing queues...")
        if not strategy_object.delete_queues():
            return False

        log_info("Removing tables...")
        if not database_object.delete_tables():
            return False

        return True
