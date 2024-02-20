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
            live_trade = configuration.get("live_trade").lower()
            virtual_trade = configuration.get("virtual_trade").lower()
            
            strategy_id = int(configuration.get("strategy"))
            strategy_enum = Strategy(strategy_id)
            strategy_enum_name = strategy_enum.name
            strategy_class_name = self.modules["help"].convert_enum_to_class_name(strategy_enum_name)
            strategy_class = getattr(strategies, strategy_class_name, None)
            
            if strategy_class:
                # If the strategy requires additional parameters, check and pass them
                params_key = f"strategy_{strategy_enum.value}_params"
                strategy_params = configuration.get(params_key, {})

                # Instantiate the strategy with connection and parameters
                strategy_instance = strategy_class(self.connection, self.modules, **strategy_params)
                
                # Strategy Execution
                if live_trade == 'true':
                    # Load Default Configs
                    live_trade_params = configuration.get("virtual_trade_params")              
                    market_params = configuration.get("marktet_params")
                    
                    # Instantiate Strategy Method
                    strategy_instance.execute_live_strategy(live_trade_params, market_params)
                    
                elif virtual_trade == 'true' and live_trade == 'false':
                    # Load Default Configs
                    virtual_trade_params = configuration.get("virtual_trade_params")              
                    market_params = configuration.get("marktet_params")
                    
                    # Instantiate Strategy Method
                    strategy_instance.execute_virtual_strategy(virtual_trade_params, market_params)      
                    
                else:
                    logging.info("No Virtual trade or Live configuration found.")       
            else:
                logging.info(f"Strategy class {strategy_class_name} not found in the strategies module.")

        except Exception as e:
            logging.info(f"An error occurred: {e}")