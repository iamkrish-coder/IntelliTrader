from ..helper.helper_module import Helper
from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *

from .create_market_order import CreateMarketOrder
from .create_limit_order import CreateLimitOrder
# from .create_sl_order import CreateSLOrder
# from .create_slm_order import CreateSLMOrder
# from .create_gtt_order import CreateGTTOrder
# from .modify_order import ModifyOrder
# from .cancel_order import CancelOrder

class Orders:
    def __init__(self, params):
        self.prop = params

    def initialize(self, type_of_order, order_parameters):
        return self.manage_orders(type_of_order, order_parameters, self.prop)

    def manage_orders(self, type_of_order, order_parameters, kite_object):
        if type_of_order == Order_Type.MARKET.value:
            order_object =  CreateMarketOrder(order_parameters, kite_object)
        elif type_of_order == Order_Type.LIMIT.value:
            order_object =  CreateLimitOrder(order_parameters, kite_object)
        # elif type_of_order == Order_Type.SL.value:
        #     return self.create_sl_order(order_parameters)
        # elif type_of_order == Order_Type.SL_M.value:
        #     return self.create_slm_order(order_parameters)
        # elif type_of_order == Order_Type.GTT.value:
        #     return self.create_gtt_order(order_parameters)
        else:
            log_error("Invalid order type")
            return None

        if order_object:
            return order_object.initialize()

    # Place a stop loss order for a stock with given quantity
    def create_sl_order(self):
        pass

    # Place a stop loss market order for a stock with given quantity
    def create_slm_order(self):
        pass

    # Place a gtt limit order for a stock with given order details
    def create_gtt_order(self, gtt_type, symbol, exchange, trigger_values, last_price, order_list):
        # Place single-leg gtt order
        if gtt_type == 'single':
            gtt_trigger_type = 'GTT_TYPE_SINGLE'
            try:
                single_gtt = self.prop['kite'].place_gtt(
                    trigger_type=gtt_trigger_type,
                    tradingsymbol=symbol,
                    exchange=exchange,
                    trigger_values=trigger_values,
                    last_price=last_price,
                    orders=order_list)
                log_info(f"Single leg gtt order trigger_id: {single_gtt['trigger_id']}")
            except Exception as error:
                log_error(f"Error placing single leg gtt order: {error}")

        # Place two-leg(OCO) gtt order
        elif gtt_type == 'oco':
            gtt_trigger_type = 'GTT_TYPE_OCO'
            try:
                gtt_oco = self.prop['kite'].place_gtt(
                    trigger_type=gtt_trigger_type,
                    tradingsymbol=symbol,
                    exchange=exchange,
                    trigger_values=trigger_values,
                    last_price=last_price,
                    orders=order_list)
                log_info(f"GTT OCO trigger_id: {gtt_oco['trigger_id']}")
            except Exception as error:
                log_info(f"Error placing gtt oco order: {error}")

        else:
            log_warn("Error placing gtt order, gtt type is not defined")
