# IntelliTrader\source\modules\strategy\BaseStrategy.py

from abc import ABC, abstractmethod
from source.modules.shared.shared_handler import SharedHandler
from sys import modules

class BaseStrategy(ABC, SharedHandler):
    def __init__(self, connection, modules):
        self.connection = connection
        self.modules = modules
        
    @abstractmethod
    def initialize(self):        
        raise NotImplementedError("Subclasses must implement this method")
    