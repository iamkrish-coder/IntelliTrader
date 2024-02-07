# strategies/strategy_manager.py
import logging
import src.strategies as strategies
from src.enumerations.enums import Strategy

class StrategyManager:
    def __init__(self, connection, modules):
        self.connection = connection
        self.modules = modules
        
    def initialize_strategy(self, configuration):
        try:         
            auto_trade = configuration.get("auto_trade").lower()
            auto_virtual = configuration.get("virtual").lower()
            
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
                
                # Execute the strategy
                if auto_trade == 'true':
                    strategy_instance.execute_live_strategy()                   # Live Trade
                elif auto_virtual == 'true' and auto_trade == 'false':
                   auto_params = configuration.get("virtual_params")           # Virtual Trade
                   strategy_instance.execute_virtual_strategy(auto_params)               
                else:
                    logging.info("No auto trade or virtual configuration found.")     # No Trade
            else:
                logging.info(f"Strategy class {strategy_class_name} not found in the strategies module.")

        except Exception as e:
            logging.info(f"An error occurred: {e}")