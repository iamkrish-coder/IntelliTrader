from src.helper import Helper
import logging

class Orders:
    def __init__(self, params):
        self.prop = params

    # Place a market order for a stock with given quantity
    def create_market_order(self, variety, symbol, transaction, quantity, product):
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
                transaction_type=transaction_type,
                quantity=quantity,
                product=product, 
                order_type=self.prop['kite'].ORDER_TYPE_MARKET
            )
            if "order_id" in response:
                order_id = response["order_id"]
                logging.info("Market order placed successfully. Order ID:", order_id)
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
                logging.info("Limit order placed successfully. Order ID:", order_id)
            else:
                error_message = response["error_type"] + ": " + response["message"]
                logging.error("Limit order placement failed. Error:", error_message)
        except Exception as e:
            logging.info("Order placement failed: {}".format(e))

    # Place a gtt limit order for a stock with given order details
    def create_gtt_order(self, gtt_type, symbol, exchange, trigger_values, last_price, order_list):
        # Place single-leg gtt order
        if gtt_type == 'single':
            gtt_trigger_type = 'GTT_TYPE_SINGLE'
            try:
                single_gtt = self.prop['kite'].place_gtt(trigger_type=gtt_trigger_type, tradingsymbol=symbol, exchange=exchange, trigger_values=trigger_values, last_price=last_price, orders=order_list)
                logging.info("Single leg gtt order trigger_id : {}".format(single_gtt['trigger_id']))
            except Exception as e:
                logging.error("Error placing single leg gtt order: {}".format(e))
        
        # Place two-leg(OCO) gtt order
        elif gtt_type == 'oco':            
            gtt_trigger_type = 'GTT_TYPE_OCO'
            try:
                gtt_oco = self.prop['kite'].place_gtt(trigger_type=gtt_trigger_type, tradingsymbol=symbol, exchange=exchange, trigger_values=trigger_values, last_price=last_price, orders=order_list)
                logging.info("GTT OCO trigger_id : {}".format(gtt_oco['trigger_id']))
            except Exception as e:
                logging.info("Error placing gtt oco order: {}".format(e))

        else:
            logging.warn("Error placing gtt order, gtt type is not defined")
