# source/shared/logging_utils.py

import logging
import colorlog
import os
from ..constants.const import *
from ..enumerations.enums import *
from ..enumerations.resource_string_enums import INFO, ERROR, WARN
from ..language.resources_EN_IN import ResourceStrings


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


def log_message(message, level, *args, **kwargs):
    """
    Logs a message with the specified level.

    Args:
    message: An enumeration value representing the message key.
    level: The logging level (e.g., logging.INFO, logging.ERROR).
    *args: Positional arguments for message formatting.
    **kwargs: Keyword arguments for message formatting.
    """
    formatted_message = ResourceStrings.get(message)
    if not formatted_message:
        formatted_message = message
    if kwargs:
        formatted_message = formatted_message.format(**kwargs)
    elif args:
        if "%" in formatted_message:
            formatted_message = formatted_message % args
        else:
            formatted_message = formatted_message.format(*args)
    else:
        formatted_message = get_message(message)

    logger = logging.getLogger(__name__)
    logger.log(level, formatted_message)


def log_info(message, *args, **kwargs):
    """Logs a message with INFO level."""
    log_message(message, logging.INFO, *args, **kwargs)


def log_error(message, *args, **kwargs):
    """Logs a message with ERROR level."""
    log_message(message, logging.ERROR, *args, **kwargs)


def log_warn(message, *args, **kwargs):
    """Logs a message with WARNING level."""
    log_message(message, logging.WARNING, *args, **kwargs)
