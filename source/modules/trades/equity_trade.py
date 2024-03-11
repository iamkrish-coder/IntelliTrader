from source.modules.trades.BaseTrade import BaseTrade

class EquityTrade(BaseTrade):
    def __init__(self, modules, variety, exchange, symbol, transaction_type, quantity, product, order_type, validity):
        super().__init__(modules, transaction_type, order_type)
        self.variety = variety
        self.exchange = exchange
        self.symbol = symbol
        self.quantity = quantity
        self.product = product
        self.validity = validity


    def buy(self):
        order_params = [self. variety, self.exchange, self.symbol, self.transaction_type, self.quantity, self.product, self.order_type, self.validity]
        return self.create_trade_order(order_params)

    def sell(self):
        order_params = [self. variety, self.exchange, self.symbol, self.transaction_type, self.quantity, self.product, self.order_type, self.validity]
        return self.create_trade_order(order_params)
