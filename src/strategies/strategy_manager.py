# strategies/strategy_manager.py
import strategies

class StrategyManager:
    def __init__(self, connection, strategy, modules, configuration):
        self.connection = connection
        self.strategy_name = strategy
        self.modules = modules
        self.configuration = configuration
        
    def load(self, dataset):
        # Dynamically load the strategy class
        strategy_class = getattr(strategies, f"{self.strategy_name.capitalize()}Strategy", strategies.DefaultStrategy)
        strategy_instance = strategy_class(self.connection)

        # Execute the strategy
        strategy_instance.execute_strategy(dataset)
