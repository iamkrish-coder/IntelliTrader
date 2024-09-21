# IntelliTrader\backend\modules\database\BaseDatabase.py

from abc import ABC, abstractmethod
from backend.modules.shared.shared_functions import SharedFunctions
from sys import modules


class BaseDatabase(ABC, SharedFunctions):
    def __init__(self, connection, modules):
        super().__init__(connection, modules)
        self.connection = connection
        self.modules = modules

    @abstractmethod
    def initialize(self):
        raise NotImplementedError("Subclasses must implement this method")
