import boto3

from botocore.exceptions import ClientError
from source.aws.sns.BaseSnsManager import BaseSnsManager
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.utils.caching_utils import *

class DeleteTopic(BaseSnsManager):
    """Encapsulates Amazon SNS topic."""

    def __init__(self, topic_arn):
        """
        :param sns_resource: A Boto3 Amazon SNS resource.
        """
        self.sns_client = boto3.client(SNS, region_name=REGION_NAME)
        self.topic_arn = topic_arn
        

    def execute(self):
        """
        Deletes a topic. All subscriptions to the topic are also deleted.
        """
        try:
            self.sns_client.delete_topic(TopicArn=self.topic_arn)
            log_info("Deleted topic %s.", self.topic_arn)
        except ClientError as error:
            log_error("Couldn't delete topic %s.", self.topic.arn)
            raise error


