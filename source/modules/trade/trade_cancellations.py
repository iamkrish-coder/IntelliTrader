# TradeCancellations

from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *
from .BaseTrade import BaseTrade


class TradeCancellations(BaseTrade):
    def __init__(self, modules, parameters, database):
        self.modules = modules
        self.parameters = parameters
        self.database = database

    def initialize(self):
        return self.cancel_aging_trades()

    def cancel_aging_trades(self):
        """ Get Aging Trades """
        # Logic to retrieve active yet to execute orders older than a certain time threshold

        # Get open or pending trades

        # Check trade validity and variety

        # Cancel the trades

        # Update Trades Table with Cancelled status

        pass
