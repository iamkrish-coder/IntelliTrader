# database_delete_table.py

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.modules.database.comparison_operator import ComparisonOperators

from boto3.exceptions import botocore
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr
import boto3

class DatabaseDeleteTable:
    def __init__(self, configuration, table_name):
        self.configuration = configuration
        self.table_name = table_name 
        
    def initialize(self):
        return self.delete_table()
    
    def delete_table(self):      
        response = None
        if self.table_name is not None:
            try:
                log_info(f"Deleting table '{self.table_name}'...")
                response = self.table.delete()
                if response['ResponseMetadata']['HTTPStatusCode'] == 200:
                    log_info(f"Delete '{self.table_name}' Table ...COMPLETE!")
            except ClientError as e:
                log_error(
                    "Couldn't delete table. Here's why: %s: %s",
                    e.response["Error"]["Code"],
                    e.response["Error"]["Message"]
                )
                raise

        return response
        