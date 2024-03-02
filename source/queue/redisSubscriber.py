import redis

class RedisSubscriber:
    def __init__(self, channel_name, callback):
        self.channel_name = channel_name
        self.callback = callback
        self.redis_client = redis.Redis(host='localhost', port=6379, db=0)
        self.pubsub = self.redis_client.pubsub()
        self.pubsub.subscribe(**{self.channel_name: self.handle_message})

    def handle_message(self, message):
        data = message['data'].decode('utf-8')
        self.callback(self.channel_name, data)

    def listen_for_messages(self):
        try:
            for message in self.pubsub.listen():
                if message['type'] == 'message':
                    self.handle_message(message)
        except Exception as e:
            print(f"An error occurred while listening for messages: {str(e)}")

    def stop_subscription(self):
        self.pubsub.unsubscribe(self.channel_name)
        self.pubsub.close()
        self.redis_client.close()
