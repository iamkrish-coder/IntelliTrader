from time import sleep
from source.constants.constants import *
from source.enumerations.enums import *
from source.strategies.base_actions import BaseActions

import threading
import datetime
import time
import logging
import boto3

class StrategyActions(BaseActions):
    
    def __init__(self, connection, modules):
        super().__init__(connection, modules) 
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        self.sqs = boto3.client('sqs', region_name=REGION_NAME)
        
    ###########################################
    # Subscribe Queue
    ###########################################
        
    def subscribe_message(self):
        # Receive messages from the queue
        response = self.sqs.receive_message(
            QueueUrl = f'{AWS_SQS.URL.value}/{AWS_SQS.ACCOUNT_ID.value}/{Queues.Queue1.value}',
            MaxNumberOfMessages = 5
        )

        # Process received messages
        messages = response.get('Messages', [])
        for message in messages:
            self.is_running = True
            
            self.logger.info(f"Received message: {message['Body']}")

            # Pass the message to process_stock_alerts
            self.process_stock_alerts(message['Body'])
        
            # Delete the message from the queue
            self.sqs.delete_message(
                QueueUrl = f'{AWS_SQS.URL.value}/{AWS_SQS.ACCOUNT_ID.value}/{Queues.Queue1.value}',
                ReceiptHandle = message['ReceiptHandle']
            )

    def process_stock_alerts(self, alert):
        """
        Manage Stock Alerts to generate buy or sell signals
        """
        exchange, symbol, token = alert.split(',')
        self.logger.info(f"Monitoring Stock Alerts for {exchange}, {symbol}, {token}")

        return
        
        while self.is_running:
            try:
                current_time = datetime.datetime.now()
                if current_time.minute % 2 == 0:
                    self.get_candlestick_data_sync(exchange, symbol, token)
                time.sleep(60)
            except Exception as e:
                self.logger.error(f"An error occurred while monitoring stock alerts: {str(e)}")
     

    def get_candlestick_data_sync(self, exchange, symbol, token):
        self.logger.info(f"Fetching OHLCV data for Secondary Conditions: {exchange}, {symbol}, {token}")      
        timeframes = ['sameday1minute', 'sameday2minute', 'sameday3minute']
        candles_same_day_1m, candles_same_day_2m, candles_same_day_3m = [self.modules['fetch'].fetch_ohlc(exchange, symbol, token, timeframe) for timeframe in timeframes]

        ohlcv_same_day_1m_data  = self.process_same_day_candles(candles_same_day_1m)
        ohlcv_same_day_2m_data  = self.process_same_day_candles(candles_same_day_2m)
        ohlcv_same_day_3m_data  = self.process_same_day_candles(candles_same_day_3m)
        
        conditions_met = self.evaluate_secondary_strategy_conditions(ohlcv_same_day_1m_data, ohlcv_same_day_2m_data, ohlcv_same_day_3m_data)
        if conditions_met:
            # self.generate_buy_signal()
            self.is_running = False
            print(f"Buy Now")
            
    ###########################################
    # Evaluate Strategy Conditions
    ###########################################
        
    def evaluate_secondary_strategy_conditions(self, ohlcv_same_day_1m_data, ohlcv_same_day_2m_data, ohlcv_same_day_3m_data):
        # Check if the last obtained candles are green
        last_candle_1m = ohlcv_same_day_1m_data[-1]  # Assuming ohlcv_same_day_1m_data is a list of OHLCV data
        last_candle_2m = ohlcv_same_day_2m_data[-1]  # Assuming ohlcv_same_day_2m_data is a list of OHLCV data
        last_candle_3m = ohlcv_same_day_3m_data[-1]  # Assuming ohlcv_same_day_3m_data is a list of OHLCV data

        # Define a function to determine if a candle is green
        def is_green(candle):
            return candle['close'] > candle['open']

        # Check if the last obtained candles are green
        is_last_1m_green = is_green(last_candle_1m)
        is_last_2m_green = is_green(last_candle_2m)
        is_last_3m_green = is_green(last_candle_3m)

        # Generate a buy signal if all last obtained candles are green
        if is_last_1m_green and is_last_2m_green and is_last_3m_green:
            # buy signal 
            return True    
        elif is_last_2m_green and is_last_3m_green:
            # buy signal 
            return True    
        elif is_last_3m_green: 
            # buy signal             
            return True    
        else: 
            return False
    
    def stop(self):
        """
        Stops the action manager and its associated threads.
        """
        self.is_running = False

