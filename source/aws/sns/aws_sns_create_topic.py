import boto3

from botocore.exceptions import ClientError
from .BaseSnsManager import BaseSnsManager
from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *
from ...utils.caching_utils import *


class CreateTopic(BaseSnsManager):
    """Encapsulates Amazon SNS topic."""

    def __init__(self, mode, name):
        """
        :param sns_client_resource: A Boto3 Amazon SNS client resource.
        """
        self.sns_client = boto3.client(SNS, region_name=REGION_NAME)
        self.mode = mode
        self.name = name

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
            response = self.sns_client.create_topic(Name=self.name)
            log_info("Created topic %s with ARN %s.", self.name, response.get("TopicArn"))
        except ClientError as error:
            log_error("Couldn't create topic %s.", self.name)
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
            response = self.sns_client.create_topic(
                Name=self.name,
                Attributes={
                    "FifoTopic": str(True),
                    "ContentBasedDeduplication": str(False),
                },
            )
            log_info("Created FIFO topic %s with ARN %s.", self.name, response.get("TopicArn"))
        except ClientError as error:
            log_error("Couldn't create topic %s.", self.name)
            raise error
        else:
            return response
