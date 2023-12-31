# Import statements
from asyncio.windows_events import NULL
from kiteconnect import KiteConnect
from kiteconnect import KiteTicker
from src.connection import Connection
from src.helper import Helper
from src.fetch import Fetch
from src.orders import Orders
from src.ticker import Ticker
from src.indicator import Indicator
from src.strategy import Strategy
from src.libs import Libs
from src.constants.constants import *
from src.enumerations.enums import *
from src.aws.aws_secrets_manager import get_secret

import json
import datetime
import os
import glob
import pandas as pd
import logging

# Constants
secret_name = SECRET_NAME
region_name = REGION_NAME

# Enumerations 

# Configuration
config_file_path = "./src/configuration/config.json"
with open(config_file_path, "r") as config_file:
    config = json.load(config_file)
    
# Logging configuration
logging.basicConfig(
    level = getattr(logging, config["log_level"]),
    format = '%(asctime)s [%(levelname)s] #%(lineno)s - %(module)s - Message: %(message)s', 
    datefmt = '%Y-%m-%d %H:%M:%S')

# Main
def main():
    # Retrieve the secret value from AWS Secret Manager Service
    secret_keys =  json.loads(get_secret(secret_name, region_name))
    API_KEY  = secret_keys.get('api_key') 
    
    auth_date = datetime.datetime.now().strftime('%d%H');
    access_token_file = f"{config['access_token_path'] + '_' + auth_date +  '.txt'}"

    if os.path.isfile(access_token_file):
        # Generate trading session
        access_token = open('./src/output/access_token' + '_' + auth_date +  '.txt','r').read()
        kite = KiteConnect(API_KEY)
        kite_ticker = KiteTicker(API_KEY, access_token)
        kite.set_access_token(access_token)
        logging.info("Connected to Kite with Ticker Data")
    else:
        # Remove old access token and request token before generating new one
        old_access_token_files = glob.glob('./src/output/access_token*.txt')
        for old_access_token_file in old_access_token_files:
            try:
                os.remove(old_access_token_file)
            except Exception as e:
                logging.error("An exception occurred: {}".format(e))
                exit()

        old_request_token_files = glob.glob('./src/output/request_token*.txt')
        for old_request_token_file in old_request_token_files:
            try:
                os.remove(old_request_token_file)
            except Exception as e:
                logging.error("An exception occurred: {}".format(e))
                exit()

        # Begin a new connection
        connect = Connection(secret_keys)
        kite, kite_ticker, access_token = connect.broker_login(KiteConnect, KiteTicker, logging)
        kite.set_access_token(access_token)
        logging.info("Connected to Kite with Ticker Data")

    connection_kit = {
        "kite" : kite,
        "kiteticker": kite_ticker,
        "authorize" : access_token,
        "log" : logging
    }

    help = Helper(connection_kit)
    fetch = Fetch(connection_kit)
    orders = Orders(connection_kit)
    ticker = Ticker(connection_kit)
    indicator = Indicator(connection_kit)
    strategy = Strategy(connection_kit)
    libs = Libs(connection_kit)

    common_utils = {
        'help' : help,
        'fetch' : fetch,
        'orders' : orders,
        'ticker' : ticker,
        'indicator' : indicator
        } 

    #######################
    # Module Sample usage
    #######################

    historical_data_subscribed = True

    # Input values
    exchange = 'NSE'
    symbol = 'SBIN'
    interval = '15minute'
    duration = 3

    user_input = {
        'exchange'  : 'NFO',
        'type'      : 'options',
        'action'    : 'buy',
        'ticker'    : 'NIFTY',
        'strike'    : ['CE', 'PE'],
        'expiry'    : 0,   # current
        'strikes'   : 5    # strikes offset from ATM
    }

    ##### Ticker #####
    ticker_exchange = exchange  # NSE
    ticker_symbol = symbol      # VOLTAS
    ticker_mode = ''            # QUOTE | LTP | FULL
    user_settings = {
        'en_price' : 0,  # auto 
        'tp_price' : 0,  # auto 
        'sl_price' : 0,  # auto 
        'tp_points': 0,  # configure
        'sl_points': 0   # configure
        }   

    if ticker_exchange and ticker_symbol and ticker_mode:
        itoken = fetch.stream_instrument_token_lookup(ticker_exchange, ticker_symbol)
        ticker.connect_to_ticker(itoken, ticker_mode, user_settings)

    ##### Fetch LTP #####
    result_ltp = fetch.fetch_ltp(exchange, symbol)
    key = exchange + ':' + symbol
    ltp = result_ltp[key]['last_price']
    print("\nThe Last Traded Price (LTP) of {}:{} is {}\n".format(exchange, symbol, ltp))

    ##### Fetch OHLC #####
    if historical_data_subscribed:
        # datasource = fetch.fetch_ohlc(exchange, symbol, interval, duration) ## This is used only when paid subscription 
        user_input_historical_data = {
            'exchange'  : 'NSE',
            'type'      : 'daily',
            'symbol'    : 'SBIN',
            'interval'  : '15minute',
            'start_date': datetime.date(2023,12,29), 
            'end_date'  : datetime.date(2023,12,31)
        }
        datasource = libs.execute_handler(user_input_historical_data)
        print("\nThe OHLC values for {}:{} on {} timeframe: \n{}".format(exchange, symbol, interval, datasource))

    #     ##### Indicators #####
    #     indicator.execute_handler('macd', datasource)
    #     indicator.execute_handler('rsi', datasource)
    #     indicator.execute_handler('atr', datasource)
    #     indicator.execute_handler('sma', datasource)
    #     indicator.execute_handler('ema', datasource)
    #     indicator.execute_handler('williams_r', datasource)
    #     indicator.execute_handler('vwap', datasource)
    #     indicator.execute_handler('adx', datasource)
    #     indicator.execute_handler('stochastic', datasource)
    #     indicator.execute_handler('renko', datasource, 5)
    #     indicator.execute_handler('bollinger', datasource)

    # ##### Strategies #####
    # strategy.execute_handler(common_utils, user_input)


# Other functions and classes
if __name__ == "__main__":
    main()
