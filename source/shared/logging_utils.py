# source/shared/logging_utils.py

import logging
import colorlog
from source.enumerations.resource_string_enums import INFO, ERROR, WARN
from source.language.resource_strings import ResourceStrings

def configure_logging():
    # Configure root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.INFO)

    # Colored console handler with additional configuration
    console_handler = colorlog.StreamHandler()
    console_handler.setLevel(logging.INFO)
    formatter = colorlog.ColoredFormatter(
        '%(log_color)s%(asctime)s %(levelname)-8s %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    console_handler.setFormatter(formatter)

    # Add console handler to root logger
    root_logger.addHandler(console_handler)


    # File handler (uncomment to log to a file)
    file_handler = logging.FileHandler('your_logfile.log')
    file_handler.setLevel(logging.DEBUG)  # Adjust level as needed
    file_handler.setFormatter(formatter)

    # Add file handler to root logger
    root_logger.addHandler(file_handler)

    return root_logger


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
        formatted_message = formatted_message.format(**kwargs)
    elif args:
        formatted_message = ResourceStrings.get(message_enum)            
        formatted_message = formatted_message.format(*args)
    else:
        formatted_message = get_message(message_enum)
        
    logger = logging.getLogger(__name__)
    logger.info(formatted_message)

def log_error(message_enum, *args, **kwargs):
    if kwargs:
        formatted_message = ResourceStrings.get(message_enum)    
        formatted_message = formatted_message.format(**kwargs)
    elif args:
        formatted_message = ResourceStrings.get(message_enum)            
        formatted_message = formatted_message.format(*args)
    else:
        formatted_message = get_message(message_enum)
        
    logger = logging.getLogger(__name__)
    logger.error(formatted_message)


def log_warn(message_enum, *args, **kwargs):
    if kwargs:
        formatted_message = ResourceStrings.get(message_enum)    
        formatted_message = formatted_message.format(**kwargs)
    elif args:
        formatted_message = ResourceStrings.get(message_enum)            
        formatted_message = formatted_message.format(*args)
    else:
        formatted_message = get_message(message_enum)
        
    logger = logging.getLogger(__name__)
    logger.warning(formatted_message)

