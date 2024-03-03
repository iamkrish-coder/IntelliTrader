# strategies/base_strategy.py
from abc import ABC, abstractmethod
from sys import modules
from source.strategies.shared import Shared

class BaseStrategy(ABC, Shared):
    def __init__(self, connection, modules):
        self.connection = connection
        self.modules = modules
        
    @abstractmethod
    def execute_live_strategy(self, live_parameters, market_parameters, strategy_parameters, common_parameters):
        raise NotImplementedError("Subclasses must implement this method")

    @abstractmethod
    def execute_virtual_strategy(self, virtual_parameters, market_parameters, strategy_parameters, common_parameters):
        raise NotImplementedError("Subclasses must implement this method")
    
    @abstractmethod
    def evaluate_primary_strategy_conditions(self, ohlcv_data, indicator_data):
        raise NotImplementedError("Subclasses must implement this method")

    @abstractmethod
    def publish_message(self, message):
        raise NotImplementedError("Subclasses must implement this method")