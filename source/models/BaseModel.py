# IntelliTrader\source\models\BaseModel.py

from abc import ABC, abstractmethod
from datetime import datetime
import time

class BaseModel(ABC):
    def __init__(self):
        self.created_by       = "IntelliTrader"
        self.modified_date    = time.strftime("%Y-%m-%d %H:%M:%S")

    def convert_table_rows_to_dict(self, table_configuration):
        """
        Converts the object attributes to a dictionary, including hash and sort key information.
        """
        data_dict = {}
        rows = {}
        for attr_name, attr_value in self.__dict__.items():
            if not callable(attr_value):
                rows[attr_name] = attr_value
        
        data_dict["row_data"] = rows
        
        # Extract hash key information from the already created table_row_data
        hash_key_name            = table_configuration["hash_key"]
        hash_key_value           = data_dict["row_data"][hash_key_name]  
        data_dict["hash_key"]    = {hash_key_name: hash_key_value}
        data_dict["hash_object"] = {"name" : hash_key_name, "value" : hash_key_value}

        # Extract sort key information (if applicable)
        sort_key_name = table_configuration.get("sort_key", None)
        if sort_key_name:
            sort_key_value           = data_dict['row_data'][sort_key_name]  
            data_dict["sort_key"]    = {sort_key_name: sort_key_value}
            data_dict["sort_object"] = {"name" : sort_key_name, "value" : sort_key_value}            
        else:
            data_dict["sort_key"] = None
            data_dict["sort_object"] = None

        return data_dict