# database_create_table.py

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.aws.DynamoDB.aws_dynamodb import AWSDynamoDB
from botocore.client import ClientError

class DatabaseCreateTable:
    def __init__(self, configuration):
        self.configuration = configuration

    def initialize(self):
        return self.create_tables()
    
    def create_tables(self):
        # Create Required Tables
        tables_list = {
            'table_1': 'Topics'
        }

        table_properties = {}
        for table_name, display_name in tables_list.items():
            table_properties[table_name] = self.build_table_definition(display_name)  

        dynamodb_client = AWSDynamoDB()
        for table_name, properties in table_properties.items():
            try:
                dynamodb_client.create_table(properties)
            except ClientError as e:
                log_error(f"Error creating table '{table_name}': {e}")
                

    def build_table_definition(self, table_name):
        """
        Defines the table structure for either Topics or Alerts table.

        Args:
            table_name (str): The name of the table to be created ("Topics" or "Alerts").

        Returns:
            dict: A dictionary containing the table properties for creating the table.
        """

        table_properties = {
            'table_name': table_name
        }

        ######################################
        # Define table properties for topics #
        ######################################

        if table_name == "Topics":

            table_properties['table_schema'] = [
                {
                    'AttributeName': 'topic_arn',
                    'KeyType': 'HASH'  
                },
                {
                    'AttributeName': 'created_date',
                    'KeyType': 'RANGE' 
                }
            ]
            table_properties['attribute_definitions'] = [
                {
                    'AttributeName': 'topic_arn',
                    'AttributeType': 'S'  
                },
                {
                    'AttributeName': 'created_date',
                    'AttributeType': 'S'  
                }
            ]

        return table_properties
