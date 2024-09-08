from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *

import logging


class CancelOrder:
    def __init__(self, variety, order_id):
        self.variety = variety
        self.order_id = order_id

    def initialize(self):
        self.cancel_order()

    def cancel_order(self):
        try:
            self.prop.kite.cancel_order(variety=self.variety, order_id=self.order_id)
            logging.info(f"Order {self.order_id} has been cancelled successfully.")
        except Exception as e:
            logging.error(f"Error cancelling order {self.order_id}: {e}")
