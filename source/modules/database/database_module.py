# source/controllers/database_controller.py
"""
DatabaseController
"""

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.modules.database.BaseDatabase import BaseDatabase
from source.modules.database._database_create_table import DatabaseCreateTable
from source.modules.database._database_delete_table import DatabaseDeleteTable
from source.modules.database._database_insert_record import DatabaseInsertRecord
# from source.modules.database._database_update_record import DatabaseUpdateRecord 
# from source.modules.database._database_delete_record import DatabaseDeleteRecord
from source.modules.database._database_fetch_record import DatabaseFetchRecord

import json
 
class Database():
    
    def __init__(self, connection, modules, app_configuration, table_configuration):
        super().__init__() 
        self.connection                     = connection
        self.modules                        = modules
        self.app_configuration              = app_configuration
        self.table_configuration            = table_configuration        
        self.tables_list                    = None
        self.table_to_delete                = None # Get this from app_config // Todo
        self.data                           = None
        
    ###########################################
    # Initialize Database Controller
    ###########################################  
    
    def initialize(self):
        log_info(f"We are setting up the database for the first time. Hang tight, we're on it!")    
        return self.manage_tables()   
    
                   
    def manage_tables(self):
        """
        Pre-Requisite Database Operations
        """

        for table_config in self.table_configuration.values():
            table_name = table_config["table_key"] 
        
            # 1. Create Required Tables
            object_create_table_handler = DatabaseCreateTable(table_name, table_config)
            object_create_table_handler.initialize()
        
            # 2. Delete Existing Tables
            if table_name != self.table_to_delete:
                continue
            else:
                object_delete_table_handler = DatabaseDeleteTable(table_name, table_config)
                object_delete_table_handler.initialize()


    def manage_table_records(self, event, table_name, table_data, custom_method=None, filters=None):

        match event:
            case "get" | "query":                
                object_fetch_record_handler = DatabaseFetchRecord(self.table_configuration, table_name, table_data, custom_method, filters)
                return object_fetch_record_handler.initialize(event)

            case "put":
                object_insert_record_handler = DatabaseInsertRecord(self.table_configuration, table_name, table_data, custom_method, filters)
                return object_insert_record_handler.initialize(event)

            case "update":
                # Handle "update" event logic here
                pass

            case "delete":
                # Handle "delete" event logic here
                pass

            case _:  # Default case
                log_warn(f"Unknown event type: {event}")
                # You could raise an exception here if needed