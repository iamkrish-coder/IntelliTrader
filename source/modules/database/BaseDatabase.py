# strategies/base_actions.py
from abc import ABC, abstractmethod
from sys import modules

class BaseDatabase(ABC):
    def __init__(self, connection, modules):
        self.connection = connection
        self.modules = modules
        self.table_name = None
        self.region_name = None
        self.dynamodb_client = None # DynamoDBClient(self.table_name, self.region_name)

    @abstractmethod
    def initialize(self):        
        raise NotImplementedError("Subclasses must implement this method")
