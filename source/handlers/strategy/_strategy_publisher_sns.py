# handlers/strategy
import boto3
import time
from source.constants.constants import *
from source.enumerations.enums import *
from source.shared.logging_utils import *
from source.queue.awsPublisher import aws_sns_publish

class StrategyPublisherSNS:
    def __init__(self, modules, alerts, parameters):
        self.modules = modules
        self.alerts = alerts
        self.parameters = parameters
        self.client = boto3.client(SNS, region_name=REGION_NAME)

    def initialize(self):
        return self.publish()

    def get_aws_sns_topic_name(self, strategy_id):
        
        # Create a mapping between strategy IDs and topic names
        strategy_id_enum = Strategy[f"algorithm_{strategy_id}"]
        strategy_topic_mapping = {
            Strategy.algorithm_1: Topics.Topic1,
            Strategy.algorithm_2: Topics.Topic2,
            Strategy.algorithm_3: Topics.Topic3,
            Strategy.algorithm_4: Topics.Topic4,
            Strategy.algorithm_5: Topics.Topic5,
            Strategy.algorithm_6: Topics.Topic6
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
        
        successfully_published = []
        strategy_id = self.parameters.get('strategy_id')
        topic_arn = self.get_aws_sns_arn_name(strategy_id)
        
        for alert in self.alerts:
            exchange, symbol, token = alert.split(",")         
            message = f"{exchange.strip()}, {symbol.strip()}, {token.strip()}"
            subject = "Stock Alert"
            
            try:
                response = aws_sns_publish(self.client, topic_arn, message, subject)
                if 'MessageId' in response:
                    successfully_published.append(message)  
                else:
                    log_error("Failed to get Message ID in response.")
            except Exception as e:
                log_error(f"Error publishing message: {str(e)}")
                
            time.sleep(1)
            if len(successfully_published) == len(self.alerts):
                log_info("Alerts Published ...COMPLETE!")
                break
 
