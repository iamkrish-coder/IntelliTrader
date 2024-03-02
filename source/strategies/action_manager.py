from source.constants.constants import *
from source.enumerations.enums import *
from source.queue.redisSubscriber import RedisSubscriber
import threading

class ActionManager:
    def __init__(self, channel_names):
        self.subscribers = {channel_name: RedisSubscriber(channel_name, self.process_alerts) for channel_name in channel_names}

    def monitor_queues(self):
        """
        Listen for alerts from the Redis channels and process them accordingly.
        """
        for channel_name, subscriber in self.subscribers.items():
            print(f"Listening for alerts on channel: {channel_name}")
            # Create a separate thread for listening to each channel
            thread = threading.Thread(target=subscriber.listen_for_messages)
            thread.start()

    def process_alerts(self, channel_name, message):
        """
        Process alerts received from the Redis channels.
        """
        print(f"\n::::::: Received Alert for Strategy {channel_name}: {message} :::::::")
        # Add your processing logic here


if __name__ == "__main__":
    channel_names = [queue.name for queue in Queues]
    action_manager_instance = ActionManager(channel_names)
    action_manager_instance.monitor_queues()
