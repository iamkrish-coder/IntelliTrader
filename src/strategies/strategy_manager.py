# strategies/strategy_manager.py
import src.strategies as strategies
from src.enumerations.enums import Strategy

class StrategyManager:
    def __init__(self, connection, strategy, modules):
        self.connection = connection
        self.strategy_name = strategy
        self.modules = modules
        
    def load_strategy(self, dataset):
        try:
            strategy_enum = getattr(Strategy, self.strategy_name.upper())  
            strategy_class_name = strategy_enum.value.strip() 
            strategy_class = getattr(strategies, strategy_class_name, None)
            
            if strategy_class is None:
                print(f"Strategy class '{strategy_class_name}' not found in the strategies module.")
            else:
                strategy_instance = strategy_class(self.connection)
                strategy_instance.execute_strategy(dataset)
        except Exception as e:
            print(f"An error occurred: {e}")
