# source/controllers/database_controller.py
"""
DatabaseController
"""
import json

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.aws.sns.aws_sns_create_topic import AwsSnsCreateTopic
from source.aws.sns.aws_sns_delete_topic import AwsSnsDeleteTopic

from source.modules.database.BaseDatabase import BaseDatabase
from source.modules.database._database_create_table import DatabaseCreateTable
from source.modules.database._database_delete_table import DatabaseDeleteTable
from source.modules.database._database_insert_record import DatabaseInsertRecord
from source.modules.database._database_update_record import DatabaseUpdateRecord 
# from source.modules.database._database_delete_record import DatabaseDeleteRecord
from source.modules.database._database_fetch_record import DatabaseFetchRecord

 
class Database(BaseDatabase):
    
    def __init__(self, connection, modules, app_configuration, table_configuration):
        self.connection                     = connection
        self.modules                        = modules
        self.app_configuration              = app_configuration
        self.table_configuration            = table_configuration        
        self.tables_list                    = None
        self.table_to_delete                = None # Get this from app_config // Todo
        
    ###########################################
    # Initialize Database Controller
    ###########################################  
    
    def initialize(self):
        log_info(f"We are setting up the database for the first time. Hang tight, we're on it!")    
        self.manage_tables()
        # self.manage_queues()
        # self.manage_topics()
                       
    def manage_tables(self):
        """
        Pre-Requisite Database Operations
        """
        if len(self.table_configuration) == 0:
            log_info(f"No tables to manage.")
            return
            
        for config in self.table_configuration.values():
            table = config["table_key"] 

            # 1. Delete Existing Tables
            if table != self.table_to_delete:
                continue
            else:
                object_delete_table_handler = DatabaseDeleteTable(table, config)
                object_delete_table_handler.initialize()

            # 2. Create Required Tables
            object_create_table_handler = DatabaseCreateTable(table, config)
            object_create_table_handler.initialize()


    def manage_topics(self):
        """
        Pre-Requisite Topic Operations
        """
        

        
    def manage_queues(self):
        """
        Pre-Requisite Queue Operations
        """
        pass
        
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
                # You could raise an exception here if needed