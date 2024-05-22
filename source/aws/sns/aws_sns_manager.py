import boto3
import uuid

from boto3.session import botocore
from botocore.exceptions import ClientError
from source.aws.sns.aws_sns_create_topic import CreateTopic
from source.aws.sns.aws_sns_delete_topic import DeleteTopic
from source.aws.sns.aws_sns_list_subscriptions import ListSubscriptions
from source.aws.sns.aws_sns_list_topics import ListTopics   
from source.aws.sns.aws_sns_publish_topic import PublishTopic
from source.aws.sns.aws_sns_subscribe_topic import SubscribeTopic
from source.aws.sns.aws_sns_unsubscribe_topic import UnsubscribeTopic


class SNSManager:
    def __init__(self):
        self.actions = {
            "create_topic": CreateTopic,
            "delete_topic": DeleteTopic,
            "list_subscriptions": ListSubscriptions,
            "list_topics": ListTopics,
            "publish_topic": PublishTopic,
            "subscribe_topic": SubscribeTopic,
            "unsubscribe_topic": UnsubscribeTopic
        }

    def get_action(self, action_type, **kwargs):
        action_class = self.actions.get(action_type)
        if not action_class:
            raise ValueError(f"Invalid SNS action: {action_type}")

        return action_class(**kwargs)

def aws_sns_publish(sns_client, topic_arn, message, subject=""):
    """
    Publishes a message to an SNS topic.

    Args:
        sns_client (boto3.client): A Boto3 SNS client object.
        topic_arn (str): The ARN of the SNS topic.
        message (str): The message content to publish.
        subject (str, optional): The subject of the message. Defaults to "".
        message_group_id (str, optional): The message group ID for FIFO topics. Defaults to None.
    """
    # Generate a unique message group ID using UUID
    message_group_id = str(uuid.uuid4())   

    response = sns_client.publish(
        TopicArn=topic_arn,
        Message=message,
        Subject=subject,
        MessageGroupId=message_group_id
    )
    print(f"Message published successfully. MessageId: {response['MessageId']}")
    return response


def aws_sns_subscribe(sns_client, topic_arn, protocol, endpoint):
    """
    Subscribes an endpoint to an SNS topic.

    Args:
        sns_client: A Boto3 SNS client object.
        topic_arn: The ARN of the SNS topic to subscribe to.
        endpoint: The URL or ARN of the endpoint that will receive messages.

    Returns:
        The subscription ARN or None on error.
    """
    try:
        response = sns_client.subscribe(TopicArn=topic_arn, Protocol=protocol, Endpoint=endpoint)
        return response
    except botocore.exceptions.ClientError as error:
        print(f"Error subscribing to SNS topic: {error}")
        return None


def aws_sns_receive(sns_client, subscription_arn):
    """
    Subscribe to an SNS topic and receive messages.
    """
    try:
        response = sns_client.receive(
            SubscriptionArn=subscription_arn, MaxNumberOfMessages=10
        )
        return response
    except botocore.exceptions.ClientError as error:
        print(f"Error receiving SNS messages: {error}")
        return None
