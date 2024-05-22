import boto3

from botocore.exceptions import ClientError
from source.aws.sns.BaseSnsManager import BaseSnsManager
from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.utils.caching_utils import *

class SubscribeTopic(BaseSnsManager):
    """Encapsulates Amazon SNS topic."""

    def __init__(self, topic_arn, protocol, endpoint, attributes):
        """
        :param sns_resource: A Boto3 Amazon SNS resource.
        """
        self.sns_client = boto3.client(SNS, region_name=REGION_NAME)
        self.topic_arn = topic_arn
        self.protocol = protocol    
        self.endpoint = endpoint
        self.attributes = attributes


    def execute(self):
        """
        Subscribes an endpoint to the topic. Some endpoint types, such as email,
        must be confirmed before their subscriptions are active. When a subscription
        is not confirmed, its Amazon Resource Number (ARN) is set to
        'PendingConfirmation'.

        :param topic: The topic to subscribe to.
        :param protocol: The protocol of the endpoint, such as 'sms' or 'email'.
        :param endpoint: The endpoint that receives messages, such as a phone number
                         (in E.164 format) for SMS messages, or an email address for
                         email messages.
        :return: The newly added subscription.
        """
        try:
            response = self.sns_client.subscribe(
                TopicArn=self.topic_arn,
                Protocol=self.protocol,
                Endpoint=self.endpoint,
                Attributes=self.attributes,
                ReturnSubscriptionArn=True
            )
            log_info("Subscribed %s %s to topic %s.", self.protocol, self.endpoint, self.topic_arn)
        except ClientError as error:
            log_error(
                "Couldn't subscribe %s %s to topic %s.", self.protocol, self.endpoint, self.topic_arn)
            raise error
        else:
            return response
