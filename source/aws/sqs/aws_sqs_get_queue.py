import boto3

from botocore.exceptions import ClientError
from source.aws.SQS.BaseSqsManager import BaseSqsManager
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.utils.caching_utils import *

class GetQueue(BaseSqsManager):
    """Encapsulates Amazon SQS queue."""

    def __init__(self, queue_name):
        """
        :param sqs_resource: A Boto3 Amazon SQS resource.
        """
        self.sqs_client = boto3.client(SQS, region_name=REGION_NAME)
        self.queue_name = queue_name


    def execute(self):
        """
        Removes an SQS queue. When run against an AWS account, it can take up to
        60 seconds before the queue is actually deleted.

        :param queue: The queue to delete.
        :return: None
        """
        try:
            response = self.sqs_client.get_queue_url(
                QueueName=self.queue_name
            )
            log_info("Got queue '%s' with URL=%s", self.queue_name, response.get("QueueUrl"))
        except ClientError as error:
            log_error("Couldn't get queue named %s.", self.queue_name)
            raise error
        else:
            return response     

