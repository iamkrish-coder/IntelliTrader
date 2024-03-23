# source/aws/DynamoDB/aws_dynamodb.py

import boto3
from boto3.exceptions import botocore
from botocore.exceptions import ClientError
from source.utils.logging_utils import *
from source.constants.constants import REGION_NAME

class AWSDynamoDB:

    def __init__(self, table_name = None, region_name=REGION_NAME):
        self.table_name = table_name
        self.dynamodb_resource = boto3.resource('dynamodb', region_name=region_name)
        if self.table_name:
            self.table = self.dynamodb_resource.Table(self.table_name)

    def create_table(self, table_properties):
        """
        Generic Create Table function that takes in a dictionary of properties and creates a DynamoDB table.
        table_properties dictionary should have the following keys:
            - table_name: Name of the table to be created
            - table_schema: List of key-value pairs that define the table schema
            - attribute_definitions: List of key-value pairs that define the attribute definitions
        """
        response = None
        table_name = table_properties['table_name']
        table_schema = table_properties['table_schema']
        attribute_definitions = table_properties['attribute_definitions']
        
        # Check if table exists before creating
        try:
            table = self.dynamodb_resource.Table(table_name)
            table_id_exists = table.table_id
            log_info(f"Table '{table_name}' already exists. Skipping creation.")
        except botocore.exceptions.ClientError as e:
            error_code = e.response['Error']['Code']
            
            if error_code == 'ResourceNotFoundException':
                # Create table if it doesn't exist
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
            else:
                log_error(f"Error creating table '{self.table_name}': {e}")
                
        return response

    def delete_table(self):
        """
        Deletes a DynamoDB table.

        """
        response = None
        try:
            log_info(f"Deleting table '{self.table_name}'...")
            response = self.table.delete()
            log_info(f"Delete '{self.table_name}' Table ...COMPLETE!")
        except ClientError as e:
            error_code = e.response['Error']['Code']
            if error_code == 'ResourceNotFoundException':
                log_info(f"Table '{self.table_name}' does not exist. Skipping deletion.")
            else:
                log_error(f"Error deleting table '{self.table_name}': {e}")

        return response

    def get_item(self, key):
        response = None
        try:
            response = self.table.get_item(Key=key)
            return response.get('Item')  
        except ClientError as e:
            # Implement appropriate logging or error handling here
            return None

    def put_item(self, item):
        try:
            self.table.put_item(Item=item)  
        except ClientError as e:
            # Implement appropriate logging or error handling here
            pass

    def update_item(self, key, update_expression, **kwargs):
        try:
            self.table.update_item(Key=key, UpdateExpression=update_expression, **kwargs)
        except ClientError as e:
            # Implement appropriate logging or error handling here
            pass

    def delete_item(self, key):
        try:
            self.table.delete_item(Key=key)  
        except ClientError as e:
            # Implement appropriate logging or error handling here
            pass
