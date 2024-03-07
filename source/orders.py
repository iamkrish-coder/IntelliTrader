from source.helper import Helper
from source.constants.constants import *
from source.enumerations.enums import *
import logging

class Orders:
    def __init__(self, params):
        self.prop = params

    # Place a market order for a stock with given quantity
    def create_market_order(self, trade_variety, trade_exchange, trade_symbol, trade_transaction, trade_quantity, trade_product, trade_ordertype):
        
        trade_variety = trade_variety.upper()
        if trade_variety == Variety.REGULAR.value:
            trade_variety = self.prop['kite'].VARIETY_REGULAR
        elif trade_variety == Variety.AMO.value:
            trade_variety = self.prop['kite'].VARIETY_AMO
        elif trade_variety == Variety.CO.value:
            trade_variety = self.prop['kite'].VARIETY_CO
        elif trade_variety == Variety.ICEBERG.value:
            trade_variety = self.prop['kite'].VARIETY_ICEBERG
        elif trade_variety == Variety.AUCTION.value:
            trade_variety = self.prop['kite'].VARIETY_AUCTION
        else:
            logging.error("The order placement does not have a specified variety to regular, amo, co, iceberg or auction.")
            return False
        
        # Exchange
        trade_exchange = trade_exchange.upper()
        if trade_exchange == Exchange.NSE.value:
            trade_exchange =  self.prop['kite'].EXCHANGE_NSE
        elif trade_exchange == Exchange.BSE.value:
            trade_exchange = self.prop['kite'].EXCHANGE_BSE
        else:
            logging.error("The order placement does not have a specified exchange to NSE or BSE.")
            return False    

        # Transaction Type
        trade_transaction = trade_transaction.upper()
        if trade_transaction == TransactionType.BUY.value:
            trade_transaction = self.prop['kite'].TRANSACTION_TYPE_BUY
        elif trade_transaction == TransactionType.SELL.value:
            trade_transaction = self.prop['kite'].TRANSACTION_TYPE_SELL
        else:
            logging.error("The order placement does not have a specified action to buy or sell.")
            return False
        
        # Product
        trade_product = trade_product.upper()
        if trade_product == Product.MIS.value:
            trade_product = self.prop['kite'].PRODUCT_MIS
        elif trade_product == Product.CNC.value:
            trade_product = self.prop['kite'].PRODUCT_CNC
        elif trade_product == Product.NRML.value:
            trade_product = self.prop['kite'].PRODUCT_NRML
        else:
            logging.error("The order placement does not have a specified product to MIS, CNC or NRML.")
            return False
        
        # Order Type
        trade_ordertype = trade_ordertype.upper()
        if trade_ordertype == OrderType.MARKET.value:
            trade_ordertype = self.prop['kite'].ORDER_TYPE_MARKET
        elif trade_ordertype == OrderType.LIMIT.value:
            trade_ordertype = self.prop['kite'].ORDER_TYPE_LIMIT
        elif trade_ordertype == OrderType.SL.value:
            trade_ordertype = self.prop['kite'].ORDER_TYPE_SL
        elif trade_ordertype == OrderType.SL_M.value:
            trade_ordertype = self.prop['kite'].ORDER_TYPE_SL_M
        else:
            logging.error("The order type does not match the required format")
            return False

        try:
            response             = self.prop['kite'].place_order(
                variety          = trade_variety, 
                exchange         = trade_exchange,
                tradingsymbol    = trade_symbol,
                transaction_type = trade_transaction,
                quantity         = trade_quantity,
                product          = trade_product, 
                order_type       = trade_ordertype
            )
            
           

            if "order_id" in response:
                order_id = response["order_id"]
                logging.info(f"Market order placed successfully. Order ID: {order_id}")
            else:
                error_message = response["error_type"] + ": " + response["message"]
                logging.error("Market order placement failed. Error:", error_message)
                
        except Exception as e:
            logging.error("An exception occurred while placing the market order:", e)

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
