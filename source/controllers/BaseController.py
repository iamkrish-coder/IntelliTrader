# source/controllers/BaseController.py

class BaseController:
    def __init__(self, connection, modules, configuration, database):
        self.connection = connection
        self.modules = modules
        self.configuration = configuration
        self.database = database 
