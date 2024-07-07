import json

import boto3

from botocore.exceptions import ClientError
from .BaseSnsManager import BaseSnsManager
from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *
from ...utils.caching_utils import *


class CreateTopic(BaseSnsManager):
    """Encapsulates Amazon SNS topic."""

    def __init__(self, mode, topic_name, display_name=None, access_policy=None, delivery_policy=None, fifo_topic=None, content_based_deduplication=None, request_delivery_receipt=None):
        """
        Creates an SNS topic object.

        :param mode: (Optional) The mode of the topic (e.g., FIFO, standard). Defaults to None.
        :param topic_name: (Optional) The name of the SNS topic. Defaults to None.
        :param access_policy: (Optional) The access policy for the topic. Defaults to None.
        :param request_delivery_receipt: (Optional) Whether to request a delivery receipt for messages published to the topic. Defaults to None.
        :param display_name: (Optional) A display name for the topic. Defaults to None.
        """

        self.sns_client = boto3.client(SNS, region_name=REGION_NAME)
        self.mode = mode
        self.topic_name = topic_name
        self.display_name = display_name
        self.access_policy = access_policy
        self.delivery_policy = delivery_policy
        self.fifo_topic = fifo_topic
        self.content_based_deduplication = content_based_deduplication
        self.request_delivery_receipt = request_delivery_receipt

    def execute(self):
        """
        Creates a notification topic.

        :param name: The name of the topic to create.
        :return: The newly created topic.
        """
        if self.mode == STANDARD:
            return self.create_standard_topic()
        elif self.mode == FIFO:
            return self.create_fifo_topic()

    def create_standard_topic(self):
        try:
            # Define topic attributes dictionary
            topic_attributes = {
                "DisplayName": self.display_name,
                "RequestDeliveryReceipt": self.request_delivery_receipt,
                "Policy": json.dumps(self.access_policy)
            }
            topic_attributes = {key: value for key, value in topic_attributes.items() if value is not None}

            response = self.sns_client.create_topic(
                Name=self.topic_name,
                Attributes=topic_attributes
            )
            log_info("Created topic %s with ARN %s.", self.topic_name, response.get("TopicArn"))
        except ClientError as error:
            log_error("Couldn't create topic %s.", self.topic_name)
            raise error
        else:
            return response

    def create_fifo_topic(self):
        """
        Create a FIFO topic.
        Topic names must be made up of only uppercase and lowercase ASCII letters,
        numbers, underscores, and hyphens, and must be between 1 and 256 characters long.
        For a FIFO topic, the name must end with the .fifo suffix.

        :param name: The name for the topic.
        :return: The new topic.
        """
        try:
            # Define topic attributes dictionary
            topic_attributes = {
                "DisplayName": self.display_name,
                "FifoTopic": self.fifo_topic,
                "ContentBasedDeduplication": self.content_based_deduplication,
                "RequestDeliveryReceipt": self.request_delivery_receipt,
                "DeliveryPolicy": self.delivery_policy,
                "Policy": json.dumps(self.access_policy)
            }
            topic_attributes = {key: value for key, value in topic_attributes.items() if value is not None}

            response = self.sns_client.create_topic(
                Name=self.topic_name,
                Attributes=topic_attributes,
            )
            log_info("Created FIFO topic %s with ARN %s.", self.topic_name, response.get("TopicArn"))
        except ClientError as error:
            log_error("Couldn't create topic %s.", self.topic_name)
            raise error
        else:
            return response
