# IntelliTrader\source\modules\action\BaseAction.py

from abc import ABC, abstractmethod
from ..shared.shared_functions import SharedFunctions
from sys import modules


class BaseAction(ABC, SharedFunctions):
    def __init__(self, connection, modules):
        super().__init__(connection, modules)
        self.connection = connection
        self.modules = modules

    @abstractmethod
    def initialize(self):
        raise NotImplementedError("Subclasses must implement this method")
