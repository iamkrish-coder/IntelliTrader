import boto3

from botocore.exceptions import ClientError
from .BaseSqsManager import BaseSqsManager
from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *
from ...utils.caching_utils import *


class DeleteQueueMessage(BaseSqsManager):
    """Encapsulates Amazon SQS queue."""

    def __init__(self, queue_url, receipt_handle):
        """
        :param sqs_resource: A Boto3 Amazon SQS resource.
        """
        self.sqs_client = boto3.client(SQS, region_name=REGION_NAME)
        self.queue_url = queue_url
        self.receipt_handle = receipt_handle

    def execute(self):
        """
        Delete a message from a queue. Clients must delete messages after they
        are received and processed to remove them from the queue.

        :param message: The message to delete. The message's queue URL is contained in
                        the message's metadata.
        :return: None
        """
        try:
            response = self.sqs_client.delete_message(
                QueueUrl=self.queue_url,
                ReceiptHandle=self.receipt_handle
            )
            log_info("Deleted message: %s", response.get("message_id"))
        except ClientError as error:
            log_error("Couldn't delete message: %s", response.get("message_id"))
            raise error
        else:
            return response
