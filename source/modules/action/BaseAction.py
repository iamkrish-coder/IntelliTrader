# strategies/base_actions.py
from abc import ABC, abstractmethod
from sys import modules
from source.modules.shared.shared_handler import SharedHandler

class BaseAction(ABC, SharedHandler):
    def __init__(self, connection, modules):
        self.connection = connection
        self.modules = modules

    @abstractmethod
    def initialize(self):        
        raise NotImplementedError("Subclasses must implement this method")
