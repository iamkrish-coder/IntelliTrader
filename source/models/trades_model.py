# source/models/trades_model.py

from source.models.BaseModel import BaseModel


class TradesModel(BaseModel):
    def __init__(
        self,
        trade_id=None,
        trade_type=None,
        trade_symbol=None,
        trade_token=None,
        signal_id=None,
        strategy_id=None,
        entry_price=None,
        position_size=None,
        stop_loss=None,
        take_profit=None,
        trailing_stop_loss=None,
        trailing_profit=None,
        exit_price=None,
        trade_status=None,
        profit_loss=None,
        created_date=None,
        modified_date=None,
    ):
        super().__init__()

        self.trade_id = trade_id
        self.trade_type = trade_type
        self.trade_symbol = trade_symbol
        self.trade_token = trade_token
        self.signal_id = signal_id
        self.strategy_id = strategy_id
        self.entry_price = entry_price
        self.position_size = position_size
        self.stop_loss = stop_loss
        self.take_profit = take_profit
        self.trailing_stop_loss = trailing_stop_loss
        self.trailing_profit = trailing_profit
        self.exit_price = exit_price
        self.trade_status = trade_status
        self.profit_loss = profit_loss
        self.created_date = created_date
        self.modified_date = modified_date

