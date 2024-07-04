import boto3
import uuid

from botocore.exceptions import ClientError
from .BaseSnsManager import BaseSnsManager
from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *
from ...utils.caching_utils import *


class PublishTopic(BaseSnsManager):
    """Encapsulates Amazon SNS topic."""

    def __init__(self, mode, topic, message, subject=None, attributes=None, group_id=None):
        self.sns_client = boto3.client(SNS, region_name=REGION_NAME)
        self.mode = mode
        self.topic = topic
        self.message = message
        self.subject = subject
        self.attributes = attributes
        self.group_id = group_id

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
            att_dict = {}
            for key, value in self.attributes.items():
                if isinstance(value, str):
                    att_dict[key] = {"DataType": "String", "StringValue": value}
                elif isinstance(value, bytes):
                    att_dict[key] = {"DataType": "Binary", "BinaryValue": value}

            publish_response = self.topic.publish(Message=self.message, MessageAttributes=att_dict)
            response = publish_response["MessageId"]
            log_info(
                "Published message with attributes %s to topic %s.",
                self.attributes,
                self.topic.arn,
            )
        except ClientError as error:
            log_error("Couldn't publish message to topic %s.", self.topic.arn)
            raise error
        else:
            return response

    def publish_fifo_topic(self):
        try:
            att_dict = {}
            for key, value in self.attributes.items():
                if isinstance(value, str):
                    att_dict[key] = {"DataType": "String", "StringValue": value}
                elif isinstance(value, bytes):
                    att_dict[key] = {"DataType": "Binary", "BinaryValue": value}
            dedup_id = uuid.uuid4()

            publish_response = self.topic.publish(
                Subject=self.subject,
                Message=self.message,
                MessageAttributes=att_dict,
                MessageGroupId=self.group_id,
                MessageDeduplicationId=str(dedup_id),
            )
            response = publish_response["MessageId"]
            log_info(
                "Published message with attributes %s to topic %s.",
                self.attributes,
                self.topic.arn,
            )
        except ClientError as error:
            log_error("Couldn't publish message to topic %s.", self.topic.arn)
            raise error
        else:
            return response
