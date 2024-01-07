import logging
from tkinter.tix import COLUMN
import pandas as pd
import os
import datetime as dt
from src.helper import Helper

class Fetch:
    def __init__(self, params):
        self.prop = params

    # Fetch instruments list
    def fetch_instruments(self, exchange=None):
        instruments_dump = self.prop['kite'].instruments(exchange)
        if exchange is not None:
            Helper.write_csv_output('instruments' + '_' + exchange + '.csv', instruments_dump)
            logging.info('Instruments fetched for exchange %s', exchange)
        else:
            Helper.write_csv_output('instruments.csv', instruments_dump)
            logging.info('Instruments fetched successfully')
        return instruments_dump

    # Lookup instrument token 
    def instrument_token_lookup(self, exchange, symbol):
        if exchange and symbol:
            nse_instruments_dump = self.prop['kite'].instruments(exchange)
            instrument_df = pd.DataFrame(nse_instruments_dump)
            try:
                instrument_token = instrument_df[instrument_df.tradingsymbol == symbol].instrument_token.values[0]
                logging.info('Instrument token %d obtained for symbol %s', instrument_token, symbol)
                return instrument_token
            except Exception as e:
                logging.warning("An exception occurred: {}".format(e))
                exit()
        else:
            logging.warning('Please verify that the echange [%s] and symbol [%s] are present.' %(exchange) %(symbol))
            exit()

    # Lookup instrument token list (web streaming)
    def stream_instrument_token_lookup(self, exchange, symbol_list):
        if exchange and symbol_list:
            nse_instruments_dump = self.prop['kite'].instruments(exchange)
            instrument_df = pd.DataFrame(nse_instruments_dump)
            token_list = []
            
            try:
                for symbol in symbol_list:
                    token_list.append(int(instrument_df[instrument_df.tradingsymbol == symbol].instrument_token.values[0]))
                return token_list
            except Exception as e:
                logging.warning("An exception occurred: {}".format(e))
                exit()
        else:
            logging.warning('Please verify that the exchange [%s] and symbol_list [%s] are present.' %(exchange) %(symbol_list))
            exit()
            
    # Fetch historical data for an exchange and symbol    
    def fetch_ohlc(self, exchange, symbol, interval='5minute', duration=1):
        if exchange and symbol and interval and duration:
            instrument_token = self.instrument_token_lookup(exchange, symbol)
            data = pd.DataFrame(self.prop['kite'].historical_data(instrument_token, dt.date.today()-dt.timedelta(duration), dt.date.today(), interval))
            Helper.write_csv_output('historical_' + exchange + '_' + symbol +  '.csv', data)
            return data
        else:
            logging.warning('Please verify that the echange [%s], symbol [%s], interval[%d] and duration[%d] are present.' %(exchange) %(symbol) %(interval) %(duration))
            exit()

    # Fetch extended historical data for an exchange and symbol with limits   
    def fetch_ohlc_extended(self, exchange, symbol, period_start, interval):
        if exchange and symbol and period_start and interval:
            instrument_token = self.instrument_token_lookup(exchange, symbol)
            match interval:
                case "minute":
                    lookback_period_threshold = 60
                case "3minute":
                    lookback_period_threshold = 100
                case "5minute":
                    lookback_period_threshold = 100
                case "10minute":
                    lookback_period_threshold = 100
                case "15minute":
                    lookback_period_threshold = 200
                case "30minute":
                    lookback_period_threshold = 200
                case "60minute":
                    lookback_period_threshold = 400
                case "day":
                    lookback_period_threshold = 2000
                case _:
                    lookback_period_threshold = 1

            start_date = dt.datetime.strptime(period_start, '%d-%m-%Y')
            end_date = dt.date.today()
            data = pd.DataFrame(columns=['date', 'open', 'high', 'low', 'close', 'volume'])
            while True:
                if start_date.date() >= (dt.date.today() - dt.timedelta(lookback_period_threshold)):
                    data = data._append(pd.DataFrame(self.prop['kite'].historical_data(instrument_token, start_date, dt.date.today(), interval)), ignore_index=True)
                    break
                else:
                    end_date = start_date + dt.timedelta(lookback_period_threshold)
                    data = data._append(pd.DataFrame(self.prop['kite'].historical_data(instrument_token, start_date, end_date, interval)), ignore_index=True)
                    start_date = end_date
    
            Helper.write_csv_output('historical_' + exchange + '_' + symbol + '_' + str(lookback_period_threshold) + '.csv', data)
            return data
        else:
            logging.warning('Please verify that the echange [%s], symbol [%s], period_start[%d] and interval[%d] are present.' %(exchange) %(symbol) %(period_start) %(interval))
            exit()

    # Fetch quote
    def fetch_quote(self, exchange, symbol):
        if exchange and symbol:
            quote = self.prop['kite'].quote(exchange + ':' + symbol)
            return quote
        else:
            logging.warning('Please verify that the echange [%s] and symbol [%s] are present.' %(exchange) %(symbol))
            exit()

    # Fetch ltp 
    def fetch_ltp(self, exchange, symbol):
        if exchange and symbol:
            last_traded_price = self.prop['kite'].ltp(exchange + ':' + symbol)
            return last_traded_price
        else:
            logging.warning('Please verify that the echange [%s] and symbol [%s] are present.' %(exchange) %(symbol))
            exit()

    # Fetch orders 
    def fetch_orders(self):
        orders = self.prop['kite'].orders()
        return orders

    # Fetch positions 
    def fetch_positions(self):
        positions = self.prop['kite'].positions()
        return positions

    # Fetch holdings
    def fetch_holdings(self):
        holdings = self.prop['kite'].holdings()
        return holdings