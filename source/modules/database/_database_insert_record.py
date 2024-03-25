# database_create_table.py

from boto3.resources.model import DefinitionWithParams
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.aws.DynamoDB.aws_dynamodb import AWSDynamoDB
from botocore.client import ClientError


class DatabaseInsertRecord:
    def __init__(self, configuration, table_name, table_data):
        self.configuration = configuration
        self.table_name = table_name
        self.table_data = table_data

    def initialize(self):
        return self.insert_record()
    
    def insert_record(self):
        
        dynamodb_client = AWSDynamoDB(self.table_name)
        try:
            response = dynamodb_client.put_item(self.table_data)
            log_info(f"Record inserted successfully: {response}")
        except ClientError as error:
            log_error(f"Error inserting record: {error}")

