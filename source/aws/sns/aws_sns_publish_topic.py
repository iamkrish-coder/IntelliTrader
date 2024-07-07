import boto3

from botocore.exceptions import ClientError
from .BaseSnsManager import BaseSnsManager
from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *
from ...utils.caching_utils import *


class PublishTopic(BaseSnsManager):
    """Encapsulates Amazon SNS topic."""

    def __init__(self, mode, topic_name, topic_arn=None, target_arn=None, phone_number=None, message=None, subject=None, message_structure=None, message_attributes=None, deduplication_id=None, group_id=None):

        self.sns_client = boto3.client(SNS, region_name=REGION_NAME)
        self.mode = mode
        self.topic_name = str(topic_name)
        self.topic_arn = str(topic_arn)
        self.target_arn = str(target_arn)
        self.phone_number = str(phone_number)
        self.message = str(message)
        self.subject = str(subject)
        self.message_structure = str(message_structure)
        self.message_attributes = message_attributes
        self.deduplication_id = str(deduplication_id)
        self.group_id = str(group_id)

    def execute(self):
        """
        Publishes a message either Standard or FIFO mode, with attributes, to a topic. Subscriptions can be filtered
        based on message attributes so that a subscription receives messages only
        when specified attributes are present.
        """
        if self.mode == STANDARD:
            return self.publish_standard_topic()
        elif self.mode == FIFO:
            return self.publish_fifo_topic()

    def publish_standard_topic(self):
        try:
            message_attributes_dict = {}
            if self.message_attributes:
                for key, value in self.message_attributes.items():
                    if isinstance(value, str):
                        message_attributes_dict[key] = {"DataType": "String", "StringValue": value}
                    elif isinstance(value, bytes):
                        message_attributes_dict[key] = {"DataType": "Binary", "BinaryValue": value}

            publish_response = self.sns_client.publish(
                Message=self.message,
                MessageAttributes=message_attributes_dict
            )
            response = publish_response["MessageId"]
            log_info("Published message to topic %s.", self.topic_arn)
        except ClientError as error:
            log_error("Couldn't publish message to topic %s.", self.topic_arn)
            raise error
        else:
            return response

    def publish_fifo_topic(self):
        try:
            message_attributes_dict = {}
            if self.message_attributes:
                for key, value in self.message_attributes.items():
                    if isinstance(value, str):
                        message_attributes_dict[key] = {"DataType": "String", "StringValue": value}
                    elif isinstance(value, bytes):
                        message_attributes_dict[key] = {"DataType": "Binary", "BinaryValue": value}

            publish_response = self.sns_client.publish(
                TopicArn=self.topic_arn,
                TargetArn=self.target_arn,
                PhoneNumber=self.phone_number,
                Message=self.message,
                Subject=self.subject,
                MessageStructure=self.message_structure,
                MessageAttributes=message_attributes_dict,
                MessageDeduplicationId=self.deduplication_id,
                MessageGroupId=self.group_id
            )
            response = publish_response["MessageId"]
            log_info( "Published message to topic %s.", self.topic_arn)
        except ClientError as error:
            log_error("Couldn't publish message to topic %s.", self.topic_arn)
            raise error
        else:
            return response
