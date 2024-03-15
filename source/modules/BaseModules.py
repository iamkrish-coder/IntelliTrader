# source/modules/BaseModules.py

from sys import modules

from source.modules.helper.helper_module import Helper
from source.modules.fetch.fetch_module import Fetch
from source.modules.orders.orders_module import Orders
from source.modules.streaming.streaming_module import Ticker
from source.modules.indicators.indicators_module import Indicator


class BaseModules:
    def __init__(self, connection):
        self.connection = connection
        self.modules = {}
        self.modules['help'] = Helper(self.connection)
        self.modules['fetch'] = Fetch(self.connection)
        self.modules['orders'] = Orders(self.connection)
        self.modules['ticker'] = Ticker(self.connection)
        self.modules['indicator'] = Indicator(self.connection)

    def get_module(self, module_name):
        """
        Retrieves a specific module by its name.

        Args:
            module_name (str): The name of the module to retrieve.

        Returns:
            object: The requested module instance, or None if not found.
        """
        return self.modules.get(module_name)

    def get_all_modules(self):
        """
        Retrieves all modules.

        Returns:
            dict: A dictionary containing all module instances.
        """
        return self.modules


# Example usage
# base_modules = BaseModules(connection)

# help_module = base_modules.get_module('help')
# fetch_module = base_modules.get_module('fetch')

# # Use the module methods
# help_module.show_help()
# data = fetch_module.get_market_data('EURUSD')
