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
    
class DatabaseController(BaseDatabase):
    
    def __init__(self, connection, modules, configuration):
        super().__init__(connection, modules) 
        self.configuration  = configuration
        self.table_name_to_delete = None
        
    ###########################################
    # Initialize Database Controller
    ###########################################  
    
    def initialize(self):
        log_info(f"Running database setup...")        
        return self.database_handler()   
    
    def database_handler(self):
        """
        Pre-Requisite Database Operations
        """

        # 1. Create Required Tables
        object_create_table_handler = DatabaseCreateTable(self.configuration)
        object_create_table_handler.initialize()
        
        # 2. Delete Existing Tables
        object_delete_table_handler = DatabaseDeleteTable(self.configuration, self.table_name_to_delete)
        object_delete_table_handler.initialize()