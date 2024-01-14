import datetime

class Handler:
    def __init__(self, modules):
        self.modules = modules

    def fetch_ltp(self, exchange, symbol):
        result_ltp = self.modules['fetch'].fetch_ltp(exchange, symbol)
        key = exchange + ':' + symbol
        ltp = result_ltp[key]['last_price']
        print("\nThe Last Traded Price (LTP) of {}:{} is {}\n".format(exchange, symbol, ltp))

    def fetch_ticker_data(self, exchange, symbol, mode, user_settings):
        itoken = self.modules['fetch'].stream_instrument_token_lookup(exchange, symbol)
        self.modules['ticker'].connect_to_ticker(itoken, mode, user_settings)

    def fetch_backtest_data(self, exchange, symbol, interval, duration):
        user_input_for_backtest_data = {
            'exchange': exchange,
            'type': 'daily',
            'symbol': symbol,
            'interval': interval,
            'start_date': datetime.date(2023, 12, 29),
            'end_date': datetime.date(2023, 12, 31)
        }
        datasource = self.modules['fetch'].fetch_backtest_data(user_input_for_backtest_data)
        print("\nThe OHLC values for {}:{} on {} timeframe: \n{}".format(exchange, symbol, interval, datasource))
