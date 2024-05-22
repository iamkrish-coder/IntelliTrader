# database_create_table.py

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.aws.DynamoDB.aws_dynamodb import DynamoDB

"""" Decorators """
def restricted_access(allowed_activities):
    def decorator(func):
        def wrapper(self, *args, **kwargs):
            if self.activity in allowed_activities:
                return func(self, *args, **kwargs)
            else:
                return {} 
        return wrapper
    return decorator

class DatabaseInsertRecord:
    def __init__(self, event, table, config, data):
        self.event = event
        self.table = table
        self.config = config
        self.data = data

    def initialize(self):
        match self.event:
            case "put":
                return self.put_record()
            case _:
                log_error(f"Invalid event type: {event}, Error inserting record!")
    
    def put_record(self):

        table = self.table
        data = self.data
        attribute_data = data.get("attributes")
        attributes = attribute_data.get("row_data")

        object_dynamodb = DynamoDB(table=table, attribute_data=attributes)
        return object_dynamodb.put()

        
