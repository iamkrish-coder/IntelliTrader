# database_delete_table.py

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.modules.database.comparison_operator import ComparisonOperators

from boto3.exceptions import botocore
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr

import boto3
import json

class DatabaseDeleteTable:
    def __init__(self, table_name, table_configuration):

        self.table_name          = table_name
        self.table_configuration = table_configuration
        self.dynamodb_resource   = boto3.resource('dynamodb', region_name=REGION_NAME)
        self.dynamodb_table      = self.dynamodb_resource.Table(self.table_name)
        
        
    def initialize(self):
        return self.delete_table()
    

    def delete_table(self):      
        response = None
        if self.table_name is not None:
            try:
                log_info(f"Deleting table '{self.table_name}'...")
                response = self.dynamodb_table.delete()
                if response['ResponseMetadata']['HTTPStatusCode'] == 200:
                    
                    self.update_table_configuration(self.table_name)
                    log_info(f"Delete '{self.table_name}' Table ...COMPLETE!")

            except ClientError as e:
                log_error(
                    "Couldn't delete table. Here's why: %s: %s",
                    e.response["Error"]["Code"],
                    e.response["Error"]["Message"]
                )
                raise

        return response
        

    def update_table_configuration(self, deleted_table_name):
        # Read the config file
        with open(CONFIGURATION_PATH + '/' + TABLE_CONFIGURATION_FILE, 'r') as file:
            config_data = json.load(file)
    
        # Check if the deleted table name exists in the config
        if deleted_table_name in config_data:
            # Remove the entry associated with the deleted table name
            del config_data[deleted_table_name]
            log_info(f"Table '{deleted_table_name}' configuration removed.")
        else:
            log_info(f"Table '{deleted_table_name}' not found in the configuration.")
    
        # Write the updated config back to the file
        with open(CONFIGURATION_PATH + '/' + TABLE_CONFIGURATION_FILE, 'w') as file:
            json.dump(config_data, file, indent=4)        