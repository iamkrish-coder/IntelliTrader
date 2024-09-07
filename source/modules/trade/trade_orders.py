# TradeOrders

from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *

from .BaseTrade import BaseTrade
from .trade_equity import EquityTrade
from .trade_option import OptionTrade
from .trade_futures import FuturesTrade
from ..orders.orders_module import Orders


class TradeOrders(BaseTrade):
    def __init__(self, modules, parameters, database, signals):
        self.modules = modules
        self.parameters = parameters
        self.database = database
        self.signals = signals # Only Signal ID is Received

    def initialize(self):
        return self.execute_trade_order()

    def prepare_order_placement(self):
        """ Prepare Order Pre-requisites and parameters """
        """"
        variety 	
            regular Regular order
            amo 	After Market Order
            co 	    Cover Order 
            iceberg Iceberg Order 
            auction Auction Order 
        order_type 	
            MARKET 	Market order
            LIMIT 	Limit order
            SL 	    Stoploss order 
            SL-M 	Stoploss-market order 
        product 	
            CNC 	Cash & Carry for equity 
            NRML 	Normal for futures and options 
            MIS 	Margin Intraday Squareoff for futures and options 
        validity 	
            DAY 	Regular order
            IOC 	Immediate or Cancel
            TTL 	Order validity in minutes
        """

        trade_order_parameters = []

        for signal in self.signals:

            order_params = {}
            id = signal['signal_id']
            strategy = signal['signal_strategy']
            token = signal['signal_token']
            strategy_type = int(self.parameters.get('strategy_params.strategy_type'))

            instrument = self.parameters.get('strategy_params.instrument')

            if instrument == Instrument_Type.EQUITY.value:
                trade_parameters = self.parameters.get('strategy_params.equity_trade_params')
            elif instrument == Instrument_Type.OPTIONS.value:
                trade_parameters = self.parameters.get('strategy_params.options_trade_params')
            elif instrument == Instrument_Type.FUTURES.value:
                trade_parameters = self.parameters.get('strategy_params.futures_trade_params')
            else:
                log_error("No instrument trade type defined in the configuration.")
                return False

            # Signal information
            exchange = int(signal['signal_exchange'])
            symbol = signal['signal_symbol']
            transaction_type = int(signal['signal_type'])

            # Caclulate Quantity
            max_quantity = int(trade_parameters.get('max_quantity'))
            position_size_type = int(trade_parameters.get('position_size_type'))
            max_allocation = float(trade_parameters.get('max_allocation'))
            max_risk = float(trade_parameters.get('max_risk'))
            quantity = self.set_quantity(exchange, symbol, max_quantity, position_size_type, max_allocation, max_risk)

            # Calculate Price for Limit/SL/SL-M/GTT
            price = 0
            trigger_price = 0
            order_type = int(trade_parameters.get('order_type'))
            default_price = int(trade_parameters.get('default_price'))
            limit_buffer = float(trade_parameters.get('buffer'))

            if order_type == Order_Type.LIMIT.value:
                price = self.set_limit_price(exchange, symbol, default_price, limit_buffer)

            if order_type == Order_Type.SL.value or order_type == Order_Type.SL_M.value:
                # TODO: Awaits Implementation
                trigger_price = self.set_trigger_price()

            if order_type == Order_Type.GTT.value:
                # TODO: Awaits Implementation
                pass

            # Others
            product = int(trade_parameters.get('product'))
            if not self.validate_product(instrument, product):
                return False

            validity = int(trade_parameters.get('validity'))
            validity_ttl = int(trade_parameters.get('validity_ttl'))
            variety = int(trade_parameters.get('variety'))
            iceberg_legs = int(trade_parameters.get('iceberg_legs'))
            iceberg_quantity = int(trade_parameters.get('iceberg_quantity'))
            disclosed_quantity = int(trade_parameters.get('disclosed_quantity'))
            tag = trade_parameters.get('tag')

            """ BUILD ORDER PARAMETERS DICTIONARY """
            order_params = {
                "variety": variety,
                "exchange": exchange,
                "tradingsymbol": symbol,
                "transaction_type": transaction_type,
                "quantity": quantity,
                "disclosed_quantity": disclosed_quantity,
                "order_type": order_type,
                "product": product,
                "price": price,
                "trigger_price": trigger_price,
                "validity": validity,
                "validity_ttl": validity_ttl,
                "iceberg_legs": iceberg_legs,
                "iceberg_quantity": iceberg_quantity,
                "tag": tag
            }
            trade_order_parameters.append(order_params)
        return trade_order_parameters


    def execute_trade_order(self):
        """ Execute Order """
        orders = self.prepare_order_placement()
        if not orders:
            log_error("Error: Could not generate orders.")
            return

        for order in orders:
            instrument = self.parameters.get('strategy_params.instrument')
            match int(instrument):
                case Instrument_Type.EQUITY.value:
                    object_equity_trade = EquityTrade(self.modules,
                                               order['variety'],
                                               order['exchange'],
                                               order['tradingsymbol'],
                                               order['transaction_type'],
                                               order['quantity'],
                                               order['disclosed_quantity'],
                                               order['order_type'],
                                               order['product'],
                                               order['price'],
                                               order['trigger_price'],
                                               order['validity'],
                                               order['validity_ttl'],
                                               order['iceberg_legs'],
                                               order['iceberg_quantity'],
                                               order['tag'])

                    order_id = object_equity_trade.execute_trade()
                    if order_id:
                        log_info("Order placed successfully.")
                    else:
                        log_warn("Order placement failed.")

                case Instrument_Type.OPTIONS.value:
                    pass

                case Instrument_Type.FUTURES.value:
                    pass

                case _:
                    log_error("No valid instrument type found in the configuration.")

    def validate_product(self, instrument, product):
        allowed_products = {
            Instrument_Type.EQUITY: [Product.MIS.value, Product.CNC.value],
            Instrument_Type.OPTIONS: [Product.MIS.value, Product.NRML.value],
            Instrument_Type.FUTURES: [Product.MIS.value, Product.NRML.value]
        }

        instrument_enum = Instrument_Type(instrument)
        if instrument_enum not in allowed_products or product not in allowed_products[instrument_enum]:
            log_error(f"Invalid Product for {instrument_enum.name}. Allowed products: {allowed_products[instrument_enum]}")
            return False
        else:
            return True