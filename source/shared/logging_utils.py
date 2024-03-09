import logging

def configure_logging():
    # Configure root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.INFO)

    # Define a custom formatter
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s', datefmt='%Y-%m-%d %H:%M:%S')

    # Create console handler with colored output
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(formatter)

    # Add console handler to root logger
    root_logger.addHandler(console_handler)

    return root_logger

def log_info(message):
    logger = logging.getLogger(__name__)
    logger.info(message)

def log_error(message):
    logger = logging.getLogger(__name__)
    logger.error(message)

def log_warn(message):
    logger = logging.getLogger(__name__)
    logger.warning(message)
