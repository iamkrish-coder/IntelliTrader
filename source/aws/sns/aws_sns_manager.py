import boto3
from boto3.session import botocore

def aws_sns_publish(sns_client, topic_arn, message, subject=""):
    """
    Publishes a message to an SNS topic.

    Args:
        topic_arn (str): The ARN of the SNS topic.
        message (str): The message content to publish.
        subject (str, optional): The subject of the message. Defaults to "".
    """
    response = sns_client.publish(
        TopicArn=topic_arn,
        Message=message,
        Subject=subject
    )
    print(f"Message published successfully. MessageId: {response['MessageId']}")
    return response


def aws_sns_subscribe(sns_client, subscription_arn):
    """
    Subscribe to an SNS topic and receive messages.
    """
    try:
        response = sns_client.receive(
            SubscriptionArn = subscription_arn,  
            MaxNumberOfMessages = 10
        )
        return response
    except botocore.exceptions.ClientError as e:
        print(f"Error receiving SNS messages: {e}")
        return None
