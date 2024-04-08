# database_create_table.py

from boto3.resources.model import DefinitionWithParams
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.modules.database.comparison_operator import ComparisonOperators

from boto3.exceptions import botocore
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr
import boto3

class DatabaseInsertRecord:
    def __init__(self, table_configuration, table_name, table_data, custom_method=None, filters=None, operators=None):
        
        self.configuration            = table_configuration
        self.table_name               = table_name
        self.dynamodb_resource        = boto3.resource('dynamodb', region_name=REGION_NAME)
        self.dynamodb_table           = self.dynamodb_resource.Table(self.table_name)
        self.table_data               = table_data
        self.custom_method            = custom_method
        self.filters                  = filters
        self.operators                = operators   
        

    def initialize(self, event=None):
        return self.put_record()
    

    def put_record(self):
        response = None       
        item = self.table_data["row_data"]
        
        try:
            response = self.dynamodb_table.put_item(Item=item)
            if response['ResponseMetadata']['HTTPStatusCode'] == 200:
                log_info("Item added successfully!")
                return response
            
        except ClientError as e:           
            log_error(f"Error adding item {self.table_data["row_data"]} from table {self.table_name}. Here's why: {e.response["Error"]["Code"]}: {e.response["Error"]["Message"]}")
            raise
        
        return response  
