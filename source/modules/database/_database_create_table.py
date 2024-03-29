# database_create_table.py

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.modules.database.comparison_operator import ComparisonOperators

from boto3.exceptions import botocore
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr
import boto3

class DatabaseCreateTable:
    def __init__(self, table_configuration):
        self.table_configuration = table_configuration
        self.dynamodb_resource = boto3.resource('dynamodb', region_name=REGION_NAME)
        
    def initialize(self):
        return self.create_tables()


    def create_tables(self):
        
        tables_list = self.table_configuration
        table_properties = {}
        for table_name, table_config in tables_list.items():
            table_properties[table_name] = self.build_table_definition(table_config)

        for table_name, properties in table_properties.items():
            table_exists = self.check_table_exists(table_name)  

            if not table_exists:
                try:
                    log_info(f"Creating table '{table_name}'...")
                    response = self.dynamodb_resource.create_table(
                        TableName=table_name,
                        KeySchema=properties['table_schema'],
                        AttributeDefinitions=properties['attribute_definitions'],
                        ProvisionedThroughput={
                        'ReadCapacityUnits': 5,
                        'WriteCapacityUnits': 5
                        }
                    )
                    response.wait_until_exists()
                    log_info(f"Create '{table_name}' Table ...COMPLETE!")
                except ClientError as e:
                    log_error(
                        "Error creating table %s. Here's why: %s: %s",
                        table_name,
                        e.response["Error"]["Code"],
                        e.response["Error"]["Message"]
                    )
                    raise
            else:
                log_info(f"Table '{table_name}' already exists.")
                                

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



    def check_table_exists(self, table_name):
        try:
            self.dynamodb_resource.Table(table_name).load()
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