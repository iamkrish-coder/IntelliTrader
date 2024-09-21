# IntelliTrader\backend\modules\strategy\BaseStrategy.py

from abc import ABC, abstractmethod
from ..shared.shared_functions import SharedFunctions
from sys import modules
from backend.constants.const import *
from backend.enumerations.enums import *
from backend.utils.logging_utils import *


class BaseStrategy(ABC, SharedFunctions):
    def __init__(self, connection, modules):
        super().__init__(connection, modules)
        self.connection = connection
        self.modules = modules

    @abstractmethod
    def initialize(self):
        raise NotImplementedError("Subclasses must implement this method")

    def prepare_request_parameters(self, event, table, model, dataset, projection=[], filters={}):
        attributes = None
        config = self.database.table_configuration[table]
        if model:
            attributes = model(**dataset).convert_table_rows_to_dict(config)
        return {
            "event": event,
            "table": table,
            "config": config,
            "data": {
                "attributes": attributes,
                "projection": projection,
                "filters": filters,
            },
        }

    def database_request(self, request):
        log_info(f"Requesting AWS DynamoDB...")
        return self.database.manage_table_records(request)