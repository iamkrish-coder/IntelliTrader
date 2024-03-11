import boto3
import uuid

def aws_sqs_publish(sqs_client, message, queue_url):
    """
    Publishes a message to an AWS SQS queue.
    """
    # Generate a unique message group ID using UUID
    message_group_id = str(uuid.uuid4())   
    
    response = sqs_client.send_message(
        QueueUrl = queue_url,
        MessageBody = message,
        MessageGroupId = message_group_id
    )
    print(f"Message published successfully. MessageId: {response['MessageId']}")   
    return response


def aws_sns_publish(sqs_client, topic_arn, message, subject=""):
    """
    Publishes a message to an SNS topic.

    Args:
        topic_arn (str): The ARN of the SNS topic.
        message (str): The message content to publish.
        subject (str, optional): The subject of the message. Defaults to "".
    """
    response = sqs_client.publish(
        TopicArn=topic_arn,
        Message=message,
        Subject=subject
    )
    print(f"Message published successfully. MessageId: {response['MessageId']}")
    return response