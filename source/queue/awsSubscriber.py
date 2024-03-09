import boto3

def aws_subscribe(sqs_client, queue_url):
    """
    Subscribe message from an AWS SQS queue.
    """
    response = sqs_client.receive_message(
        QueueUrl = queue_url,
        MaxNumberOfMessages = 10,
        WaitTimeSeconds = 5
    )
    return response