# handlers/strategy

import pandas as pd
from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *
from ...utils.logging_utils import *


class StrategyWatchlist:
    def __init__(self, modules, parameters):
        self.modules = modules
        self.parameters = parameters
        self.exchange = self.parameters.get('strategy_params.exchange')
        self.symbol = self.parameters.get('strategy_params.symbol')

    def initialize(self):
        return self.get_stock_watchlist()

    def get_stock_basket(self, exchange, symbol):
        stock_basket = []
        if exchange.upper() == Exchange.NSE.value:
            if symbol.upper() == "DEFAULT":
                symbols_list = pd.read_csv(DEFAULT_BASKET)
                stock_basket = symbols_list['Symbol'].tolist()
            else:
                stock_basket.append(symbol.upper())
        elif exchange.upper() == Exchange.BSE.value:
            if symbol.upper() == "DEFAULT":
                stock_basket = pd.read_csv(DEFAULT_BASKET)
            else:
                stock_basket.append(symbol.upper())
        else:
            log_info(f"Invalid Exchange {exchange}")
        return stock_basket

    def get_stock_watchlist(self):
        stock_basket = self.get_stock_basket(self.exchange, self.symbol)
        instruments_list = self.modules['fetch'].fetch_instruments(self.exchange)
        watchlist_stocks = [instrument for instrument in instruments_list if
                            instrument['tradingsymbol'] in stock_basket]
        return watchlist_stocks
