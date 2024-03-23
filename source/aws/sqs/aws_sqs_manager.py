import boto3
import uuid
from boto3.session import botocore

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


def aws_sqs_subscribe(sqs_client, queue_url):
    """
    Subscribe message from an AWS SQS queue.
    """
    try:
        response = sqs_client.receive_message(
            QueueUrl = queue_url,
            MaxNumberOfMessages = 10,
            WaitTimeSeconds = 5
        )
        return response
    except botocore.exceptions.ClientError as e:
        print(f"Error receiving SQS messages: {e}")
        return None

