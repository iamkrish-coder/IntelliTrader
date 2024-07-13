# source/controllers/database_module.py
"""
Database
"""
import json
import time

from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *

from source.modules.database.BaseDatabase import BaseDatabase
from source.modules.database._database_create_table import DatabaseCreateTable
from source.modules.database._database_delete_table import DatabaseDeleteTable
from source.modules.database._database_delete_table import DatabaseDeleteTable
from source.modules.database._database_insert_record import DatabaseInsertRecord
from source.modules.database._database_update_record import DatabaseUpdateRecord
# from source.modules.database._database_delete_record import DatabaseDeleteRecord
from source.modules.database._database_fetch_record import DatabaseFetchRecord


class Database(BaseDatabase):

    def __init__(self, connection, modules, app_configuration, table_configuration):
        super().__init__(connection, modules)
        self.connection = connection
        self.modules = modules
        self.app_configuration = app_configuration
        self.table_configuration = table_configuration

    ###########################################
    # Initialize Database Module
    ###########################################

    def initialize(self):
        log_info(f"********* Setting up the application requirements. Hang tight, we're on it! *********")
        if not self.manage_tables():
            return False
        else:
            return True

    def database_request(self, request):
        log_info(f"Requesting AWS DynamoDB...")
        return self.manage_table_records(request)

    def manage_tables(self):
        """
        Pre-Requisite Table Operations
        """
        if len(self.table_configuration) == 0:
            log_info(f"No tables to manage.")
            return False
        else:
            log_info("Creating tables...")
            create_table_manager = DatabaseCreateTable(self.table_configuration)
            tables_to_create = [config["table_key"] for config in self.table_configuration.values()]
            create_table_manager.initialize(tables_to_create)
            log_info(f"Created tables: {', '.join(tables_to_create)}")
            return True

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

    def delete_tables(self):
        delete_table_manager = DatabaseDeleteTable(self.table_configuration)
        tables_to_delete = [config["table_key"] for config in self.table_configuration.values()]
        if not delete_table_manager.initialize(tables_to_delete):
            return False
        else:
            log_info(f"Deleted tables: {', '.join(tables_to_delete)}")
            return True
