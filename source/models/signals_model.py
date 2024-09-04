# source/models/signals_model.py

from source.models.BaseModel import BaseModel


class SignalsModel(BaseModel):
    def __init__(
        self,
        signal_id=None,
        signal_type=None,
        signal_symbol=None,
        signal_exchange=None,
        signal_token=None,
        strategy_id=None,
        trade_type=None,
        order_id=None,
        order_type=None,
        is_active=None,
        is_complete=None,
        created_date=None
    ):
        super().__init__()

        self.signal_id = signal_id
        self.signal_type = signal_type
        self.signal_symbol = signal_symbol
        self.signal_exchange = signal_exchange
        self.signal_token = signal_token
        self.strategy_id = strategy_id
        self.trade_type = trade_type
        self.order_id = order_id
        self.order_type = order_type
        self.is_active = is_active
        self.is_complete = is_complete
        self.created_date = created_date
