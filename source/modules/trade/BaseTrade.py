# IntelliTrader\source\modules\trade\BaseTrade.py

from abc import ABC, abstractmethod
from ..shared.shared_functions import SharedFunctions
from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *


class BaseTrade(ABC, SharedFunctions):
    def __init__(self, modules, transaction_type, order_type):
        self.modules = modules
        self.transaction_type = transaction_type
        self.order_type = order_type

    def prepare_request_parameters(self, event, table, model, dataset, projection=[], filters={}):
        attributes = None
        config = self.database.table_configuration[table]
        if model:
            attributes = model(**dataset).convert_table_rows_to_dict(config)
        return {
            "event": event,
            "table": table,
            "config": config,
            "data": {
                "attributes": attributes,
                "projection": projection,
                "filters": filters,
            }
        }

    def database_request(self, request):
        log_info(f"Requesting AWS DynamoDB...")
        self.database.manage_table_records(request)
        return True

    def create_trade_order(self, order_params):
        if all(param is not None for param in order_params):
            if self.order_type in [Order_Type.MARKET.value, Order_Type.LIMIT.value, Order_Type.SL.value,
                                   Order_Type.SL_M.value, Order_Type.GTT.value]:
                # Handle various order types
                order_id = self.modules['orders'].initialize_order(self.order_type, order_params)
                return order_id
            else:
                # Handle invalid order type
                log_error("Error: Invalid order type")
                return False
        else:
            # Handle missing common parameters
            log_error("Some required parameters for the order are missing. Order Placement Failed!")
            return False

    def execute_trade(self):
        if self.transaction_type == Transaction_Type.BUY.value:
            return self.buy()
        elif self.transaction_type == Transaction_Type.SELL.value:
            return self.sell()
        else:
            log_error("Error: Invalid transaction type")

    def buy(self):
        raise NotImplementedError("Subclasses must implement buy()")

    def sell(self):
        raise NotImplementedError("Subclasses must implement sell()")
