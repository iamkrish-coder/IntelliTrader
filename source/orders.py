from source.helper import Helper
from source.constants.constants import *
from source.enumerations.enums import *
import logging

class Orders:
    def __init__(self, params):
        self.prop = params

    # Place a market order for a stock with given quantity
    def create_market_order(self, trade_variety, trade_exchange, trade_symbol, trade_transaction, trade_quantity, trade_product, trade_ordertype, trade_validity):
        
        # Define mapping dictionaries for each parameter
        variety_mapping = {
            Variety.REGULAR.value: self.prop['kite'].VARIETY_REGULAR,
            Variety.AMO.value: self.prop['kite'].VARIETY_AMO,
            Variety.CO.value: self.prop['kite'].VARIETY_CO,
            Variety.ICEBERG.value: self.prop['kite'].VARIETY_ICEBERG,
            Variety.AUCTION.value: self.prop['kite'].VARIETY_AUCTION
        }

        exchange_mapping = {
            Exchange.NSE.value: self.prop['kite'].EXCHANGE_NSE,
            Exchange.BSE.value: self.prop['kite'].EXCHANGE_BSE
        }

        transaction_mapping = {
            TransactionType.BUY.value: self.prop['kite'].TRANSACTION_TYPE_BUY,
            TransactionType.SELL.value: self.prop['kite'].TRANSACTION_TYPE_SELL
        }

        product_mapping = {
            Product.MIS.value: self.prop['kite'].PRODUCT_MIS,
            Product.CNC.value: self.prop['kite'].PRODUCT_CNC,
            Product.NRML.value: self.prop['kite'].PRODUCT_NRML
        }

        order_type_mapping = {
            OrderType.MARKET.value: self.prop['kite'].ORDER_TYPE_MARKET,
            OrderType.LIMIT.value: self.prop['kite'].ORDER_TYPE_LIMIT,
            OrderType.SL.value: self.prop['kite'].ORDER_TYPE_SL,
            OrderType.SL_M.value: self.prop['kite'].ORDER_TYPE_SLM
        }

        validity_mapping = {
            Validity.DAY.value: self.prop['kite'].VALIDITY_DAY,
            Validity.IOC.value: self.prop['kite'].VALIDITY_IOC,
            Validity.TTL.value: self.prop['kite'].VALIDITY_TTL,
        }

        # Convert strings to constants using the mapping dictionaries
        trade_variety = variety_mapping.get(trade_variety.upper())
        trade_exchange = exchange_mapping.get(trade_exchange.upper())
        trade_transaction = transaction_mapping.get(trade_transaction.upper())
        trade_product = product_mapping.get(trade_product.upper())
        trade_ordertype = order_type_mapping.get(trade_ordertype.upper())
        trade_validity = validity_mapping.get(trade_validity.upper())

        if trade_variety is None:
            logging.error("The order placement does not have a specified variety to Regular, AMO, CO, Iceberg, or Auction.")
            return False

        if trade_exchange is None:
            logging.error("The order placement does not have a specified exchange to NSE or BSE.")
            return False

        if trade_transaction is None:
            logging.error("The order placement does not have a specified action to buy or sell.")
            return False

        if trade_product is None:
            logging.error("The order placement does not have a specified product to MIS, CNC, or NRML.")
            return False

        if trade_ordertype is None:
            logging.error("The order type does not match the required format.")
            return False


        try:
            order_id = self.prop['kite'].place_order(tradingsymbol = trade_symbol,
                                        exchange         = trade_exchange,
                                        transaction_type = trade_transaction,
                                        quantity         = trade_quantity,
                                        variety          = trade_variety,
                                        order_type       = trade_ordertype,
                                        product          = trade_product,
                                        validity         = trade_validity)

            logging.info(f"Market order placed. Order ID: {order_id}")
        except Exception as e:
            logging.info("Order placement failed: {}".format(e))

        return 

    # Place a limit order for a stock with given quantity
    def create_limit_order(self, variety, symbol, transaction, quantity, product, limit_price):
        if transaction == 'buy':
            transaction_type = self.prop['kite'].TRANSACTION_TYPE_BUY
        elif transaction == 'sell':
            transaction_type = self.prop['kite'].TRANSACTION_TYPE_SELL
        else:
            logging.error("The order placement does not have a specified action to buy or sell.")
            exit()

        try:
            response = self.prop['kite'].place_order(
                variety=variety,
                exchange=self.prop['kite'].EXCHANGE_NSE,
                tradingsymbol=symbol,
                transaction_type=transaction,
                quantity=quantity,
                product=product,
                order_type=self.prop['kite'].ORDER_TYPE_LIMIT,
                price=limit_price
            )
            if "order_id" in response:
                order_id = response["order_id"]
                logging.info(f"Limit order placed successfully. Order ID: {order_id}")
            else:
                error_message = response["error_type"] + ": " + response["message"]
                logging.error(f"Limit order placement failed. Error: {error_message}")
        except Exception as e:
            logging.info(f"Order placement failed: {e}")

    # Place a gtt limit order for a stock with given order details
    def create_gtt_order(self, gtt_type, symbol, exchange, trigger_values, last_price, order_list):
        # Place single-leg gtt order
        if gtt_type == 'single':
            gtt_trigger_type = 'GTT_TYPE_SINGLE'
            try:
                single_gtt = self.prop['kite'].place_gtt(trigger_type=gtt_trigger_type, tradingsymbol=symbol, exchange=exchange, trigger_values=trigger_values, last_price=last_price, orders=order_list)
                logging.info(f"Single leg gtt order trigger_id: {single_gtt['trigger_id']}")
            except Exception as e:
                logging.error(f"Error placing single leg gtt order: {e}")
        
        # Place two-leg(OCO) gtt order
        elif gtt_type == 'oco':            
            gtt_trigger_type = 'GTT_TYPE_OCO'
            try:
                gtt_oco = self.prop['kite'].place_gtt(trigger_type=gtt_trigger_type, tradingsymbol=symbol, exchange=exchange, trigger_values=trigger_values, last_price=last_price, orders=order_list)
                logging.info(f"GTT OCO trigger_id: {gtt_oco['trigger_id']}")
            except Exception as e:
                logging.info(f"Error placing gtt oco order: {e}")

        else:
            logging.warn("Error placing gtt order, gtt type is not defined")
