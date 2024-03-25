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

 
class DatabaseController(BaseDatabase):
    
    def __init__(self, connection, modules, configuration):
        super().__init__(connection, modules) 
        self.configuration  = configuration
        self.table_name_to_delete = None
        
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
        # 1. Create Required Tables
        object_create_table_handler = DatabaseCreateTable(self.configuration)
        object_create_table_handler.initialize()
        
        # 2. Delete Existing Tables
        object_delete_table_handler = DatabaseDeleteTable(self.configuration, self.table_name_to_delete)
        object_delete_table_handler.initialize()
        

    def manage_table_records(self, event, table, data):
        match event:
            case "get":
                object_fetch_record_handler = DatabaseFetchRecord(self.configuration, table, data)
                object_fetch_record_handler.initialize()

            case "put":
                # Insert
                object_insert_record_handler = DatabaseInsertRecord(self.configuration, table, data)
                object_insert_record_handler.initialize()

            case "update":
                # Handle "update" event logic here
                pass

            case "delete":
                # Handle "delete" event logic here
                pass

            case _:  # Default case
                log_warn(f"Unknown event type: {event}")
                # You could raise an exception here if needed