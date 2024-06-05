import boto3
import uuid

from boto3.session import botocore
from botocore.exceptions import ClientError
from source.aws.SQS.aws_sqs_create_queue import CreateQueue
from source.aws.SQS.aws_sqs_delete_queue import DeleteQueue
from source.aws.SQS.aws_sqs_list_queues import ListQueues   
from source.aws.SQS.aws_sqs_get_queue import GetQueue
from source.aws.SQS.aws_sqs_purge_queue import PurgeQueue
from source.aws.SQS.aws_sqs_publish_message import PublishQueueMessage
from source.aws.SQS.aws_sqs_subscribe_message import SubscribeQueueMessage
from source.aws.SQS.aws_sqs_delete_message import DeleteQueueMessage


class SQSManager:
    def __init__(self):
        self.actions = {
            "create_queue": CreateQueue,
            "delete_queue": DeleteQueue,
            "list_queues": ListQueues,
            "get_queue": GetQueue,
            "purge_queue": PurgeQueue,
            "publish_queue_message": PublishQueueMessage,
            "subscribe_queue_message": SubscribeQueueMessage,
            "delete_queue_message": DeleteQueueMessage
        }

    def get_action(self, action_type, **kwargs):
        action_class = self.actions.get(action_type)
        if not action_class:
            raise ValueError(f"Invalid SNS action: {action_type}")

        return action_class(**kwargs)


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
    except botocore.exceptions.ClientError as error:
        print(f"Error receiving SQS messages: {error}")
        return None

