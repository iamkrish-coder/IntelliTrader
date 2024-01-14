import datetime

class TickerHandler:
    def __init__(self, fetch, ticker):
        self.fetch = fetch
        self.ticker = ticker

    def handle_ticker(self, exchange, symbol, mode, user_settings):
        itoken = self.fetch.stream_instrument_token_lookup(exchange, symbol)
        self.ticker.connect_to_ticker(itoken, mode, user_settings)


class DataHandler:
    def __init__(self, fetch):
        self.fetch = fetch

    def fetch_ltp(self, exchange, symbol):
        result_ltp = self.fetch.fetch_ltp(exchange, symbol)
        key = exchange + ':' + symbol
        ltp = result_ltp[key]['last_price']
        print("\nThe Last Traded Price (LTP) of {}:{} is {}\n".format(exchange, symbol, ltp))

    def fetch_backtest_data(self, exchange, symbol, interval, duration):
        user_input_for_backtest_data = {
            'exchange': exchange,
            'type': 'daily',
            'symbol': symbol,
            'interval': interval,
            'start_date': datetime.date(2023, 12, 29),
            'end_date': datetime.date(2023, 12, 31)
        }
        datasource = self.fetch.fetch_backtest_data(user_input_for_backtest_data)
        print("\nThe OHLC values for {}:{} on {} timeframe: \n{}".format(exchange, symbol, interval, datasource))
