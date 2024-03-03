from time import sleep
from source.constants.constants import *
from source.enumerations.enums import *
from source.queue.redisSubscriber import RedisSubscriber
from source.strategies.base_actions import BaseActions

import threading
import datetime
import time
import logging

class StrategyActions(BaseActions):
    def __init__(self, connection, modules, strategy_queues):
        super().__init__(connection, modules) 
        self.subscribers = {queue: RedisSubscriber(queue, self.callback_processor) for queue in strategy_queues}
        self.is_running  = True
        logging.basicConfig(level=logging.INFO)
        self.logger      = logging.getLogger(__name__)
        
    def subscribe_to_queues(self):
        """
        Listen for alerts from the Redis queues and process them accordingly.
        """
        for queue, subscriber in self.subscribers.items():
            self.logger.info(f"Listening for alerts on queue: {queue}")
            subscriber_thread = threading.Thread(target=self.queue_listener, args=(queue, subscriber))
            subscriber_thread.start()

    def queue_listener(self, queue, subscriber):
        """
        Listen for messages on a specific queue.
        """
        while self.is_running:
            try:
                subscriber.listen_for_messages()
            except Exception as e:
                self.logger.error(f"An error occurred while listening for messages: {str(e)}")

    def callback_processor(self, queue, alert):
        """
        Process alerts received from the Redis queues.
        """
        self.logger.info(f"::::::: Received Alert for Strategy  {queue}: {alert}")
        threading.Thread(target=self.process_stock_alerts, args=(queue, alert)).start()

    def process_stock_alerts(self, queue, alert):
        """
        Manage Stock Alerts to generate buy or sell signals
        """
        exchange, symbol, token = alert.split(',')
        self.logger.info(f"Monitoring Stock Alerts for {exchange}, {symbol}, {token}")

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
        


    
    def stop(self):
        """
        Stops the action manager and its associated threads.
        """
        self.is_running = False

