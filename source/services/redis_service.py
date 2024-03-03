import subprocess
import socket

class RedisServiceController:
    def __init__(self):
        pass

    def start_redis_server(self):
        if not self.is_redis_running():
            try:
                subprocess.run(['wsl', 'sudo', 'service', 'redis-server', 'start'], check=True)
                print("Redis server started successfully.")
            except subprocess.CalledProcessError as e:
                print(f"Error starting Redis server: {e}")
        else:
            print("Redis server is already running.")
            
    def stop_redis_server(self):
        try:
            # Execute the command to stop the Redis server in WSL
            subprocess.run(['wsl', 'sudo', 'service', 'redis-server', 'stop'], check=True)
            print("Redis server stopped successfully.")
        except subprocess.CalledProcessError as e:
            print(f"Error stopping Redis server: {e}")

    def is_redis_running(self):
        # Attempt to connect to the Redis server's default port
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.settimeout(1)  # Set a timeout for the connection attempt
                s.connect(('localhost', 6379))
                return True
        except (ConnectionRefusedError, socket.timeout):
            return False

if __name__ == "__main__":
    redis_controller = RedisServiceController()

    # Example: Start Redis server
    redis_controller.start_redis_server()

    # Example: Stop Redis server
    redis_controller.stop_redis_server()

