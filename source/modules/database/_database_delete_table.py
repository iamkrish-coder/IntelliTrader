# database_delete_table.py

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.utils.caching_utils import *
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
            """ Check If Table Exists """
            table_exists = self.check_table_exists()  

            if table_exists:
                try:
                    log_info(f"Resetting '{self.table_name}'...")
                    response = self.dynamodb_table.delete()
                    
                    if response['ResponseMetadata']['HTTPStatusCode'] == 200:
                        self.remove_table_cache()
                        self.update_table_configuration()

                    log_info(f"Delete '{self.table_name}' table ...COMPLETE!")
                    return response
                    
                except ClientError as error:               
                    log_error(f"Error deleting table {self.table_name}. Here's why: {error.response["Error"]["Code"]}: {error.response["Error"]["Message"]}")
                    raise error
                
            return response
        
    def remove_table_cache(self):
        deleted_table_name = cache_directory = self.table_name
        cache_directory = self.table_name
        remove_cache(Cache_Type.DISK.value, cache_directory)
        log_info(f"Delete '{deleted_table_name}' cache ...COMPLETE!")

    def update_table_configuration(self):
        deleted_table_name = self.table_name

        # Read the config file
        with open(CONFIGURATION_PATH + '/' + TABLE_CONFIGURATION_FILE, 'r') as file:
            config_data = json.load(file)
    
        # Check if the deleted table name exists in the config
        if deleted_table_name in config_data:
            # Remove the entry associated with the deleted table name
            # del config_data[deleted_table_name] # Commented out for now
            log_info(f"Delete '{deleted_table_name}' configuration ...COMPLETE!")
        else:
            log_info(f"Table '{deleted_table_name}' not found in the configuration.")
    
        # Write the updated config back to the file
        with open(CONFIGURATION_PATH + '/' + TABLE_CONFIGURATION_FILE, 'w') as file:
            json.dump(config_data, file, indent=4)        

    def check_table_exists(self):
        try:
            self.dynamodb_table.load()
            exists = True
        except ClientError as error:
            if error.response['Error']['Code'] == 'ResourceNotFoundException':
                exists = False
            else:
                log_error(
                    "Couldn't check for existence of %s. Here's why: %s: %s",
                    self.table_name,
                    error.response["Error"]["Code"],
                    error.response["Error"]["Message"],
                )
                raise error
        return exists