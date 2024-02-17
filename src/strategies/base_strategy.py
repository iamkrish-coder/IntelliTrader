# strategies/base_strategy.py
from abc import ABC, abstractmethod
from sys import modules
from src.strategies.shared import Shared

class BaseStrategy(ABC, Shared):
    def __init__(self, connection, modules):
        self.connection = connection
        self.modules = modules
        
    @abstractmethod
    def execute_live_strategy(self, virtual_parameters):
        raise NotImplementedError("Subclasses must implement this method")

    @abstractmethod
    def execute_virtual_strategy(self, virtual_parameters):
        raise NotImplementedError("Subclasses must implement this method")
    
    @abstractmethod
    def evaluate_strategy_conditions(ohlcv_data, indicator_data):
        raise NotImplementedError("Subclasses must implement this method")