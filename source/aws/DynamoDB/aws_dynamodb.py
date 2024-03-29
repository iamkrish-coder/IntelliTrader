# source/aws/DynamoDB/aws_dynamodb.py

import boto3
from boto3.exceptions import botocore
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr
from source.utils.logging_utils import *
from source.constants.constants import REGION_NAME

class AWSDynamoDB:

    def __init__(self, table_name = None, region_name=REGION_NAME):
        self.table_name = table_name
        self.dynamodb_resource = boto3.resource('dynamodb', region_name=region_name)
        self.table = self.dynamodb_resource.Table(self.table_name)


    def check_table_exists(self):
        try:
            self.table.load()
            exists = True
        except ClientError as e:
            if e.response['Error']['Code'] == 'ResourceNotFoundException':
                exists = False
            else:
                log_error(
                    "Couldn't check for existence of %s. Here's why: %s: %s",
                    self.table_name,
                    e.response["Error"]["Code"],
                    e.response["Error"]["Message"],
                )
                raise
        return exists
            

    def create_table(self, table_properties):
        response = None
        table_name = table_properties['table_name']
        table_schema = table_properties['table_schema']
        attribute_definitions = table_properties['attribute_definitions']
        
        # Check if table exists before creating
        table_exists = self.check_table_exists()        
            
        if table_exists:
            log_info(f"Table '{table_name}' already exists. Skipping creation.")
        else:
                
            try:
                log_info(f"Creating table '{table_name}'...")
                response = self.dynamodb_resource.create_table(
                    TableName=table_name,
                    KeySchema=table_schema,
                    AttributeDefinitions=attribute_definitions,
                    ProvisionedThroughput={
                        'ReadCapacityUnits': 5,
                        'WriteCapacityUnits': 5
                    }
                )
                response.wait_until_exists()
                log_info(f"Create '{table_name}' Table ...COMPLETE!")
                
            except ClientError as e:
                log_error(
                    "Error creating table %s. Reason: %s: %s",
                    self.table_name,
                    e.response["Error"]["Code"],
                    e.response["Error"]["Message"],
                )
                raise

        return response


    def delete_table(self):
        response = None
        try:
            log_info(f"Deleting table '{self.table_name}'...")
            response = self.table.delete()
            if response['ResponseMetadata']['HTTPStatusCode'] == 200:
                log_info(f"Delete '{self.table_name}' Table ...COMPLETE!")
            return response  
        
        except ClientError as e:
            error_code = e.response['Error']['Code']
            if error_code == 'ResourceNotFoundException':
                log_info(f"Table '{self.table_name}' does not exist. Skipping deletion.")
            else:
                log_error(f"Error deleting table '{self.table_name}': {e}")

        return response


    def put_item(self, item):
        response = None       
        try:
            response = self.table.put_item(Item=item)
            if response['ResponseMetadata']['HTTPStatusCode'] == 200:
                log_info("Item added successfully!")
            return response  

        except ClientError as error:
            error_code = error.response['Error']['Code']
            if error_code == 'ConditionalCheckFailedException':
                # Handle conditional check failure (e.g., attempt to insert duplicate item with unique key)
                log_error(f"Conditional check failed for item: {item}")
            elif error_code == 'ProvisionedThroughputExceededException':
                # Handle exceeding provisioned throughput capacity
                log_error(f"Throughput capacity exceeded for put operation.")
            elif error_code == 'ThrottlingException':
                # Handle throttling exception (e.g., too many requests in a short period)
                log_error(f"Throttling exception occurred. Retrying...")
            else:
                # Handle other unexpected ClientErrors
                log_error(f"Unexpected client error: {error}")


    def query_items(self, **arguments):
        response = None       
        try:
            response = self.table.query(**arguments)
            return response.get('Items', []) 
        except ClientError as e:
            print(e)
            exit()
            return []


    def get_item(self, key_expression):
        response = None
        try:
            response = self.table.get_item(Key=key_expression)
            return response.get('Item')  
        except ClientError as e:
            # Implement appropriate logging or error handling here
            return response


    def scan_items(self, **kwargs):
        response = None
        try:
            response = self.table.scan(**kwargs)
            return response.get('Items', [])
        except ClientError as e:
            # Implement appropriate logging or error handling here
            return response

        
    def update_item(self, key, update_expression, **kwargs):
        response = None       
        try:
            response = self.table.update_item(Key=key, UpdateExpression=update_expression, **kwargs)
        except ClientError as e:
            # Implement appropriate logging or error handling here
            pass


    def delete_item(self, key):
        response = None 
        try:
            response = self.table.delete_item(Key=key)  
        except ClientError as e:
            # Implement appropriate logging or error handling here
            pass
