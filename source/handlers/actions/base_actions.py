# strategies/base_actions.py
from abc import ABC, abstractmethod
from sys import modules
from source.handlers.shared.shared_handler import SharedHandler

class BaseActions(ABC, SharedHandler):
    def __init__(self, connection, modules):
        self.connection = connection
        self.modules = modules

    @abstractmethod   
    def execute_actions(self, configuration):
        raise NotImplementedError("Subclasses must implement this method")       
        
    @abstractmethod
    def subscribe_message(self, message):
        raise NotImplementedError("Subclasses must implement this method")

    @abstractmethod
    def process_stock_alerts(self, alert):
        raise NotImplementedError("Subclasses must implement this method")
    
    @abstractmethod
    def get_candlestick_data(self, exchange, symbol, token):
        raise NotImplementedError("Subclasses must implement this method")       
    
    @abstractmethod
    def evaluate_secondary_conditions(self, exchange, symbol, token):
        raise NotImplementedError("Subclasses must implement this method") 

         