# source/controllers/BaseController.py

from source.controllers.strategy_controller import StrategyController
from source.controllers.action_controller import ActionController
from source.controllers.database_controller import DatabaseController

class BaseController:
    def __init__(self, connection, modules, configuration):
        self.connection = connection
        self.modules = modules
        self.configuration = configuration
        self.database = DatabaseController(self.connection, self.modules, self.configuration)
        
        self.controllers = {
            "database": self.database,
            "strategy": StrategyController(self.connection, self.modules, self.configuration, self.database),
            "action": ActionController(self.connection, self.modules, self.configuration, self.database),
        }

    def get_controller(self, controller_name):
        return self.controllers.get(controller_name)

    def get_all_controllers(self):
        return self.controllers  


