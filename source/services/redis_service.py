import subprocess
import socket
import logging 

class RedisServiceController:
    def __init__(self):
        pass

    def start_redis_server(self):
        if not self.is_redis_running():
            try:
                subprocess.run(['wsl', 'sudo', 'service', 'redis-server', 'start'], check=True)
                logging.info("Redis server started successfully.")
            except subprocess.CalledProcessError as e:
                logging.error(f"Error starting Redis server: {e}")
        else:
            logging.info("Redis server is already running.")
            
    def stop_redis_server(self):
        try:
            # Execute the command to stop the Redis server in WSL
            subprocess.run(['wsl', 'sudo', 'service', 'redis-server', 'stop'], check=True)
            logging.info("Redis server stopped successfully.")
        except subprocess.CalledProcessError as e:
            logging.error(f"Error stopping Redis server: {e}")

    def is_redis_running(self):
        # Attempt to connect to the Redis server's default port
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.settimeout(1)  # Set a timeout for the connection attempt
                s.connect(('localhost', 6379))
                return True
        except (ConnectionRefusedError, socket.timeout):
            return False


