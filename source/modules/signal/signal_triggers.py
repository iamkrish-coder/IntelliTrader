# handlers/signal
import time
from time import sleep

from .BaseSignal import BaseSignal
from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *
from ...utils.caching_utils import *
from ...models.signals_model import SignalsModel


class SignalTriggers(BaseSignal):
    def __init__(self, connection, modules, parameters, database, alerts):
        self.connection = connection
        self.modules = modules
        self.parameters = parameters
        self.database = database
        self.alerts = alerts

    def initialize(self):
        return self.triggers()

    def triggers(self):
        signal_strategy = self.alerts['strategy_id']
        signal_type = self.alerts['signal_type']

        for alert in self.alerts['results']:
            signal_exchange, signal_symbol, signal_token = alert.split(", ")
            signal_id = self.generate_table_uid(TABLE_SIGNAL)
            exchange_enum = Exchange[signal_exchange]
            signal_exchange = exchange_enum.value

            dataset = {
                "signal_id": signal_id,
                "signal_strategy": signal_strategy,
                "signal_type": signal_type,
                "signal_exchange": signal_exchange,
                "signal_symbol": signal_symbol,
                "signal_token": signal_token,
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
            sleep(1)
