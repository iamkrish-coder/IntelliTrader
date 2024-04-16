# source/models/strategies_model.py

from source.models.BaseModel import BaseModel


class StrategiesModel(BaseModel):
    def __init__(
        self,
        strategy_id=None,
        strategy_name=None,
        strategy_description=None,
        created_date=None,
    ):
        super().__init__()

        self.strategy_id = strategy_id
        self.strategy_name = strategy_name
        self.strategy_description = strategy_description
        self.created_date = created_date
