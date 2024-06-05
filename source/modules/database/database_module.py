# source/controllers/database_module.py
"""
Database
"""
import json
import time

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *

from source.modules.database.BaseDatabase import BaseDatabase
from source.modules.database._database_create_table import DatabaseCreateTable
from source.modules.database._database_delete_table import DatabaseDeleteTable
from source.modules.database._database_insert_record import DatabaseInsertRecord
from source.modules.database._database_update_record import DatabaseUpdateRecord

# from source.modules.database._database_delete_record import DatabaseDeleteRecord
from source.modules.database._database_fetch_record import DatabaseFetchRecord


class Database(BaseDatabase):

    def __init__(self, connection, modules, app_configuration, table_configuration):
        self.connection = connection
        self.modules = modules
        self.app_configuration = app_configuration
        self.table_configuration = table_configuration
        self.reset_app = self.app_configuration.get("reset_app")


    ###########################################
    # Initialize Database Module
    ###########################################

    def initialize(self):
        log_info(f" ********* Setting up the application requirements... Hang tight, we're on it! ********* ")
        self.restore_factory_defaults()
        self.manage_tables()
        

    def restore_factory_defaults(self):
        # Reset Tables (if required)
        if self.reset_app is True:           
            log_info("Resetting the application to its factory defaults. Please wait...")

            # Delete Tables | Delete Caches | Delete Configs
            for config in self.table_configuration.values():
                table = config["table_key"]
                object_delete_table_handler = DatabaseDeleteTable(table, config)
                object_delete_table_handler.initialize()


    def manage_tables(self):
        """
        Pre-Requisite Table Operations
        """
        if len(self.table_configuration) == 0:
            log_info(f"No tables to manage.")
            return

        # Create Required Tables
        for config in self.table_configuration.values():
            table = config["table_key"]
            object_create_table_handler = DatabaseCreateTable(table, config)
            object_create_table_handler.initialize()

 
    def manage_table_records(self, dataset):
        event = dataset.get("event")
        table = dataset.get("table")
        config = dataset.get("config")
        data = dataset.get("data")

        match event:
            case "get" | "query" | "scan":
                object_fetch_record_handler = DatabaseFetchRecord(event, table, config, data)
                return object_fetch_record_handler.initialize()

            case "put":
                object_insert_record_handler = DatabaseInsertRecord(event, table, config, data)
                return object_insert_record_handler.initialize()

            case "update":
                object_update_record_handler = DatabaseUpdateRecord(event, table, config, data)
                return object_update_record_handler.initialize()

            case "delete":
                # Handle "delete" event logic here
                pass

            case _:  # Default case
                log_warn(f"Unknown event type: {event}")


    def database_request(self, request):
        log_info(f"Requesting AWS DynamoDB...")
        return self.manage_table_records(request)

