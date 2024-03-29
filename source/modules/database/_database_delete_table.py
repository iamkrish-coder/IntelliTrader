# database_delete_table.py

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.modules.database.comparison_operator import ComparisonOperators
from source.aws.DynamoDB.aws_dynamodb import AWSDynamoDB
from botocore.client import ClientError

class DatabaseDeleteTable:
    def __init__(self, configuration, table_name):
        self.configuration = configuration
        self.table_name = table_name 
        
    def initialize(self):
        return self.delete_table()
    
    def delete_table(self):      
        # Delete a Table
        if self.table_name is None:
            return False
        
        dynamodb_resource = AWSDynamoDB(self.table_name)
        dynamodb_resource.delete_table()
        