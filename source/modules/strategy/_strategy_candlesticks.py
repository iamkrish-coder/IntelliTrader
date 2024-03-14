# handlers/strategy

import asyncio
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *

class StrategyCandlesticks:
    def __init__(self, modules, watchlist, parameters):
        self.modules                      = modules
        self.trading_watchlist            = watchlist  
        self.parameters                   = parameters
        self.trading_exchange             = None
        self.trading_symbol               = None
        self.trading_token                = None
        self.trading_timeframe            = None    
        self.timeframe                    = parameters.get('timeframe')
        self.historical_data_subscription = parameters.get('historical_data_subscription')
        
    def initialize(self):
        return self.scan_watchlist_stocks()

    async def get_candlestick_information(self):
        """
        Asynchronously fetches OHLC data for different timeframes.
        """
        if self.historical_data_subscription:
            # self.timeframe, DAY, WEEK, MONTH, TODAY_5M, TODAY_15M, TODAY_30M, TODAY_60M
            tasks = [
                self.fetch_ohlc_async(self.trading_exchange, self.trading_symbol, self.trading_token, self.trading_timeframe)
                for self.trading_timeframe in [self.timeframe, DAY, WEEK, MONTH, TODAY_5M, TODAY_15M, TODAY_30M, TODAY_60M]
            ]
            candles = await asyncio.gather(*tasks)
            return candles
        else:
            pass

    async def fetch_ohlc_async(self, trading_exchange, trading_symbol, trading_token, trading_timeframe):
        """
        Fetches OHLC data asynchronously for the given timeframe.
        """
        loop = asyncio.get_running_loop()  
        candles = await loop.run_in_executor(None, self.modules['fetch'].fetch_ohlc, trading_exchange, trading_symbol, trading_token, trading_timeframe)
        return candles

    def scan_watchlist_stocks(self):
        """
        Executes the Scanning on Watchlist Instruments.
        """
        candlestick_data_list = []

        try:
            for i, stock in enumerate(self.trading_watchlist, start=1):                
                self.trading_exchange = stock.get('exchange')
                self.trading_symbol = stock.get('tradingsymbol')

                if self.trading_exchange is None or self.trading_symbol is None:
                    continue

                self.trading_token = stock.get('instrument_token') if stock.get('instrument_token') else self.modules['fetch'].trading_token_lookup(self.trading_exchange, self.trading_symbol)

                print(f"\nScanning Stock {i}/{len(self.trading_watchlist)}: {self.trading_exchange}, {self.trading_symbol}, {self.trading_token}\n")

                log_info(f"Fetching OHLCV data for Primary Conditions: {self.trading_exchange}, {self.trading_symbol}, {self.trading_token}")
                candlestick_data = asyncio.run(self.get_candlestick_information())

                candlestick_data_list.append({
                    'exchange': self.trading_exchange,
                    'symbol': self.trading_symbol,
                    'token': self.trading_token,
                    'candlestick_data': candlestick_data
                })
        except Exception as e:
            log_error(f"An error occurred while scanning watchlist stocks: {str(e)}")

        return candlestick_data_list
