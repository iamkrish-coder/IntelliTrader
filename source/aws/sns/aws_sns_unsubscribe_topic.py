import boto3

from source.aws.sns.BaseSnsManager import BaseSnsManager
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.utils.caching_utils import *

class UnsubscribeTopic(BaseSnsManager):
    """Encapsulates Amazon SNS topic."""

    def __init__(self, subscription):
        """
        :param sns_resource: A Boto3 Amazon SNS resource.
        """
        self.sns_resource = boto3.client(SNS, region_name=REGION_NAME)
        self.subscription = subscription


    def execute(self):
        """
        Unsubscribes and deletes a subscription.
        """
        try:
            self.subscription.delete()
            log_info("Deleted subscription %s.", self.subscription.arn)
        except ClientError:
            log_error("Couldn't delete subscription %s.", self.subscription.arn)
            raise