# handlers/actions
import time

from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *
from ...utils.caching_utils import *
from ...models.signals_model import SignalsModel


class ActionTriggers:
    def __init__(self, connection, modules, parameters, database, alerts):
        self.connection = connection
        self.modules = modules
        self.parameters = parameters
        self.database = database
        self.alerts = alerts

    def initialize(self):
        return self.triggers()

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
            }
        }

    def database_request(self, request):
        log_info(f"Requesting AWS DynamoDB...")
        self.database.manage_table_records(request)
        return True

    def triggers(self):
        for alert in self.alerts['results']:
            exchange, symbol, token = alert.split(", ")
            current_time = datetime.datetime.now()
            formatted_datetime = current_time.strftime("%y%m%d%H%M")
            signal_id = f"{symbol[:3]}{formatted_datetime}"

            dataset = {
                "signal_id": signal_id,
                "signal_type": self.alerts['signal_type'],
                "strategy_id": self.alerts['strategy_id'],
                "signal_symbol": symbol,
                "signal_exchange": exchange,
                "signal_token": token,
                "is_active": True,
                "is_complete": False,
                "created_date": time.strftime("%Y-%m-%d %H:%M:%S")
            }
            save_alert_signals = self.prepare_request_parameters(
                event=Events.PUT.value,
                table=Tables.TABLE_SIGNALS.value,
                model=SignalsModel,
                dataset=dataset
            )
            self.database_request(save_alert_signals)
