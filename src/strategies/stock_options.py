# strategies/options_strategy.py
from src.strategies.base_strategy import BaseStrategy
import src.strategies.shared as shared
import logging

class StockOptions(BaseStrategy):
    def __init__(self, connection, modules, ticker, strike, exchange, symbol, expiry, offset):
        super().__init__(connection, modules)
        self.ticker = ticker
        self.strike = strike
        self.exchange = exchange
        self.symbol = symbol
        self.expiry = expiry
        self.offset = offset

    def execute_strategy(self, dataset):
        if dataset is None:
            logging.info("Strategy Execute: Stock-Options")
            # common_utils = dataset['common_utils']
            # user_input = dataset['user_input']

            # Input values
            m_ticker    = self.ticker
            m_strike    = self.strike
            m_exchange  = self.exchange
            m_symbol    = self.symbol
            m_expiry    = self.expiry
            m_offset    = self.offset

            # Get derivative instrument's last traded price
            current_index = shared.get_underlying_ltp(self.connection, m_ticker)
