# handlers/actions

import asyncio
import datetime
import json
import time
import math
import boto3
from time import sleep
from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *
from ...utils.caching_utils import *
from ...aws.sqs.aws_sqs_manager import SQSManager
from .BaseAction import BaseAction

class ActionProcessAlerts(BaseAction):
    def __init__(self, connection, modules, parameters, database, alerts):
        super().__init__(connection, modules)
        self.modules = modules
        self.parameters = parameters
        self.database = database
        self.alerts = alerts
        self.object_sqs_manager = SQSManager()
        self.queue_type = self.parameters.get('runtime_params.queue_type')
        self.strategy_id = self.parameters.get('strategy_params.strategy_id')
        self.trading_token = None
        self.trading_symbol = None
        self.trading_exchange = None
        self.monitored_stocks = []
        self.is_stock_monitored = False

    def initialize(self):
        return self.process_alerts()

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
        return self.database.manage_table_records(request)

    def delete_message_from_queue(self, receipt_handle):
        if self.strategy_id is None:
            log_error("Strategy ID is missing from parameters.")
            return None

        queue_arn, queue_name, queue_url = self.generate_aws_sqs_queue_details(self.strategy_id, self.queue_type)
        try:
            arguments = {
                "queue_url": queue_url,
                "receipt_handle": receipt_handle
            }
            delete_message = self.object_sqs_manager.get_action("delete_message_queue", **arguments)
            response = delete_message.execute()
            if response is None:
                log_info("No messages available in queue.")
                return None
            else:
                return response
        except Exception as error:
            log_error(f"Error deleting message from Queue: {str(error)}")
        return False

    def process_alerts(self):
        if self.alerts is None:
            log_error("No Alert Messages to Process ...Exiting")
            return None

        messages = self.alerts.get('Messages', [])
        if messages:
            for i, message in enumerate(messages, start=1):
                self.is_stock_monitored = True
                message_body = json.loads(message['Body'])
                message_content = message_body.get('Message')
                self.trading_exchange, self.trading_symbol, self.trading_token = message_content.split(', ')
                self.monitored_stocks.append((self.trading_exchange.strip(), self.trading_symbol.strip(), self.trading_token.strip()))
                receipt_handle = message['ReceiptHandle']
                # self.delete_message_from_queue(receipt_handle)

            log_info(f"\nStock Alerts Received from Queue: {self.monitored_stocks}\n")
        else:
            log_warn("\nNo Alerts available to process in Queue.\n")

        return self.monitored_stocks
