import boto3
import uuid
from boto3.session import botocore

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
    except botocore.exceptions.ClientError as e:
        print(f"Error subscribing to SNS topic: {e}")
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
    except botocore.exceptions.ClientError as e:
        print(f"Error receiving SNS messages: {e}")
        return None
