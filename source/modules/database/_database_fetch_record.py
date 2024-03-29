# database_fetch_record.py

from boto3.resources.model import DefinitionWithParams
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.modules.database.comparison_operator import ComparisonOperators
from source.aws.DynamoDB.aws_dynamodb import AWSDynamoDB
from botocore.client import ClientError


class DatabaseFetchRecord:
    def __init__(self, table_configuration, table_name, table_data, custom_method=None, filters=None):
        
        self.table_configuration      = table_configuration
        self.table_name               = table_name
        self.table_data               = table_data
        self.custom_method            = custom_method
        self.filters                  = filters

    def initialize(self, event):
        match event:
            case "get":
                return self.get_record()
             
            case "query":                   
                return self.query_records()
             
            case _:
                log_error(f"Invalid event type: {event}, Error fetching record!")
        

    def get_record(self):
        key_expression = self.table_data["hash_key"]        

        dynamodb_resource = AWSDynamoDB(self.table_name)
        try:
            response = dynamodb_resource.get_item(key_expression)
            log_info(f"Record fetched successfully: {response}")
            return response
        except ClientError as error:
            log_error(f"Error fetching record: {error}")
            

    def query_records(self):
        
        if not self.custom_method:
            raise ValueError("Missing custom_method for custom query")
        
        arguments = getattr(self, self.custom_method)(self.filters)

        dynamodb_resource = AWSDynamoDB(self.table_name)
        try:
            response = dynamodb_resource.query_items()
            log_info(f"Records fetched successfully: {response}")
            return response
        except ClientError as error:
            log_error(f"Error fetching records: {error}")
            return []  # Return an empty list on error
        

    def custom_query_1(self, filters):
        if "hash_key" in self.table_data:
            hash_key_name = self.table_data["hash_object"].get("name")
            hash_key_value = self.table_data["hash_object"].get("value")
            
            query_args = {
                'KeyConditionExpression': f"{hash_key_name} = :hk",
                'ExpressionAttributeValues': {
                    ':hk': hash_key_value
                    }
            }
    

        if "sort_key" in self.table_data and self.table_data["sort_object"] is not None:
            sort_key_name = self.table_data["sort_object"].get("name")
            sort_key_value = self.table_data["sort_object"].get("value")

            # Build sort key condition expression (if sort key exists)
            sort_key_condition = f" AND {sort_key_name} = :sk"
            query_args['KeyConditionExpression'] += sort_key_condition

            # Add sort key value to ExpressionAttributeValues
            query_args['ExpressionAttributeValues'][':sk'] = sort_key_value


        if filters:
            filter_expression_list = []
            expression_attribute_values = {}  # Initialize for filter values

            for filter_key, filter_value in filters.items():
                # Add placeholder for filter value
                placeholder = f":f{len(expression_attribute_values)}"
                expression_attribute_values[placeholder] = filter_value

                # Build filter expression with placeholder
                filter_expression_list.append(f"{filter_key} = {placeholder}")

            # Combine filter expressions
            if filter_expression_list:
                filter_expression = " AND ".join(filter_expression_list)
                query_args['FilterExpression'] = filter_expression
                query_args['ExpressionAttributeValues'].update(expression_attribute_values)

        return query_args

  

    def custom_query_2(self):
        condition_expression = None
        filter_expression = None
        return condition_expression, filter_expression
