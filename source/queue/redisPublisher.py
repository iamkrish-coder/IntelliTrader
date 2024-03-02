import redis

class RedisPublisher:
    def __init__(self, channel_name):
        self.channel_name = channel_name
        self.redis_client = redis.Redis(host='localhost', port=6379, db=0)

    def publish_message(self, message):
        self.redis_client.publish(self.channel_name, message)

