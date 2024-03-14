# handlers/actions

import time
import boto3
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.queue.awsSubscriber import aws_sqs_subscribe

class ActionSubscriber:
    def __init__(self, modules, parameters, aws_service):
        self.modules = modules
        self.parameters = parameters
        self.sqs_client = boto3.client(SQS, region_name=REGION_NAME)
        self.aws_service = aws_service
        
    def initialize(self):
        return self.subscribe()

    def get_queue_name(self, strategy_id):
        # Create a mapping between strategy IDs and queue names
        strategy_id_enum = Strategy[f"algorithm_{strategy_id}"]
        strategy_queue_mapping = {
            Strategy.ALGORITHM_1: Queues.QUEUE_1,
            Strategy.ALGORITHM_2: Queues.QUEUE_2,
            Strategy.ALGORITHM_3: Queues.QUEUE_3,
            Strategy.ALGORITHM_4: Queues.QUEUE_4,
            Strategy.ALGORITHM_5: Queues.QUEUE_5,
            Strategy.ALGORITHM_6: Queues.QUEUE_6
        }

        if strategy_id_enum in strategy_queue_mapping:
            
            return strategy_queue_mapping[strategy_id_enum].value
        else:
            return None 

    def subscribe(self):
        
        #################
        # SNS SUBSCRIBE #
        #################
        if self.aws_service == SQS:
            
            url = f'{AWS_SQS.URL.value}/{AWS_SQS.ACCOUNT_ID.value}/{self.strategy_queue}'
            strategy_id = self.parameters.get('strategy_id')
            if strategy_id is None:
                log_error("Strategy ID is missing from parameters.")
                return None
    
            self.strategy_queue = self.get_queue_name(strategy_id)
            if self.strategy_queue is None:
                log_error(f"Queue name not found for Strategy {strategy_id}.")
                return None

            response = aws_sqs_subscribe(self.sqs_client, url)
            log_info(f"Message Subscribed: {self.strategy_queue}: {response.get('ResponseMetadata', {}).get('RequestId')}")

            if response.get('Messages'):
                return response 
            else:
                log_info("No messages available in the subscribed queue.")
                return None


