# handlers/actions

import asyncio
import datetime
import time
import math
import boto3
from time import sleep
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *


class ActionProcessAlerts:
    def __init__(self, modules, alerts, parameters):
        self.modules = modules
        self.alerts = alerts
        self.parameters = parameters
        self.sqs = boto3.client(SQS, region_name=REGION_NAME)  
        self.monitored_stocks = []
        self.is_stock_monitored = False
        
    def initialize(self):
        return self.process_alerts()

    def delete_message_from_queue(self, receipt_handle):
        try:
            self.sqs.delete_message(
                QueueUrl=f'{AWS_SQS.URL.value}/{AWS_SQS.ACCOUNT_ID.value}/{Queues.Queue1.value}',
                ReceiptHandle=receipt_handle
            )
            log_info(f"Deleted message from Queue: {self.message}")
        except Exception as e:
            log_error(f"Error deleting message from Queue: {str(e)}")

    def process_alerts(self):
        if self.alerts is None:
            log_error("No Alert Messages to Process ...Exiting")
            return None

        self.messages = self.alerts.get('Messages', [])
        if self.messages:
            print(f"\nAlerts Received from Queue: {self.alerts}\n")

            for i, message in enumerate(self.messages, start=1):
                self.is_stock_monitored = True
                self.message = message['Body']
                self.receipt_handle = message['ReceiptHandle']
                self.trading_exchange, self.trading_symbol, self.trading_token = self.message.split(',')
                self.monitored_stocks.append((self.trading_exchange.strip(), self.trading_symbol.strip(), self.trading_token.strip()))
                self.delete_message_from_queue(self.receipt_handle)

        else:
            print("\nNo Alerts available to process in Queue.\n")

        return self.monitored_stocks