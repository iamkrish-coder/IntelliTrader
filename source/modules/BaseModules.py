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
        return self.modules.get(module_name)

    def get_all_modules(self):
        return self.modules

