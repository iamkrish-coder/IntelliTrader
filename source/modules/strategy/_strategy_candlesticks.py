# handlers/strategy

import asyncio
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from diskcache import Cache

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
        self.cache                        = Cache(CACHE_PATH)  
        self.debug  = 1

    def initialize(self):
        return self.scan_watchlist_stocks()

    async def fetch_ohlc_async(self, trading_exchange, trading_symbol, trading_token, trading_timeframe):
        """
        Fetches OHLC data asynchronously for the given timeframe.
        """
        loop = asyncio.get_running_loop()  
        try:
            candles = await loop.run_in_executor(None, self.modules['fetch'].fetch_ohlc, trading_exchange, trading_symbol, trading_token, trading_timeframe)
            return candles
        except Exception as e:
            log_error(f"An error occurred while fetching OHLC data for {trading_exchange}, {trading_symbol}, {trading_token} in {trading_timeframe}: {str(e)}")
            return None

    def fetch_large_timeframes_sync(self):
        """
        Fetches OHLC data asynchronously for larger timeframes (DAY, WEEK, etc.).
        """
        # ASYNC - DO NOT USE
        # timeframes = [DAY, WEEK, MONTH, TODAY_5M, TODAY_15M, TODAY_30M, TODAY_60M]
        # tasks = [self.fetch_ohlc_async(self.trading_exchange, self.trading_symbol, self.trading_token, timeframe) for timeframe in timeframes]
        # return await asyncio.gather(*tasks)
        
        # SYNC
        timeframes = [DAY, WEEK, MONTH, TODAY_5M, TODAY_15M, TODAY_30M, TODAY_60M]
        data = {}
        for timeframe in timeframes:
            data[timeframe] = self.fetch_ohlc_async(self.trading_exchange, self.trading_symbol, self.trading_token, timeframe).get_result()
        return data   


    async def get_candlestick_information(self):
        """
        Asynchronously fetches OHLC data for different timeframes.

        Uses cached data from diskcache for larger timeframes if available.
        """
        data = self.cache.get("historical_data")
        
        # Fetch data for specified timeframe (self.timeframe)
        specific_timeframe_data = await self.fetch_ohlc_async(self.trading_exchange, self.trading_symbol, self.trading_token, self.timeframe)

        # Fetch larger timeframes synchronously (avoiding asyncio for loop)
        if specific_timeframe_data:  
          larger_timeframe_data = self.fetch_large_timeframes_sync() 

          all_timeframe_data = {self.timeframe: specific_timeframe_data, **larger_timeframe_data}
          self.cache.set("historical_data", all_timeframe_data)
          return all_timeframe_data
        else:
          return None 


    async def run_async_function(self):
       return await self.get_candlestick_information()
       
        
    async def scan_watchlist_stocks(self):
        """
        Executes the Scanning on Watchlist Instruments.
        """
        stock_data_list = []        
        tasks = []
        valid_stock_data_list = []

        try:
            for i, stock in enumerate(self.trading_watchlist, start=1):                
                self.trading_exchange = stock.get('exchange')
                self.trading_symbol = stock.get('tradingsymbol')
                if self.trading_exchange is None or self.trading_symbol is None:
                    continue
                self.trading_token = stock.get('instrument_token') if stock.get('instrument_token') else self.modules['fetch'].trading_token_lookup(self.trading_exchange, self.trading_symbol)

                # Create stock data dictionary for this stock
                stock_data = {
                    'exchange': self.trading_exchange,
                    'symbol': self.trading_symbol,
                    'token': self.trading_token
                }


                print(f"\nScanning Stock {i}/{len(self.trading_watchlist)}: {self.trading_exchange}, {self.trading_symbol}, {self.trading_token}\n")
                log_info(f"Fetching OHLCV data for Primary Conditions: {self.trading_exchange}, {self.trading_symbol}, {self.trading_token}")

                candlestick_data_task = asyncio.create_task(self.run_async_function())
                tasks.append(candlestick_data_task)
                stock_data_list.append(stock_data)

            candlestick_data = await asyncio.gather(*tasks)
            
            for i, data in enumerate(candlestick_data):
                stock_data = stock_data_list[i]
                if data is not None:
                    stock_data['candlestick_data'] = data
                    # Append the valid stock data to the final list
                    valid_stock_data_list.append(stock_data)

        except Exception as e:
            log_error(f"An error occurred while scanning watchlist stocks: {str(e)}")

        return valid_stock_data_list
