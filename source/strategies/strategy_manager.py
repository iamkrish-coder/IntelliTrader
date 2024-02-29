# strategies/strategy_manager.py
import logging
import source.strategies as strategies
from source.enumerations.enums import Strategy
    
class StrategyManager:
    def __init__(self, connection, modules):
        self.connection = connection
        self.modules = modules
        
    def initialize_strategy(self, configuration):
        try:
            live_trade          = configuration.get("live_trade")
            virtual_trade       = configuration.get("virtual_trade")
            strategy_id         = int(configuration.get("strategy"))
            strategy_enum       = Strategy(strategy_id)
            strategy_enum_name  = strategy_enum.name
            strategy_class_name = self.modules["help"].convert_enum_to_class_name(strategy_enum_name)
            strategy_class      = getattr(strategies, strategy_class_name, None)
            
            if strategy_class:

                # Instantiate the strategy with connection and parameters
                strategy_instance = strategy_class(self.connection, self.modules)
                
                # Strategy Execution
                if live_trade == True:
           
                    live_trade          = configuration.get("live_trade")
                    live_trade_params   = configuration.get("live_trade_params") if live_trade else None
                    market_trade        = configuration.get("market_trade")
                    market_trade_params = configuration.get("market_trade_params") if market_trade else None
                    strategy_params     = configuration.get(f"strategy_{strategy_enum.value}_params")
                    common_params       = configuration.get(f"common_params")

                    # Instantiate Strategy Method
                    strategy_instance.execute_live_strategy(live_trade_params, market_trade_params, strategy_params, common_params)
                    
                elif virtual_trade == True and live_trade == False:

                    virtual_trade        = configuration.get("virtual_trade")
                    virtual_trade_params = configuration.get("virtual_trade_params") if virtual_trade else None
                    market_trade         = configuration.get("market_trade")
                    market_trade_params  = configuration.get("market_trade_params") if market_trade else None
                    strategy_params      = configuration.get(f"strategy_{strategy_enum.value}_params")
                    common_params       = configuration.get(f"common_params")
                    
                    # Instantiate Strategy Method
                    strategy_instance.execute_virtual_strategy(virtual_trade_params, market_trade_params, strategy_params, common_params)
                    
                else:
                    logging.info("No Virtual trade or Live configuration found.")       
            else:
                logging.info(f"Strategy class {strategy_class_name} not found in the strategies module.")

        except Exception as e:
            logging.info(f"An error occurred: {e}")