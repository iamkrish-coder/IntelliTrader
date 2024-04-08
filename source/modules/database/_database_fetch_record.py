# database_fetch_record.py

from boto3.resources.model import DefinitionWithParams
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.modules.database.comparison_operator import ComparisonOperators

from boto3.exceptions import botocore
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr
import boto3

class DatabaseFetchRecord:
    def __init__(self, table_configuration, table_name, table_data, custom_method=None, filters=None, operators=None):
        
        self.table_configuration                   = table_configuration
        self.table_name                            = table_name
        self.dynamodb_resource                     = boto3.resource('dynamodb', region_name=REGION_NAME)
        self.dynamodb_table                        = self.dynamodb_resource.Table(self.table_name)
        self.table_data                            = table_data
        self.custom_method                         = custom_method
        self.filters                               = filters
        self.operators                             = operators   
        self.comparison_operators                  = { "eq": Attr.eq, "gt": Attr.gt, "lt": Attr.lt, "gte": Attr.gte, "lte": Attr.lte,
                                            "between": Attr.between }
        
    def initialize(self, event):
        match event:
            case "get":
                return self.get_record()
             
            case "query":                   
                return self.query_records()
            
            case "scan":                   
                return self.scan_records()
            
            case _:
                log_error(f"Invalid event type: {event}, Error fetching record!")


    def get_record(self):
        """
        Fetch a single record from DynamoDB table.
        """
        
        response = None
        key = self.table_data["hash_key"]  
        try:          
            response = self.dynamodb_table.get_item(Key=key)
            
            if response['ResponseMetadata']['HTTPStatusCode'] == 200:

                if 'Item' not in response or not response['Item']:
                    log_info(f"Record with key {key} not found in table {self.table_name}. Table might be empty.")
                else:
                    log_info(f"Record fetched successfully: {response}")                        
                    return response["Item"]
            
        except ClientError as e:
            if e.response['Error']['Code'] == 'ValidationException':
                log_info(f"Record with key {key} not found in table {self.table_name}")
            else:
                log_error(f"Error fetching record {key} from table {self.table_name}. Here's why: {e.response["Error"]["Code"]}: {e.response["Error"]["Message"]}")
                raise
        
        return response


    def scan_records(self):
        """
        Fetch all records from DynamoDB table.
        """

        response = None
        try:
            response = self.dynamodb_table.scan()

            if response['ResponseMetadata']['HTTPStatusCode'] == 200:
                if 'Items' not in response or not response['Items']:
                    log_info(f"Records not found in table {self.table_name}. Table might be empty.")
                else:
                    log_info(f"Record fetched successfully: {response}")                        
                    return response["Items"]

        except ClientError as e:
            log_error(f"Error fetching records from table {self.table_name}. Here's why: {e.response['Error']['Code']}: {e.response['Error']['Message']}")
            raise

        return response     


    def query_records(self):

        response = None
        if not self.custom_method:
            raise ValueError("Missing custom_method for custom query")
        
        arguments = getattr(self, self.custom_method)(self.filters, self.operators)
        try:
            response = self.dynamodb_table.query(**arguments)

            if response['ResponseMetadata']['HTTPStatusCode'] == 200:

                if 'Items' not in response or not response['Items']:
                    log_info(f"Record not found in table {self.table_name}. Table might be empty.")
                    return None
                else:
                    log_info(f"Record fetched successfully: {response}")                        
                    return response["Items"]

        except ClientError as e:
            log_error(f"Error fetching record from table {self.table_name}. Here's why: {e.response["Error"]["Code"]}: {e.response["Error"]["Message"]}")
            raise
        
        return response


    def custom_query_1(self, filters, operators):
        
        if "hash_key" in self.table_data:
            hash_key_name       = self.table_data["hash_object"].get("name")
            hash_key_value      = self.table_data["hash_object"].get("value")
            hash_key_comparison = self.operators["hash_keys"]

            # Check if the comparison operator exists
            if hash_key_comparison not in self.comparison_operators:
                raise ValueError(f"Invalid comparison operator: {hash_key_comparison}")

            condition_object = self.comparison_operators[hash_key_comparison](hash_key_name, hash_key_value)
            hash_key_condition = f"{hash_key_name} {condition_object.expression_operator} :{hash_key_name}"

            query_args = {
                'KeyConditionExpression': hash_key_condition,
                'ExpressionAttributeValues': { f":{hash_key_name}": hash_key_value }
            }
            
        
        if "sort_key" in self.table_data and self.table_data["sort_object"] is not None:
            sort_key_name       = self.table_data["sort_object"].get("name")
            sort_key_value      = self.table_data["sort_object"].get("value")
            sort_key_comparison = self.operators["sort_keys"]

            # Check if the comparison operator exists
            if sort_key_comparison not in self.comparison_operators:
                raise ValueError(f"Invalid comparison operator: {sort_key_comparison}")
            else:
                # Use the Attr method corresponding to the comparison operator
                sort_condition = self.comparison_operators[sort_key_comparison](sort_key_name, sort_key_value)

                # Build sort key condition expression
                sort_key_condition = f" AND {sort_condition}"
                query_args['KeyConditionExpression'] += sort_key_condition

                # Add sort key value to ExpressionAttributeValues
                query_args['ExpressionAttributeValues'].update({f":{sort_key_name}": sort_key_value})

           
        filter_expression = ""
        expression_attribute_values = {}

        if filters:
            count = 0
            for attribute_key, condition in filters.items():
                count += 1

                # Access the actual value using the value() method of the attribute object
                attribute_value = condition._values[1]

                # Build filter expression with placeholder for value
                filter_expression += f"{attribute_key} {condition.expression_operator} :{attribute_key}"
                expression_attribute_values[f":{attribute_key}"] = attribute_value

                # Add AND separator conditionally within the loop (after each condition except the last)
                filter_expression += (" AND " if count < len(filters) else "")
            
        query_args["FilterExpression"] = filter_expression
        query_args["ExpressionAttributeValues"].update(expression_attribute_values)

        return query_args

    
    def custom_query_2(self):
        condition_expression = None
        filter_expression = None
        return condition_expression, filter_expression
