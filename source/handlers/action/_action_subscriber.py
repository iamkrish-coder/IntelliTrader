# handlers/actions

import time
import boto3
from source.constants.constants import *
from source.enumerations.enums import *
from source.shared.logging_utils import *
from source.queue.awsSubscriber import aws_sqs_subscribe

class ActionSubscriber:
    def __init__(self, modules, parameters):
        self.modules = modules
        self.parameters = parameters
        self.sqs = boto3.client(SQS, region_name=REGION_NAME)
        
    def initialize(self):
        return self.subscribe()

    def get_queue_name(self, strategy_id):
        # Create a mapping between strategy IDs and queue names
        strategy_id_enum = Strategy[f"algorithm_{strategy_id}"]
        strategy_queue_mapping = {
            Strategy.algorithm_1: Queues.Queue1,
            Strategy.algorithm_2: Queues.Queue2,
            Strategy.algorithm_3: Queues.Queue3,
            Strategy.algorithm_4: Queues.Queue4,
            Strategy.algorithm_5: Queues.Queue5,
            Strategy.algorithm_6: Queues.Queue6
        }

        if strategy_id_enum in strategy_queue_mapping:
            
            return strategy_queue_mapping[strategy_id_enum].value
        else:
            return None 

    def subscribe(self):
        strategy_id = self.parameters.get('strategy_id')
        if strategy_id is None:
            log_error("Strategy ID is missing from parameters.")
            return None
    
        self.strategy_queue = self.get_queue_name(strategy_id)

        if self.strategy_queue is None:
            log_error(f"Queue name not found for Strategy {strategy_id}.")
            return None

        response = aws_sqs_subscribe(self.sqs, f'{AWS_SQS.URL.value}/{AWS_SQS.ACCOUNT_ID.value}/{self.strategy_queue}')
        log_info(f"Message Subscribed: {self.strategy_queue}: {response.get('ResponseMetadata', {}).get('RequestId')}")

        if response.get('Messages'):
            return response 
        else:
            log_info("No messages available in the subscribed queue.")
            return None


