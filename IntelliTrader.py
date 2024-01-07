from kiteconnect import KiteConnect, KiteTicker
from src.connection import Connection
from src.helper import Helper
from src.fetch import Fetch
from src.orders import Orders
from src.ticker import Ticker
from src.indicator import Indicator
from src.strategy import Strategy
from src.libs import Libs
from src.constants.constants import *
from src.aws.aws_secrets_manager import get_secret
from src.handlers import TickerHandler, DataHandler

import json
import datetime
import os
import glob
import pandas as pd
import logging

class IntelliTrader:
    def __init__(self, secret_name, region_name):
        self.secret_name = secret_name
        self.region_name = region_name
        self.secret_keys = self.get_secret_keys()

    def get_secret_keys(self):
        secret_keys = json.loads(get_secret(self.secret_name, self.region_name))
        return secret_keys

    def connection_to_broker(self):
        api_key = self.secret_keys.get('api_key')
        auth_date = datetime.datetime.now().strftime('%d%H')
        access_token_file = f"{ACCESS_TOKEN_PATH + '_' + auth_date + '.txt'}"

        # Establish connection
        if os.path.isfile(access_token_file):
            kite, kite_ticker, access_token = self.establish_old_connection(api_key)
        else:
            self.remove_old_tokens()
            kite, kite_ticker, access_token = self.establish_new_connection()

        # Initialize connection object
        connection_object = {
            "kite" : kite,
            "kiteticker": kite_ticker,
            "authorize" : access_token
        }
        return connection_object
    
    def establish_old_connection(self, api_key):
        auth_date = datetime.datetime.now().strftime('%d%H')
        access_token = open(ACCESS_TOKEN_PATH + '_' + auth_date +  '.txt','r').read()
        kite = KiteConnect(api_key)
        kite_ticker = KiteTicker(api_key, access_token)
        kite.set_access_token(access_token)
        logging.info("Successfully connected to Kite APIs using cached credentials.")
        return kite, kite_ticker, access_token

    def establish_new_connection(self):
        connect = Connection(self.secret_keys)
        kite, kite_ticker, access_token = connect.broker_login(KiteConnect, KiteTicker)
        kite.set_access_token(access_token)
        logging.info("Successfully initiated a new connection to Kite APIs.")
        return kite, kite_ticker, access_token

    def remove_old_tokens(self):
        old_access_token_files = glob.glob(ACCESS_TOKEN_PATH + '*.txt')
        for old_access_token_file in old_access_token_files:
            self.remove_file(old_access_token_file)

        old_request_token_files = glob.glob(REQUEST_TOKEN_PATH + '*.txt')
        for old_request_token_file in old_request_token_files:
            self.remove_file(old_request_token_file)

    def remove_file(self, file_path):
        try:
            os.remove(file_path)
        except Exception as e:
            self.handle_error(e, f"Unable to remove file: {file_path}")

    def handle_error(self, exception, message):
        logging.error(f"An exception occurred: {exception}. {message}")
        exit()

    def initialize_modules(self, connection):
        help_instance = Helper(connection)
        fetch_instance = Fetch(connection)
        orders_instance = Orders(connection)
        ticker_instance = Ticker(connection)
        indicator_instance = Indicator(connection)
        strategy_instance = Strategy(connection)
        libs_instance = Libs(connection)      

        package_utils = {
            'help': help_instance,
            'libs': libs_instance,           
            'fetch': fetch_instance,
            'orders': orders_instance,
            'ticker': ticker_instance,
            'indicator': indicator_instance,
            'strategy': strategy_instance            
        }

        # Create handler instances with the necessary dependencies
        self.ticker_handler = TickerHandler(fetch_instance, ticker_instance)
        self.data_handler = DataHandler(fetch_instance, libs_instance)

    def read_input_configuration(self):
        with open(CONFIGURATION_PATH + '/config.json', 'r') as f:
            config = json.load(f)
        return config

def main():
    # Create an instance of IntelliTrader
    app = IntelliTrader(SECRET_NAME, REGION_NAME)

    # Establish connection to the broker
    connection = app.connection_to_broker()

    # Initialize application modules
    app.initialize_modules(connection)

    # Read user preferences from configuration
    user_preferences = app.read_input_configuration()

    # Handle ticker based on user preferences
    if user_preferences['ticker'] is True:  
        app.ticker_handler.handle_ticker(
            user_preferences['ticker_exchange'],
            user_preferences['ticker_symbol'],
            user_preferences['ticker_mode'],
            user_preferences['user_settings']
        )

    # Fetch Last Traded Price (LTP) using user preferences
    app.data_handler.fetch_ltp(
        user_preferences['exchange'],
        user_preferences['symbol']
    )

    # Fetch OHLC data using user preferences
    app.data_handler.fetch_ohlc(
        user_preferences['exchange'],
        user_preferences['symbol'],
        user_preferences['interval'],
        user_preferences['duration']
    )

    
if __name__ == "__main__":
    main()
