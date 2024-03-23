# handlers/actions

import time
import boto3
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.aws.sqs.aws_sqs_manager import aws_sqs_subscribe
from source.aws.sns.aws_sns_manager import aws_sns_subscribe

class ActionSubscriber:
    def __init__(self, modules, parameters, aws_service):
        self.modules     = modules
        self.parameters  = parameters
        self.aws_service = aws_service
        self.alerts      = None
        self.sns_client  = boto3.client(SNS, region_name=REGION_NAME)
        self.sqs_client  = boto3.client(SQS, region_name=REGION_NAME)
        
    def initialize(self):
        return self.subscribe()

    def subscribe(self):
        
        ###################
        # SNS SUBSCRIBE #
        ###################
        if self.aws_service == SNS:
            pass


        #################
        # SQS SUBSCRIBE #
        #################
        if self.aws_service == SQS:
            strategy_id = self.parameters.get('strategy_id')
            if strategy_id is None:
                log_error("Strategy ID is missing from parameters.")
                return None
    
            self.strategy_queue = self.get_queue_name(strategy_id)
            if self.strategy_queue is None:
                log_error(f"Queue name not found for Strategy {strategy_id}.")
                return None
            
            url = f'{AWS_SQS.URL.value}/{AWS_SQS.ACCOUNT_ID.value}/{self.strategy_queue}'

            response = aws_sqs_subscribe(self.sqs_client, url)
            log_info(f"Message Subscribed: {self.strategy_queue}: {response.get('ResponseMetadata', {}).get('RequestId')}")

            if response.get('Messages'):
                return response 
            else:
                log_info("No messages available in the subscribed queue.")
                return None


    def get_aws_sns_topic_name(self, strategy_id):
        
        # Create a mapping between strategy IDs and topic names
        strategy_id_enum = Strategy[f"ALGORITHM_{strategy_id}"]
        strategy_topic_mapping = {
            Strategy.ALGORITHM_1: Topics.TOPIC_1,
            Strategy.ALGORITHM_2: Topics.TOPIC_2,
            Strategy.ALGORITHM_3: Topics.TOPIC_3,
            Strategy.ALGORITHM_4: Topics.TOPIC_4,
            Strategy.ALGORITHM_5: Topics.TOPIC_5,
            Strategy.ALGORITHM_6: Topics.TOPIC_6
        }

        if strategy_id_enum in strategy_topic_mapping:
            return strategy_topic_mapping[strategy_id_enum].value
        else:
            return None 

    def get_aws_sns_arn_name(self, strategy_id):
        
        # ARN Template: arn:aws:sns:<region>:<account-id>:<topic-name>
        topic_name  = self.get_aws_sns_topic_name(strategy_id)
        
        enum_arn        = AWS_SNS.ARN.value
        emum_aws        = AWS_SNS.AWS.value
        emum_sns        = AWS_SNS.SNS.value
        emum_region     = AWS_SNS.REGION.value
        emum_account_id = AWS_SNS.ACCOUNT_ID.value
        emum_topic_name = topic_name
        
        arn_formatted = f"{enum_arn}:{emum_aws}:{emum_sns}:{emum_region}:{emum_account_id}:{emum_topic_name}"
        return arn_formatted

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