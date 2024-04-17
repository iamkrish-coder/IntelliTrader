import boto3

from botocore.exceptions import ClientError
from source.aws.sqs.BaseSqsManager import BaseSqsManager
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.utils.caching_utils import *

class CreateQueue(BaseSqsManager):
    """Encapsulates Amazon SQS queue."""

    def __init__(self, mode, name):
        """
        :param sqs_resource: A Boto3 Amazon SQS resource.
        """
        self.sqs_resource = boto3.client(SQS, region_name=REGION_NAME)
        self.mode = mode
        self.name = name


    def execute(self):
        """
        Creates an Amazon SQS queue.

        :param name: The name of the queue. This is part of the URL assigned to the queue.
        :param attributes: The attributes of the queue, such as maximum message size or whether it's a FIFO queue.
        :return: A Queue object that contains metadata about the queue and that can be used
                to perform queue operations like sending and receiving messages.
        """ 
        if self.mode == STANDARD:
            return self.create_standard_queue()
        elif self.mode == FIFO:
            return self.create_fifo_queue()


    def create_standard_queue(self):       

        try:
            queue = self.sqs_resource.create_queue(
                QueueName=self.name, 
                Attributes={
                    'DelaySeconds': '5',
                    'MaximumMessageSize': '',
                    'MessageRetentionPeriod': '86400',
                    'Policy': '',
                    'ReceiveMessageWaitTimeSeconds': '',
                    'VisibilityTimeout': ''
                }
            )
            log_info("Created queue '%s' with URL=%s", self.name, queue.get("QueueUrl"))
        except ClientError as error:
            log_error("Couldn't create queue %s.", self.name)
            raise error
        else:
            return queue


    def create_fifo_queue(self):
        """
        Create a FIFO queue.
        queue names must be made up of only uppercase and lowercase ASCII letters,
        numbers, underscores, and hyphens, and must be between 1 and 256 characters long.
        For a FIFO queue, the name must end with the .fifo suffix.

        :param name: The name for the queue.
        :return: The new queue.
        """

        try:
            queue = self.sqs_resource.create_queue(
                QueueName=self.name,
                Attributes={
                    'FifoQueue': str(True),
                    'ContentBasedDeduplication': str(True),
                    'DelaySeconds': '5',
                    'MaximumMessageSize': '',
                    'MessageRetentionPeriod': '3600',
                    'Policy': '',
                    'ReceiveMessageWaitTimeSeconds': '',
                    'VisibilityTimeout': ''
                },
            )
            log_info("Created FIFO queue '%s' with URL=%s", self.name, queue.get("QueueUrl"))
        except ClientError as error:
            log_error("Couldn't create queue %s.", self.name)
            raise error
        else:
            return queue
