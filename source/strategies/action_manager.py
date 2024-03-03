from time import sleep
from source.constants.constants import *
from source.enumerations.enums import *
from source.queue.redisSubscriber import RedisSubscriber
import threading
import datetime
import time
import asyncio

class ActionManager:
    def __init__(self, connection, modules, strategy_queues):
        self.connection = connection
        self.modules = modules
        self.subscribers = {queue: RedisSubscriber(queue, self.process_alerts) for queue in strategy_queues}
        self.is_running = True

    def monitor_queues(self):
        """
        Listen for alerts from the Redis queues and process them accordingly.
        """
        for queue, subscriber in self.subscribers.items():
            print(f"Listening for alerts on queue: {queue}")
            subscriber_thread = threading.Thread(target=self.listen_to_channel, args=(queue, subscriber))
            subscriber_thread.start()

    def listen_to_channel(self, queue, subscriber):
        """
        Listen for messages on a specific queue.
        """
        while self.is_running:
            try:
                subscriber.listen_for_messages()
            except Exception as e:
                print(f"An error occurred while listening for messages: {str(e)}")

    def process_alerts(self, queue, alert):
        """
        Process alerts received from the Redis queues.
        """
        print(f"\n::::::: Received Alert for Strategy {queue}: {alert}\n")
        threading.Thread(target=self.monitor_stock_alerts, args=(queue, alert)).start()

    def monitor_stock_alerts(self, queue, alert):
        """
        Monitor Stock Alerts
        """
        exchange, symbol, token = alert.split(',')
        print(f"Monitoring Stock Alerts for {exchange}, {symbol}, {token}")

        while self.is_running:
            try:
                current_time = datetime.datetime.now()
                if current_time.minute % 2 == 0:
                    self.fetch_ohlcv(exchange, symbol, token)
                time.sleep(60)
            except Exception as e:
                print(f"An error occurred while monitoring stock alerts: {str(e)}")

    def fetch_ohlcv(self, exchange, symbol, token):
        print(f"\nFetching OHLCV data for Secondary Conditions: {exchange}, {symbol}, {token}")
        candles_same_day_2m = self.modules['fetch'].fetch_ohlc(exchange, symbol, token, 'sameday2minute')
        print(candles_same_day_2m)

    def stop(self):
        """
        Stops the action manager and its associated threads.
        """
        self.is_running = False


if __name__ == "__main__":
    strategy_queues = [queue.name for queue in Queues]
    action_manager_instance = ActionManager(strategy_queues)
    try:
        action_manager_instance.monitor_queues()
    except KeyboardInterrupt:
        action_manager_instance.stop()
