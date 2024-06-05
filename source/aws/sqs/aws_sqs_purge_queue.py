import boto3

from botocore.exceptions import ClientError
from source.aws.SQS.BaseSqsManager import BaseSqsManager
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.utils.caching_utils import *

class PurgeQueue(BaseSqsManager):
    """Encapsulates Amazon SQS queue."""

    def __init__(self, queue_url):
        """
        :param sqs_resource: A Boto3 Amazon SQS resource.
        """
        self.sqs_client = boto3.client(SQS, region_name=REGION_NAME)
        self.queue_url = queue_url


    def execute(self):
        """
        Removes an SQS queue. When run against an AWS account, it can take up to
        60 seconds before the queue is actually deleted.

        :param queue: The queue to delete.
        :return: None
        """
        try:
            response = self.sqs_client.purge_queue(
                QueueUrl=self.queue_url
            )
            log_info("Purge queue with URL=%s", self.queue_url)
        except ClientError as error:
            log_error("Couldn't purge Queue.")
            raise error
        else:
            return response     

