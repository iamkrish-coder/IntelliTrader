import boto3

from source.aws.sns.BaseSnsManager import BaseSnsManager
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.utils.caching_utils import *

class DeleteTopic(BaseSnsManager):
    """Encapsulates Amazon SNS topic."""

    def __init__(self, topic):
        """
        :param sns_resource: A Boto3 Amazon SNS resource.
        """
        self.sns_resource = boto3.client(SNS, region_name=REGION_NAME)
        self.topic = topic
        

    def execute():
        """
        Deletes a topic. All subscriptions to the topic are also deleted.
        """
        try:
            self.topic.delete()
            log_info("Deleted topic %s.", self.topic.arn)
        except ClientError:
            log_error("Couldn't delete topic %s.", self.topic.arn)
            raise


