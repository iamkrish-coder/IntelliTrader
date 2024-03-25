# database_fetch_record.py

from boto3.resources.model import DefinitionWithParams
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.aws.DynamoDB.aws_dynamodb import AWSDynamoDB
from botocore.client import ClientError


class DatabaseFetchRecord:
    def __init__(self, configuration, table_name, table_partition_key):
        self.configuration = configuration
        self.table_name = table_name
        self.table_partition_key = table_partition_key

    def initialize(self):
        return self.fetch_record()
    
    def fetch_record(self):
        
        dynamodb_client = AWSDynamoDB(self.table_name)
        try:
            response = dynamodb_client.get_item(self.table_partition_key)
            log_info(f"Record fetched successfully: {response}")
        except ClientError as error:
            log_error(f"Error fetching record: {error}")

