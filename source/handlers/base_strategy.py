# strategies/base_strategy.py
from abc import ABC, abstractmethod
from sys import modules
from source.handlers.shared_handler import SharedHandler

class BaseStrategy(ABC, SharedHandler):
    def __init__(self, connection, modules):
        self.connection = connection
        self.modules = modules
        
    @abstractmethod
    def initialize_strategy(self, configuration):
        raise NotImplementedError("Subclasses must implement this method")
    
    @abstractmethod
    def execute_strategy(self, virtual_parameters, market_parameters, strategy_parameters, common_parameters):
        raise NotImplementedError("Subclasses must implement this method")
    
    @abstractmethod
    def evaluate_primary_conditions(self, candlestick_data, indicator_data):
        raise NotImplementedError("Subclasses must implement this method")

    @abstractmethod
    def publish_message(self, message):
        raise NotImplementedError("Subclasses must implement this method")
    
    @abstractmethod
    def calculate_indicators(self, default_candles):
        raise NotImplementedError("Subclasses must implement this method")        
    
    @abstractmethod
    def get_candlestick_data(self):
        raise NotImplementedError("Subclasses must implement this method")        
        