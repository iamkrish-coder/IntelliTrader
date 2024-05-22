import boto3

from botocore.exceptions import ClientError
from source.aws.sqs.BaseSqsManager import BaseSqsManager
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.utils.caching_utils import *

class SubscribeQueueMessage(BaseSqsManager):
    """Encapsulates Amazon SQS queue."""

    def __init__(self, queue_url):
        """
        :param sqs_resource: A Boto3 Amazon SQS resource.
        """
        self.sqs_client = boto3.client(SQS, region_name=REGION_NAME)
        self.queue_url = queue_url
        self.receipt_handle = receipt_handle


    def execute(self):
        """
        Receive a batch of messages in a single request from an SQS queue.

        :param queue: The queue from which to receive messages.
        :param max_number: The maximum number of messages to receive. The actual number
                        of messages received might be less.
        :param wait_time: The maximum time to wait (in seconds) before returning. When
                        this number is greater than zero, long polling is used. This
                        can result in reduced costs and fewer false empty responses.
        :return: The list of Message objects received. These each contain the body
                of the message and metadata and custom attributes.

        :AttributeNames Options: |'Policy'|'VisibilityTimeout'|'MaximumMessageSize'|'MessageRetentionPeriod'|'ApproximateNumberOfMessages'|'ApproximateNumberOfMessagesNotVisible'|'CreatedTimestamp'|'LastModifiedTimestamp'|'QueueArn'|'ApproximateNumberOfMessagesDelayed'|'DelaySeconds'|'ReceiveMessageWaitTimeSeconds'|'RedrivePolicy'|'FifoQueue'|'ContentBasedDeduplication'|'KmsMasterKeyId'|'KmsDataKeyReusePeriodSeconds'|'DeduplicationScope'|'FifoThroughputLimit'|'RedriveAllowPolicy'|'SqsManagedSseEnabled',
        """
        try:
            response = self.sqs_client.receive_messages(
                QueueUrl=self.queue_url,
                AttributeNames=['All'],
                MessageAttributeNames=[
                    ['All'],
                ],
                MaxNumberOfMessages=3,
                VisibilityTimeout=600,
                WaitTimeSeconds=123,
                ReceiveRequestAttemptId='string'
            )
            for message in response:
                log_info("Received message: %s: %s", message.message_id, message.body)
        except ClientError as error:
            log_error("Couldn't receive message from queue: %s", response.get("QueueName"))
            raise error
        else:
            return response     

