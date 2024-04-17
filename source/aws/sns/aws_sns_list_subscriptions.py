import boto3

from botocore.exceptions import ClientError
from source.aws.sns.BaseSnsManager import BaseSnsManager
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.utils.caching_utils import *

class ListSubscriptions(BaseSnsManager):
    """Encapsulates Amazon SNS topic."""

    def __init__(self, topic_arn=None):
        """
        :param sns_resource: A Boto3 Amazon SNS resource.
        """
        self.sns_resource = boto3.client(SNS, region_name=REGION_NAME)
        self.topic_arn = topic_arn


    def execute(self):
        """
        Lists subscriptions for the current account, optionally limited to a
        specific topic.

        :param topic: When specified, only subscriptions to this topic are returned.
        :return: An iterator that yields the subscriptions.
        """
        try:
            if self.topic_arn is None:
                response = self.sns_resource.list_subscriptions()
            else:
                response = self.sns_resource.list_subscriptions_by_topic(TopicArn=self.topic_arn)
        except ClientError as error:
            log_error("Couldn't get subscriptions.")
            raise error
        else:
            return response