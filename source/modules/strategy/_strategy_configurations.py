# handlers/strategy

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *

class StrategyConfigurations:
    def __init__(self, configuration):
        self.configuration = configuration

    def initialize(self):
        return self.manage_configurations()
        
    def manage_configurations(self):
        try:
            strategy_id = self.configuration.get("strategy")

            # Initialize Settings
            config = self.configuration
            settings = {}

            # Store non-dict top-level items in main_params
            main_params = {key: value for key, value in config.items() if not isinstance(value, dict)}
            settings['runtime_params'] = main_params

            # Handle trade and market params based on trade flags
            if config['live_trade']:
                settings['trade_params'] = config['live_trade_params']
            elif config['virtual_trade'] and not config['live_trade']:
                settings['trade_params'] = config['virtual_trade_params']

            if config['market_trade']:
                settings['market_params'] = config['market_trade_params']

            # Retrieve strategy params dynamically (assuming strategy_id exists)
            strategy_param_key = f"strategy_{strategy_id}_params"
            settings['strategy_params'] = config.get(strategy_param_key)

            # Common params (assuming it's always a dict)
            settings['common_params'] = config.get("common_trade_params", {})
            
            return settings

        except Exception as error:
            log_info(f"An error occurred retrieving Application Settings: {error}")
            return None

