# source/shared/logging_utils.py

import logging
import colorlog
import os
from source.constants.constants import *
from source.enumerations.enums import *
from source.enumerations.resource_string_enums import INFO, ERROR, WARN
from source.language.resources_EN_IN import ResourceStrings

def configure_logging():
    """Configures logging with a console handler (optional)."""

    root_logger = logging.getLogger()
    root_logger.setLevel(logging.INFO)

    # Colored console handler with additional configuration (optional)
    console_handler = colorlog.StreamHandler()
    console_handler.setLevel(logging.INFO)
    formatter = colorlog.ColoredFormatter(
        '%(log_color)s%(asctime)s %(levelname)-8s [%(lineno)d]: %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    console_handler.setFormatter(formatter)
    root_logger.addHandler(console_handler)

    # Create and configure file handlers for each task logger
    database_logger = logging.getLogger(DATABASE_LOGGER_NAME)
    database_handler = logging.FileHandler(os.path.join(OUTPUT_PATH, 'database.log'))
    database_handler.setLevel(logging.DEBUG)
    plain_formatter = logging.Formatter('%(asctime)s %(levelname)-8s [%(lineno)d]: %(message)s')
    database_handler.setFormatter(plain_formatter)
    database_logger.addHandler(database_handler)

    strategy_logger = logging.getLogger(STRATEGY_LOGGER_NAME)
    strategy_handler = logging.FileHandler(os.path.join(OUTPUT_PATH, 'strategy.log'))
    strategy_handler.setLevel(logging.DEBUG)
    plain_formatter = logging.Formatter('%(asctime)s %(levelname)-8s [%(lineno)d]: %(message)s')
    strategy_handler.setFormatter(plain_formatter)
    strategy_logger.addHandler(strategy_handler)

    action_logger = logging.getLogger(ACTION_LOGGER_NAME)
    action_handler = logging.FileHandler(os.path.join(OUTPUT_PATH, 'actions.log'))
    action_handler.setLevel(logging.DEBUG)
    plain_formatter = logging.Formatter('%(asctime)s %(levelname)-8s [%(lineno)d]: %(message)s')
    action_handler.setFormatter(plain_formatter)
    action_logger.addHandler(action_handler)

    monitoring_logger = logging.getLogger(MONITORING_LOGGER_NAME)
    monitoring_handler = logging.FileHandler(os.path.join(OUTPUT_PATH, 'monitoring.log'))
    monitoring_handler.setLevel(logging.DEBUG)
    plain_formatter = logging.Formatter('%(asctime)s %(levelname)-8s [%(lineno)d]: %(message)s')
    monitoring_handler.setFormatter(plain_formatter)
    monitoring_logger.addHandler(monitoring_handler)

    # General IntelliTrader log handler
    intelliTrader_handler = logging.FileHandler(os.path.join(OUTPUT_PATH, 'intelliTrader.log'))
    intelliTrader_handler.setLevel(logging.INFO)
    plain_formatter = logging.Formatter('%(asctime)s %(levelname)-8s [%(lineno)d]: %(message)s')
    intelliTrader_handler.setFormatter(plain_formatter)
    root_logger.addHandler(intelliTrader_handler)

def get_message(resource_string):
    """Retrieves message from ResourceStrings or returns the input string if not found.

    Args:
        resource_string (str | source.enumerations.messages.Info_Messages |
                          source.enumerations.messages.Error_Messages |
                          source.enumerations.messages.Warning_Messages):
            The enum member representing the message you want to retrieve or a custom string message.

    Returns:
        str: The message string (either from ResourceStrings or the input string).
    """

    if isinstance(resource_string, (INFO, ERROR, WARN)):
        message = ResourceStrings.get(resource_string)
        return message or resource_string.value
    else:
        # logging.warning(f"get_message received a non-enum string: {resource_string}")
        return resource_string


def log_info(message_enum, *args, **kwargs):
    if kwargs:
        formatted_message = ResourceStrings.get(message_enum)    
        if formatted_message:
            formatted_message = formatted_message.format(**kwargs)
        else:
            formatted_message = get_message(message_enum)
    elif args:
        formatted_message = ResourceStrings.get(message_enum)            
        if formatted_message:
            formatted_message = formatted_message.format(*args)
        else:
            formatted_message = get_message(message_enum)
    else:
        formatted_message = get_message(message_enum)
        
    logger = logging.getLogger(__name__)
    logger.info(formatted_message)


def log_error(message_enum, *args, **kwargs):
    if kwargs:
        formatted_message = ResourceStrings.get(message_enum)    
        if formatted_message:
            formatted_message = formatted_message.format(**kwargs)
        else:
            formatted_message = get_message(message_enum)
        
    elif args:
        formatted_message = ResourceStrings.get(message_enum)    
        if formatted_message:
            formatted_message = formatted_message.format(*args)
        else:
            formatted_message = get_message(message_enum)
    else:
        formatted_message = get_message(message_enum)
        
    logger = logging.getLogger(__name__)
    logger.error(formatted_message)


def log_warn(message_enum, *args, **kwargs):
    if kwargs:
        formatted_message = ResourceStrings.get(message_enum)    
        if formatted_message:
            formatted_message = formatted_message.format(**kwargs)
        else:
            formatted_message = get_message(message_enum)
    elif args:
        formatted_message = ResourceStrings.get(message_enum)            
        if formatted_message:
            formatted_message = formatted_message.format(*args)
        else:
            formatted_message = get_message(message_enum)
    else:
        formatted_message = get_message(message_enum)
        
    logger = logging.getLogger(__name__)
    logger.warning(formatted_message)

