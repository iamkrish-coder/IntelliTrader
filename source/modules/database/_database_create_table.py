# database_create_table.py

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.modules.database.comparison_operator import ComparisonOperators
from source.aws.DynamoDB.aws_dynamodb import AWSDynamoDB
from botocore.client import ClientError

import json

class DatabaseCreateTable:
    def __init__(self, table_configuration):
        self.table_configuration = table_configuration

    def initialize(self):
        return self.create_tables()

    def create_tables(self):
        
        tables_list = self.table_configuration

        table_properties = {}
        for table_name, table_config in tables_list.items():
            table_properties[table_name] = self.build_table_definition(table_config)

        dynamodb_resource = AWSDynamoDB()
        for table_name, properties in table_properties.items():
            try:
                dynamodb_resource.create_table(properties)
            except ClientError as e:
                log_error(f"Error creating table '{table_name}': {e}")
                
    def build_table_definition(self, table_config):

        table_key_name = table_config['table_key']
        hash_key_name = table_config['hash_key']
        sort_key_name = table_config.get('sort_key') 

        table_definition = {
            'table_name': table_key_name,
            'table_schema': [
                {
                    'AttributeName': hash_key_name,
                    'KeyType': 'HASH'
                },
                # Only include sort key definition if sort_key_name is not empty
                *([
                    {
                        'AttributeName': sort_key_name,
                        'KeyType': 'RANGE'
                    }
                ] if sort_key_name else [])
            ],
            'attribute_definitions': [
                {
                    'AttributeName': hash_key_name,
                    'AttributeType': 'S'
                },
                # Only include sort key attribute definition if sort_key_name is not empty
                *([
                    {
                        'AttributeName': sort_key_name,
                        'AttributeType': 'S'
                    }
                ] if sort_key_name else [])
            ]
        }

        return table_definition
