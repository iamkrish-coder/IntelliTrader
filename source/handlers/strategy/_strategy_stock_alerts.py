# _strategy_stock_alerts.py

import boto3
import uuid
from source.constants.constants import *
from source.enumerations.enums import *
from source.shared.logging_utils import *
from source.queue.awsPublisher import aws_publish

class StrategyStockAlerts:
    def __init__(self, modules, alerts, parameters):
        self.modules = modules
        self.alerts = alerts
        self.parameters = parameters
        self.sqs = boto3.client('sqs', region_name=REGION_NAME)

    def initialize(self):
        return self.publish_message()

    def publish_message(self):
        # Iterate through the alerts
        for alert in self.alerts:
            exchange, symbol, token = alert.split(",")         
            # Create the message using f-strings
            message = f"{exchange.strip()}, {symbol.strip()}, {token.strip()}"
            print(message)
            
            # Publish message to the queue
            response = aws_publish(self.sqs, message, f'{AWS_SQS.URL.value}/{AWS_SQS.ACCOUNT_ID.value}/{Queues.Queue1.value}')
            log_info(f"Message Published: {response['MessageId']}")
        return response