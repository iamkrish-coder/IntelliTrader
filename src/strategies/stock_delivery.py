# strategies/options_strategy.py
from src.strategies.base_strategy import BaseStrategy

class StockDelivery(BaseStrategy):
    def __init__(self, connection, modules, timeframe, ticker, strike, exchange, symbol, expiry, offset):
        super().__init__(connection, modules)
        
    def execute_live_strategy(self):
        pass

    def execute_backtest_strategy(self, backtest_parameters):
        print(backtest_parameters)