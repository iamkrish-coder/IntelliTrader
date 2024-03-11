# handlers/strategy

import boto3
import uuid
import time
from source.constants.constants import *
from source.enumerations.enums import *
from source.shared.logging_utils import *
from source.queue.awsPublisher import aws_publish

class StrategyPublisher:
    def __init__(self, modules, alerts, parameters):
        self.modules = modules
        self.alerts = alerts
        self.parameters = parameters
        self.sqs = boto3.client('sqs', region_name=REGION_NAME)
        self.retry_count = 3
        self.retry_interval = 15  # in seconds
        
    def initialize(self):
        return self.publish_to_queue()

    def publish_to_queue(self):
        for attempt in range(1, self.retry_count + 1):
            successfully_published = []
            
            for alert in self.alerts:
                exchange, symbol, token = alert.split(",")         
                message = f"{exchange.strip()}, {symbol.strip()}, {token.strip()}"
        
                try:
                    # Publish message to the queue
                    response = aws_publish(self.sqs, message, f'{AWS_SQS.URL.value}/{AWS_SQS.ACCOUNT_ID.value}/{Queues.Queue1.value}')
            
                    # Check if the response contains a message ID
                    if 'MessageId' in response:
                        log_info(f"Message Published: {response['MessageId']}")
                        successfully_published.append(message)  # Add message to successfully published list
                    else:
                        log_error("Failed to get Message ID in response.")
                except Exception as e:
                    log_error(f"Error publishing message: {str(e)}")
        
                time.sleep(1)
        
            # Check if all messages are successfully published
            if len(successfully_published) == len(self.alerts):
                log_info("All messages published successfully.")
                break
        
            if attempt < self.retry_count:
                log_info(f"Retry {attempt} of publishing messages. Waiting for {self.retry_interval} seconds.")
                time.sleep(self.retry_interval)
        else:
            log_error("Failed to publish all messages after retries.")