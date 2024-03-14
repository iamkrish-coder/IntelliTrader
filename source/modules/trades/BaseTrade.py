from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *

class Trade:
    def __init__(self, modules, transaction_type, order_type):
        self.modules          = modules
        self.transaction_type = transaction_type
        self.order_type       = order_type

    def execute_trade(self):
        if self.transaction_type == Transaction_Type.BUY.value:
            return self.buy()
        elif self.transaction_type == Transaction_Type.SELL.value:
            return self.sell()
        else:
            log_error("Error: Invalid transaction type")

    def create_trade_order(self, order_params):
        if all(param is not None for param in order_params):
            if self.order_type in [Order_Type.MARKET.value, Order_Type.LIMIT.value, Order_Type.SL.value, Order_Type.SL_M.value, Order_Type.GTT.value]:
                # Handle various order types
                self.modules['orders'].initialize_order(self.order_type, order_params)
                return True
            else:
                # Handle invalid order type
                log_error("Error: Invalid order type")
                return False
        else:
            # Handle missing common parameters
            print("Some required parameters for the order are missing. Order Placement Failed!")
            return False
        
    def buy(self):
        raise NotImplementedError("Subclasses must implement buy()")

    def sell(self):
        raise NotImplementedError("Subclasses must implement sell()")