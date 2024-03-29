# database_create_table.py

from boto3.resources.model import DefinitionWithParams
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.modules.database.comparison_operator import ComparisonOperators
from source.aws.DynamoDB.aws_dynamodb import AWSDynamoDB
from botocore.client import ClientError


class DatabaseInsertRecord:
    def __init__(self, table_configuration, table_name, table_data, custom_method = None, filters=None):
        
        self.configuration     = table_configuration
        self.table_name        = table_name
        self.table_data        = table_data
        self.custom_method     = custom_method
        self.filters           = filters

    def initialize(self, event=None):
        return self.put_record()
    
    def put_record(self):
        
        dynamodb_resource = AWSDynamoDB(self.table_name)
        try:
            response = dynamodb_resource.put_item(self.table_data)
            log_info(f"Record inserted successfully: {response}")
        except ClientError as error:
            log_error(f"Error inserting record: {error}")

