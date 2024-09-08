# source/controllers/BaseController.py

from abc import ABC, abstractmethod
from source.modules.shared.shared_functions import SharedFunctions
from ..constants.const import *
from ..enumerations.enums import *
from ..utils.logging_utils import *

class BaseController(ABC, SharedFunctions):
    def __init__(self, connection, modules, configuration, database):
        self.connection = connection
        self.modules = modules
        self.configuration = configuration
        self.database = database 

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