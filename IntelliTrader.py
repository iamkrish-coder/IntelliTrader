from source.shared.logging_utils import *
configure_logging()

from sys import modules
from kiteconnect import KiteConnect, KiteTicker
from source.connection import Connection
from source.helper import Helper
from source.fetch import Fetch
from source.orders import Orders
from source.ticker import Ticker
from source.indicator import Indicator
from source.constants.constants import *
from source.enumerations.enums import *
from source.enumerations.resource_string_enums import INFO, ERROR, WARN
from source.language.resource_strings import ResourceStrings
from source.aws.aws_secrets_manager import get_secret
from source.controller.MainStrategy import StrategyController
from source.controller.MainAction import ActionController
from flask import Flask, render_template, request, redirect, session

import webbrowser
import json
import datetime
import os
import glob
import pandas as pd

class IntelliTrader:
    def __init__(self, secret_name, region_name):
        self.secret_name = secret_name
        self.region_name = region_name
        self.secret_keys = self.get_secret_keys()
        self.configuration = self.read_input_configuration()
        
    def read_input_configuration(self):
        with open(CONFIGURATION_PATH + '/config.json', 'r') as f:
            config = json.load(f)
        return config
        
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
        log_info(INFO.CONNECT_KITE_COMPLETE)
        return kite, kite_ticker, access_token

    def establish_new_connection(self):
        connect = Connection(self.secret_keys)
        kite, kite_ticker, access_token = connect.broker_login(KiteConnect, KiteTicker)
        kite.set_access_token(access_token)
        log_info(INFO.NEW_CONNECTION_REQUEST_COMPLETE)       
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
            log_error(ERROR.REMOVE_FILE_ERROR, file_path)

    def init_modules(self, connection):
        help_instance      = Helper(connection)
        fetch_instance     = Fetch(connection)
        orders_instance    = Orders(connection)
        ticker_instance    = Ticker(connection)
        indicator_instance = Indicator(connection)

        modules = {
            'help': help_instance,
            'fetch': fetch_instance,
            'orders': orders_instance,
            'ticker': ticker_instance,
            'indicator': indicator_instance
        }
        return modules


def InitializeCoreSystem(_IntelliTrader_):
    # Create app instance
    app = _IntelliTrader_

    # Establish connection to the broker
    connection = app.connection_to_broker()
    
    # Initialize application modules
    modules = app.init_modules(connection)

    # Read user preferences from configuration
    configuration = app.read_input_configuration()

    # Data Transport Choices

    # Instantiate the Strategy Handler
    sc_instance = StrategyController(connection, modules, configuration)
    sc_instance.initialize() 
    

    # (1) Redis Queues [DEPRECATED]
    # redis_service_controller = RedisServiceController()
    # redis_service_controller.start_redis_server()

    # (2) AWS Simple Queue Servuce (SQS) [DEPRECATED]
    # actions_handler_instance = MainAction.ActionHandler(connection, modules, configuration)   
    # actions_handler_instance.initialize()


def InitializeWebInterface(_IntelliTrader_):
    # Create a Flask app instance
    app = _IntelliTrader_
    app = Flask(__name__, template_folder=os.path.join(os.path.dirname(__file__), TEMPLATES_PATH),
                static_url_path='/source/static',
                static_folder=os.path.join(os.path.dirname(__file__), STATIC_FILE_PATH))
    
    # Sample settings data (you'll replace this with your actual settings)
    configuration = app.read_input_configuration()

    # Define the route for the index page
    @app.route('/')
    def index():
        # Render the index.html template
        return render_template('index.html', settings=configuration)

    @app.route('/scan', methods=['POST'])
    def initialize_core():
        if request.method == 'POST':
            # Call your backend function here
            InitializeCoreSystem(app) 
            return 'Core function executed successfully'

    # Define the host and port for the Flask application
    host = '127.0.0.1'
    port = 5000

    # Open the browser automatically with the Flask application URL
    url = f'http://{host}:{port}/'
    webbrowser.open(url)

    # Run the Flask application
    app.run(host=host, port=port)
    

if __name__ == "__main__":
    _IntelliTrader_ = IntelliTrader(SECRET_NAME, REGION_NAME)
    # Website
    # InitializeWebInterface(_IntelliTrader_) 
    
    # Application
    InitializeCoreSystem(_IntelliTrader_)
