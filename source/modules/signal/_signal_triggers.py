# handlers/signal
import time

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
        for alert in self.alerts['results']:
            exchange, symbol, token = alert.split(", ")
            current_time = datetime.datetime.now()
            formatted_datetime = current_time.strftime("%y%m%d%H%M")
            signal_id = f"{symbol[:3]}{formatted_datetime}"
            exchange_enum = Exchange[exchange]

            dataset = {
                "signal_id": signal_id,
                "signal_strategy": self.alerts['strategy_id'],
                "signal_type": self.alerts['signal_type'],
                "signal_exchange": exchange_enum.value,
                "signal_symbol": symbol,
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
