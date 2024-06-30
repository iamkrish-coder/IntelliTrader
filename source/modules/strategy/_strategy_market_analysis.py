# handlers/strategy

from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *


class StrategyMarketAnalysis:
    def __init__(self, modules, parameters):
        self.trend = None
        self.global_market_sentiment = None
        self.local_market_sentiment = None
        self.modules = modules
        self.parameters = parameters
        self.market_params = self.parameters.get('runtime_params.market_trade')
        self.market_indices = self.parameters.get('market_params.market_indices')
        self.market_sentiment = None

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
        if self.market_params:
            self.local_market_sentiment = self.get_local_market_sentiment()
            self.global_market_sentiment = self.get_global_market_sentiment()

        if self.local_market_sentiment and self.global_market_sentiment:
            self.trend = "Market Sentiment: Bullish"
        elif self.local_market_sentiment and not self.global_market_sentiment:
            self.trend = "Market Sentiment: Sideways"
        else:
            self.trend = "Market Sentiment: Bearish"

        log_info(f"{self.trend}")
        return self.trend
