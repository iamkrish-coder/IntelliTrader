import boto3
import uuid

def aws_publish(sqs_client, message, queue_url):
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
    return response