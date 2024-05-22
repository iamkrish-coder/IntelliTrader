# handlers/strategy

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *

class StrategyMarketAnalysis:
    def __init__(self, modules, parameters):
        self.modules           = modules
        self.parameters        = parameters
        self.market_params     = self.parameters.get('runtime_params.market_trade')
        self.market_indices    = self.parameters.get('market_params.market_indices')
        self.market_sentiment  = None
    
    def initialize(self):
        return self.analyze_market_sentiments()

    def get_local_market_sentiment(self):
        log_info("Analyzing local market sentiment ...COMPLETE!")
        return True if self.market_sentiment == Market_Sentiment.POSITIVE else False if self.market_sentiment == Market_Sentiment.NEGATIVE else None
    
    def get_global_market_sentiment(self):
        log_info("Analyzing global market sentiment ...COMPLETE!")
        return True if self.market_sentiment == Market_Sentiment.POSITIVE else False if self.market_sentiment == Market_Sentiment.NEGATIVE else None

    # Analyze market sentiment and determine strategy recommendations:
    def analyze_market_sentiments(self):       
        self.trend = None
        
        if self.market_params:
            local_market_sentiment = self.get_local_market_sentiment()
            global_market_sentiment = self.get_global_market_sentiment()

        if local_market_sentiment and global_market_sentiment:
            self.trend = "Market Sentiment: Bullish"
        elif local_market_sentiment and not global_market_sentiment:    
            self.trend = "Market Sentiment: Sideways"
        else:
            self.trend = "Market Sentiment: Bearish"
        
        log_info(f"{self.trend}")    
        return self.trend


