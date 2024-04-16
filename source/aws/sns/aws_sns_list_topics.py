import boto3

from botocore.exceptions import ClientError
from source.aws.sns.BaseSnsManager import BaseSnsManager
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.utils.caching_utils import *

class ListTopics(BaseSnsManager):
    """Encapsulates Amazon SNS topic."""

    def __init__(self):
        """
        :param sns_resource: A Boto3 Amazon SNS resource.
        """
        self.sns_resource = boto3.client(SNS, region_name=REGION_NAME)


    def execute(self):
        """
        Lists topics for the current account.

        :return: An iterator that yields the topics.
        """
        try:
            response = self.sns_resource.list_topics()
        except ClientError:
            log_error("Couldn't get topics.")
            raise
        else:
            return response     