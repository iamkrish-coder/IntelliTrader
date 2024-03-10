# _strategy_parameters.py

class StrategyParameters:
    def __init__(self, kwargs):
        self.params = [
            kwargs.get('main_params'),            
            kwargs.get('trade_params'),
            kwargs.get('market_params'),
            kwargs.get('strategy_params'),
            kwargs.get('common_params')
        ]
        
    def initialize(self):
        self.set_parameters()

    def set_parameters(self):
        
        main_params     = self.params[0] if self.params else {}
        trade_params    = self.params[1] if len(self.params) > 1 else {}
        market_params   = self.params[2] if len(self.params) > 2 else {}
        strategy_params = self.params[3] if len(self.params) > 3 else {}
        common_params   = self.params[4] if len(self.params) > 4 else {}

        self.debugger      = main_params.get('debugger', None)
        self.live_trade    = main_params.get('live_trade', None)
        self.virtual_trade = main_params.get('virtual_trade', None)
        self.market_trade  = main_params.get('market_trade', None)
                
        self.historical_data_subscription = trade_params.get('historical_data_subscription', None)
        self.max_allocation               = trade_params.get('max_allocation', None)
        self.quantity                     = trade_params.get('quantity', None)
        self.tpsl_method                  = trade_params.get('tpsl_method', None)
        self.target                       = trade_params.get('target', None)
        self.stop_loss                    = trade_params.get('stop_loss', None)
        self.trail_profit                 = trade_params.get('trail_profit', None)
        self.trail_stop_loss              = trade_params.get('trail_stop_loss', None)
        self.variety                      = trade_params.get('variety', None)
        self.order_type                   = trade_params.get('order_type', None)
        self.product                      = trade_params.get('product', None)
        self.validity                     = trade_params.get('validity', None)

        self.market_indices = market_params.get('market_indices', {})
        # self.order_params = market_params.get('order_params', {})

        self.exchange        = strategy_params.get('exchange', None)
        self.symbol          = strategy_params.get('symbol', None)
        self.timeframe       = strategy_params.get('timeframe', None)
        self.strategy_type   = strategy_params.get('strategy_type', None)
        self.ticker          = strategy_params.get('ticker', None)
        self.ticker_mode     = strategy_params.get('ticker_mode', None)
        self.equity_trading  = strategy_params.get('equity_trading', None)
        self.option_trading  = strategy_params.get('option_trading', None)
        self.futures_trading = strategy_params.get('futures_trading', None)
        self.strike          = strategy_params.get('strike', [])
        self.expiry          = strategy_params.get('expiry', None)
        self.offset          = strategy_params.get('offset', None)

        self.prettier = common_params.get('prettier_print')


    def get_parameters(self):
        return {key: value for key, value in vars(self).items() if not key.startswith('__') and not callable(key)}