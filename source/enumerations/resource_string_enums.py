# source/enumerations/resource_enums.py

from enum import Enum


class INFO(Enum):
    CONNECT_KITE_COMPLETE = "CONNECT_KITE_COMPLETE"
    NEW_CONNECTION_REQUEST_COMPLETE = "NEW_CONNECTION_REQUEST_COMPLETE"
    RETRIEVING_SECRET_KEYS_COMPLETE = "RETRIEVING_SECRET_KEYS_COMPLETE"
    GENERATE_KITE_REQUEST_TOKEN_COMPLETE = "GENERATE_KITE_REQUEST_TOKEN_COMPLETE"
    GENERATE_KITE_ACCESS_TOKEN_COMPLETE = "GENERATE_KITE_ACCESS_TOKEN_COMPLETE"
    FETCHING_OHLCV_DATA = "FETCHING_OHLCV_DATA"
    FETCHING_INDICATOR_DATA = "FETCHING_INDICATOR_DATA"
    ANALYZING_LOCAL_MARKET_SENTIMENT_COMPLETE = "ANALYZING_LOCAL_MARKET_SENTIMENT_COMPLETE"
    ANALYZING_GLOBAL_MARKET_SENTIMENT_COMPLETE = "ANALYZING_GLOBAL_MARKET_SENTIMENT_COMPLETE"
    ALERTS_PUBLISHED_COMPLETE = "ALERTS_PUBLISHED_COMPLETE"
    MARKET_ORDER_PLACED = "MARKET_ORDER_PLACED"
    LIMIT_ORDER_PLACED = "LIMIT_ORDER_PLACED"
    SINGLE_LEG_GTT_PLACED = "SINGLE_LEG_GTT_PLACED"
    GTT_OCO_PLACED = "GTT_OCO_PLACED"
    EVALUATING_STRATEGY = "EVALUATING_STRATEGY"
    MESSAGE_PUBLISHED = "MESSAGE_PUBLISHED"
    REDIS_SERVER_STARTED = "REDIS_SERVER_STARTED"
    REDIS_SERVER_ALREADY_RUNNING = "REDIS_SERVER_ALREADY_RUNNING"
    REDIS_SERVER_STOPPED = "REDIS_SERVER_STOPPED"
    SUCCESSFULLY_CONNECTED = "Successfully connected."
    CURRENT_MODE = "Current mode: {}"


class WARN(Enum):
    NO_DATA_FOUND = "No data found for {}"
    CURRENT_MODE = "Current mode: {}"


class ERROR(Enum):
    SYMBOL_NOT_FOUND = "Symbol not found in the dataset or the dataset is empty."
    ERROR_FETCHING_DATA = "Error fetching data or data is empty."
    ERROR_RETRIEVING_APPLICATION_SETTINGS = "An error occurred retrieving Application Settings: {}"
    ORDER_PLACEMENT_FAILED = "Order placement failed: {}"
    ERROR_PLACING_GTT_OCO_ORDER = "Error placing gtt oco order: {}"
    AN_ERROR_OCCURRED = "An error occurred: {}"
    CONNECTION_CLOSED = "Connection closed: {} - {}"
    CONNECTION_ERROR = "Connection error: {} - {}"
    RECONNECT_FAILED = "Reconnect failed."
    CURRENT_MODE = "Current mode: {}"
