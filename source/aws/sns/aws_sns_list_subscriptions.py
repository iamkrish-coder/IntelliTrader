import boto3

from source.aws.sns.BaseSnsManager import BaseSnsManager
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.utils.caching_utils import *

class ListSubscriptions(BaseSnsManager):
    """Encapsulates Amazon SNS topic."""

    def __init__(self, topic=None):
        """
        :param sns_resource: A Boto3 Amazon SNS resource.
        """
        self.sns_resource = boto3.client(SNS, region_name=REGION_NAME)
        self.topic = topic


    def execute(self):
        """
        Lists subscriptions for the current account, optionally limited to a
        specific topic.

        :param topic: When specified, only subscriptions to this topic are returned.
        :return: An iterator that yields the subscriptions.
        """
        try:
            if self.topic is None:
                subs_iter = self.sns_resource.subscriptions.all()
            else:
                subs_iter = self.topic.subscriptions.all()
            logger.info("Got subscriptions.")
        except ClientError:
            logger.exception("Couldn't get subscriptions.")
            raise
        else:
            return subs_iter