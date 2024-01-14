# strategies/base_strategy.py
from abc import ABC, abstractmethod

class BaseStrategy(ABC):
    def __init__(self, connection):
        self.connection = connection

    @abstractmethod
    def execute_strategy(self):
        raise NotImplementedError("Subclasses must implement this method")

