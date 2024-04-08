# database_create_table.py

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from boto3.exceptions import botocore
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr
import boto3

class DatabaseCreateTable:
    def __init__(self, table_name, table_configuration):
        self.table_name          = table_name
        self.table_configuration = table_configuration
        self.dynamodb_resource   = boto3.resource('dynamodb', region_name=REGION_NAME)
        self.dynamodb_table      = self.dynamodb_resource.Table(self.table_name)

    def initialize(self):
        return self.create_tables()

    def create_tables(self):

        """ Check If Table Exists """
        table_exists = self.check_table_exists()  

        if not table_exists:

            table_properties = {}
            table_properties = self.build_table_definition()
            
            try:
                log_info(f"Creating table '{self.table_name}'...")
                response                  = self.dynamodb_resource.create_table(
                    TableName             = self.table_name,
                    KeySchema             = table_properties['table_schema'],
                    AttributeDefinitions  = table_properties['attribute_definitions'],
                    ProvisionedThroughput = {
                    'ReadCapacityUnits': 5,
                    'WriteCapacityUnits': 5
                    }
                )
                response.wait_until_exists()
                log_info(f"Create '{self.table_name}' Table ...COMPLETE!")
                
            except ClientError as e:
                log_error(f"Error creating table {self.table_name}. Here's why: {e.response["Error"]["Code"]}: {e.response["Error"]["Message"]}")
                raise

        else:
            log_info(f"Table '{self.table_name}' already exists.")
                                

    def build_table_definition(self):
        
        table_config = self.table_configuration
        table_key_name = table_config['table_key']
        partition_key_name  = table_config['partition_key']
        sort_key_name  = table_config['sort_key'] 

        table_definition = {
            'table_name': table_key_name,
            'table_schema': [
                {
                    'AttributeName': partition_key_name,
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
                    'AttributeName': partition_key_name,
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

    def check_table_exists(self):
        try:
            self.dynamodb_table.load()
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