# strategies/base_actions.py
from abc import ABC, abstractmethod
from sys import modules
from source.strategies.shared import Shared

class BaseActions(ABC, Shared):
    def __init__(self, connection, modules):
        self.connection = connection
        self.modules = modules
        
    @abstractmethod
    def subscribe_to_queues(self):
        raise NotImplementedError("Subclasses must implement this method")

    @abstractmethod
    def queue_listener(self, queue, subscriber):
        raise NotImplementedError("Subclasses must implement this method")
    
    @abstractmethod
    def callback_processor(self, queue, alert):
        raise NotImplementedError("Subclasses must implement this method")

    @abstractmethod
    def process_stock_alerts(self, queue, alert):
        raise NotImplementedError("Subclasses must implement this method")
    
    @abstractmethod
    def get_candlestick_data_sync(self, exchange, symbol, token):
        raise NotImplementedError("Subclasses must implement this method")        