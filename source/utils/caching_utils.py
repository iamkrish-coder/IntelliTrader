import os
import shutil
import datetime
import time
from diskcache import Cache
from source.constants.constants import CACHE_PATH
from source.utils.logging_utils import *


def generate_cache_key():
    """
    Generates a unique cache key based on the input.

    # You'll need to fill in the logic to generate the key here
    # (e.g., return f"{exchange}:{symbol}:{timeframe}")
    """
    pass
    
def get_cache_path(category):
    
    now = datetime.datetime.now()
    formatted_date = now.strftime("%Y-%m-%d")
    # Construct the cache path with subfolder
    cache_path = os.path.join(CACHE_PATH, formatted_date, category)
    return cache_path


def create_cache_path(cache_path):
    # Create the cache directory if it doesn't exist
    if not os.path.exists(cache_path):
        try:
            os.makedirs(cache_path, exist_ok=True)
        except OSError as e:
            log_error(f"Error creating cache directory: {e}")    
        
        
def clear_cache(cache_name, category):
    """
    This function clears the specified cache.

    Args:
        cache_name (str): The name of the cache to clear (e.g., "topics").
    """
    if category:
        cache_path = get_cache_path(category)        
        disk_cache = Cache(cache_path)   

        if cache_name != "disk":
            raise ValueError(f"Invalid cache name: {cache_name}")  

        disk_cache.clear()
    else:    
        remove_cache_directories()
    print(f"Cache {cache_name} cleared.")


def remove_cache_directories():
    # Remove old cache directories
    now = datetime.datetime.now()
    formatted_date = now.strftime("%Y-%m-%d")
    
    old_cache_dirs = [os.path.join(CACHE_PATH, dir) for dir in os.listdir(CACHE_PATH) if dir != formatted_date]
    for dir in old_cache_dirs:
        try:
            if os.path.isdir(dir):
                shutil.rmtree(dir)  
        except OSError as e:
            log_error(f"Error removing directory {dir}: {e}")           


def get_cached_item(cache_name, category, key):
    """
    This function retrieves an item from the specified cache.

    Args:
        cache_name (str): The name of the cache to use (e.g., "topics").
        key (str): The unique key for the cached item.

    Returns:
        object: The cached item or None if not found.
    """
    cache_path = get_cache_path(category)        
    disk_cache = Cache(cache_path)    
    
    if cache_name != "disk":
        raise ValueError(f"Invalid cache name: {cache_name}")  

    return disk_cache.get(key)


def set_cached_item(cache_name, category, key, value):
    """
    This function sets an item in the specified cache with expiration.

    Args:
        cache_name (str): The name of the cache to use (e.g., "topics").
        key (str): The unique key for the cached item.
        value (object): The item to be cached.
    """
    cache_path = get_cache_path(category)      
    create_cache_path(cache_path)
    disk_cache = Cache(cache_path)
    
    if cache_name != "disk":
        raise ValueError(f"Invalid cache name: {cache_name}") 

    disk_cache.set(key, value)


