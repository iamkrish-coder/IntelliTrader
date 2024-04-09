# aws_dynamodb.py

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.aws.DynamoDB.aws_dynamo_expression_builder import DynamoExpressionBuilder
from boto3.resources.model import DefinitionWithParams
from boto3.exceptions import botocore
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr
import boto3

class DynamoDB:
    def __init__(self, table, attribute_data=None, partition_key=None, sort_key=None, projection=None, filters=None):
        self.table = table
        self.attribute_data = attribute_data
        self.partition_key = partition_key
        self.sort_key = sort_key
        self.projection = projection
        self.filters = filters
        self.dynamodb_resource = boto3.resource("dynamodb", region_name=REGION_NAME)
        self.dynamodb_table = self.dynamodb_resource.Table(self.table)
        self.builder = DynamoExpressionBuilder()

    def update(self):

        response = None       
        expression = (
            self.builder \
            .use_key_expression(self.partition_key, self.sort_key) \
            .use_update_expression(self.attribute_data) \
            .build()
        )

        try:
            response = self.dynamodb_table.update_item(**expression)
            if response['ResponseMetadata']['HTTPStatusCode'] == 200:
                log_info("Item updated successfully!")
                return response

        except ClientError as e:           
            log_error(f"Error updating item {self.attribute_data} from table {self.table}. Here's why: {e.response["Error"]["Code"]}: {e.response["Error"]["Message"]}")
            raise
        return response  

    def put(self):

        response = None       
        expression = (
            self.builder \
            .use_item(self.attribute_data) \
            .build()
        )

        try:
            response = self.dynamodb_table.put_item(Item=expression["Item"])
            if response['ResponseMetadata']['HTTPStatusCode'] == 200:
                log_info("Item added successfully!")
                return response
            
        except ClientError as e:           
            log_error(f"Error adding item {self.attribute_data} from table {self.table}. Here's why: {e.response["Error"]["Code"]}: {e.response["Error"]["Message"]}")
            raise
        return response  

    def scan(self):

        response = None       
        expression = (
            self.builder \
            .use_filter(self.filters) \
            .use_projection(self.projection) \
            .build()
        )

        try:
            response = self.dynamodb_table.scan(**expression)
            if response['ResponseMetadata']['HTTPStatusCode'] == 200:

                if 'Items' not in response or not response['Items']:
                    log_info(f"Record not found in table {self.table}. Table might be empty.")
                    return None
                else:
                    log_info(f"Record fetched successfully: {response}")                        
                    return response["Items"]

        except ClientError as e:
            log_error(f"Error fetching record from table {self.table}. Here's why: {e.response["Error"]["Code"]}: {e.response["Error"]["Message"]}")
            raise      
        return response
        
    def query(self):

        response = None       
        expression = (
            self.builder \
            .use_key_condition_expression(self.partition_key, self.sort_key) \
            .use_filter(self.filters) \
            .use_projection(self.projection) \
            .build()
        )

        try:
            response = self.dynamodb_table.query(**expression)
            if response['ResponseMetadata']['HTTPStatusCode'] == 200:

                if 'Items' not in response or not response['Items']:
                    log_info(f"Record not found in table {self.table}. Table might be empty.")
                    return None
                else:
                    log_info(f"Record fetched successfully: {response}")                        
                    return response["Items"]

        except ClientError as e:
            log_error(f"Error fetching record from table {self.table}. Here's why: {e.response["Error"]["Code"]}: {e.response["Error"]["Message"]}")
            raise
        return response
        
