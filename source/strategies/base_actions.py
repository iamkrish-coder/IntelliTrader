# strategies/base_actions.py
from abc import ABC, abstractmethod
from sys import modules
from source.strategies.shared import Shared

class BaseActions(ABC, Shared):
    def __init__(self, connection, modules):
        self.connection = connection
        self.modules = modules
        
    @abstractmethod
    def subscribe_message(self, message):
        raise NotImplementedError("Subclasses must implement this method")

    @abstractmethod
    def process_stock_alerts(self, alert):
        raise NotImplementedError("Subclasses must implement this method")
    
    @abstractmethod
    def get_candlestick_data_sync(self, exchange, symbol, token):
        raise NotImplementedError("Subclasses must implement this method")       
    
    @abstractmethod
    def evaluate_secondary_strategy_conditions(self, exchange, symbol, token):
        raise NotImplementedError("Subclasses must implement this method") 

         