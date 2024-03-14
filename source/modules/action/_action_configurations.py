# handlers/actions

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *

class ActionConfigurations:
    def __init__(self, configuration):
        self.configuration = configuration

    def initialize(self):
        return self.manage_configurations()
        
    def manage_configurations(self):
        try:
            debugger = self.configuration.get("debugger")
            live_trade = self.configuration.get("live_trade")
            virtual_trade = self.configuration.get("virtual_trade")
            market_trade = self.configuration.get("market_trade")

            strategy_id = int(self.configuration.get("strategy"))
            strategy_enum = Strategy(strategy_id)
            strategy_name = strategy_enum.name

            # Initialize Settings
            settings = {}
            
            settings['main_params'] = {
                    "debugger": debugger,
                    "live_trade": live_trade,
                    "virtual_trade": virtual_trade,
                    "market_trade": market_trade
                }

            if live_trade:
                settings['trade_params'] = self.configuration.get("live_trade_params")
            elif virtual_trade and not live_trade:
                settings['trade_params'] = self.configuration.get("virtual_trade_params")
            
            if market_trade:
                settings['market_params'] = self.configuration.get("market_trade_params")
                    
            settings['strategy_params'] = self.configuration.get(f"strategy_{strategy_enum.value}_params")
            settings['common_params']   = self.configuration.get("common_trade_params")

            return settings

        except Exception as e:
            log_info(f"An error occurred retrieving Application Settings: {e}")
            return None
