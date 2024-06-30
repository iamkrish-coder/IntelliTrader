# database_fetch_record.py

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


class DatabaseFetchRecord:
    def __init__(self, event, table, config, data):
        self.event = event
        self.table = table
        self.config = config
        self.data = data

    def initialize(self):
        match self.event:
            case "query":
                return self.query_records()

            case "scan":
                return self.scan_records()

            case _:
                log_error(f"Invalid event type: {self.event}, Error fetching record!")

    def scan_records(self):

        table = self.table
        data = self.data
        projection = data.get("projection")
        filters = data.get("filters")

        object_dynamodb = DynamoDB(table=table, projection=projection, filters=filters)
        return object_dynamodb.scan()

    def query_records(self):

        table = self.table
        data = self.data
        attribute_data = data.get("attributes")
        attributes = attribute_data.get("row_data")
        partition = attribute_data.get("partition_object")
        sort = attribute_data.get("sort_object")
        projection = data.get("projection")
        filters = data.get("filters")

        object_dynamodb = DynamoDB(table=table, attribute_data=attributes, partition_key=partition, sort_key=sort,
                                   projection=projection, filters=filters)
        return object_dynamodb.query()
