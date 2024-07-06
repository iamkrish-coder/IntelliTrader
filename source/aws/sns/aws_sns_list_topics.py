import boto3

from botocore.exceptions import ClientError
from .BaseSnsManager import BaseSnsManager
from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *
from ...utils.caching_utils import *


class ListTopics(BaseSnsManager):
    """Encapsulates Amazon SNS topic."""

    def __init__(self):
        """
        :param sns_client_resource: A Boto3 Amazon SNS client resource.
        """
        self.sns_client = boto3.client(SNS, region_name=REGION_NAME)

    def execute(self):
        """
        Lists topics for the current account.

        :return: An iterator that yields the topics.
        """
        try:
            response = self.sns_client.list_topics()
        except ClientError as error:
            log_error("Couldn't get topics.")
            raise error
        else:
            return response
