# handlers/strategy
import boto3
import time
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.queue.awsPublisher import aws_sns_publish
from source.queue.awsPublisher import aws_sqs_publish

class StrategyPublisher:
    def __init__(self, modules, alerts, parameters, aws_service):
        self.modules = modules
        self.alerts = alerts
        self.parameters = parameters
        self.aws_service = aws_service
        self.sns_client = boto3.client(SNS, region_name=REGION_NAME)
        self.sqs_client = boto3.client(SQS, region_name=REGION_NAME)

    def initialize(self):
        return self.publish()

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
    

    def publish(self):
        
        ###############
        # SNS PUBLISH #
        ###############
        if self.aws_service == SNS:
            successfully_published = []
            strategy_id = self.parameters.get('strategy_id')
            topic_arn = self.get_aws_sns_arn_name(strategy_id)
        
            for alert in self.alerts:
                exchange, symbol, token = alert.split(",")         
                message = f"{exchange.strip()}, {symbol.strip()}, {token.strip()}"
                subject = "Stock Alert"
            
                try:
                    response = aws_sns_publish(self.sns_client, topic_arn, message, subject)
                    if 'MessageId' in response:
                        successfully_published.append(message)  
                    else:
                        log_error("Failed to get Message ID in response.")
                except Exception as e:
                    log_error(f"Error publishing message to SNS: {str(e)}")
                
                time.sleep(1)
                if len(successfully_published) == len(self.alerts):
                    log_info("Alerts Published ...COMPLETE!")
                    break
        
        ###############
        # SQS PUBLISH #
        ###############
                
        if self.aws_service == SQS:
            successfully_published = []
            strategy_id = self.parameters.get('strategy_id')
            url = f"{AWS_SQS.URL.value}/{AWS_SQS.ACCOUNT_ID.value}/{Queues.Queue1.value}"

            for alert in self.alerts:
                exchange, symbol, token = alert.split(", ")
                message = f"{exchange.strip()}, {symbol.strip()}, {token.strip()}"

                try:
                    response = aws_sqs_publish(self.client, message, url)
                    
                    if 'MessageId' in response:
                        successfully_published.append(message)
                    else:
                        log_error("Failed to get Message ID in response.")
                except Exception as e:
                    log_error(f"Error publishing message to SQS: {str(e)}")

                time.sleep(1)
                if len(successfully_published) == len(self.alerts):
                    log_info("Alerts Published ...COMPLETE!")
                    break                
