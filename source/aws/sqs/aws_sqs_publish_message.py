import boto3

from botocore.exceptions import ClientError
from BaseSqsManager import BaseSqsManager
from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *
from ...utils.caching_utils import *


class PublishQueueMessage(BaseSqsManager):
    """Encapsulates Amazon SQS queue."""

    def __init__(self, queue_url, receipt_handle):
        """
        :param sqs_resource: A Boto3 Amazon SQS resource.
        """
        self.message_attributes = None
        self.message_body = None
        self.sqs_client = boto3.client(SQS, region_name=REGION_NAME)
        self.queue_url = queue_url
        self.receipt_handle = receipt_handle

    def execute(self):
        """
        Send a message to an Amazon SQS queue.

        :param queue: The queue that receives the message.
        :param message_body: The body text of the message.
        :param message_attributes: Custom attributes of the message. These are key-value
                                pairs that can be whatever you want.
        :return: The response from SQS that contains the assigned message ID.
        """

        try:
            response = self.sqs_client.send_message(
                MessageBody=self.message_body,
                MessageAttributes=self.message_attributes
            )
        except ClientError as error:
            log_error("Send message failed: %s", self.message_body)
            raise error
        else:
            return response
