# database_create_table.py

from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *
from ...aws.DynamoDB.aws_dynamodb import DynamoDB

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


class DatabaseUpdateRecord:
    def __init__(self, event, table, config, data):
        self.event = event
        self.table = table
        self.config = config
        self.data = data

    def initialize(self):
        match self.event:
            case "update":
                return self.update_record()
            case _:
                log_error(f"Invalid event type: {self.event}, Error updating record!")

    def update_record(self):

        table = self.table
        data = self.data
        attribute_data = data.get("attributes")
        attributes = attribute_data.get("row_data")
        partition = attribute_data.get("partition_object")
        sort = attribute_data.get("sort_object")
        # Remove keys from update data
        _keys = [partition.get("key")]
        if sort:
            _keys.append(sort.get("key"))

        attributes = {k: v for k, v in attributes.items() if k not in _keys and v is not None}
        object_dynamodb = DynamoDB(table=table, attribute_data=attributes, partition_key=partition, sort_key=sort)
        return object_dynamodb.update()
