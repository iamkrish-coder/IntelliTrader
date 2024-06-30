# handlers/actions

import time
import boto3

from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *
from ...utils.caching_utils import *
from ...aws.sqs.aws_sqs_manager import aws_sqs_subscribe
from ...aws.sns.aws_sns_manager import aws_sns_subscribe
from BaseAction import BaseAction


class ActionSubscriber(BaseAction):
    def __init__(self, modules, parameters, database, aws_service, connection):
        super().__init__(connection, modules)
        self.strategy_queue = None
        self.modules = modules
        self.parameters = parameters
        self.database = database
        self.aws_service = aws_service
        self.alerts = None
        self.sns_client = boto3.client(SNS, region_name=REGION_NAME)
        self.sqs_client = boto3.client(SQS, region_name=REGION_NAME)

    def initialize(self):
        return self.subscribe()

    def prepare_request_parameters(self, event, table, model, dataset, projection=[], filters={}):

        attributes = None
        config = self.database.table_configuration[table]
        if model:
            attributes = model(**dataset).convert_table_rows_to_dict(config)
        return {
            "event": event,
            "table": table,
            "config": config,
            "data": {
                "attributes": attributes,
                "projection": projection,
                "filters": filters,
            }
        }

    def database_request(self, request):
        log_info(f"Requesting AWS DynamoDB...")
        return self.database.manage_table_records(request)

    def get_topics_for_subscription(self):

        dataset = None
        active_topic_params = self.prepare_request_parameters(
            event=Events.SCAN.value,
            table=Tables.TABLE_TOPICS.value,
            model=None,
            dataset=dataset,
            projection=["topic_arn"],
            filters={
                "is_subscribed": {
                    "eq": False
                },
                "is_active": {
                    "eq": True
                },
                "is_published": {
                    "eq": True
                }
            }
        )
        return self.database_request(active_topic_params)

    def subscribe(self):
        ###################
        # SNS SUBSCRIBE #
        ###################
        if self.aws_service == SNS:

            successfully_subscribed = []
            queue_type = self.parameters.get('runtime_params.queue_type')
            topic_type = self.parameters.get('runtime_params.topic_type')
            strategy_id = self.parameters.get('strategy_params.strategy_id')

            if strategy_id is None:
                log_error("Strategy ID is missing from parameters.")
                return None

            queue_arn, queue_name, queue_url = self.generate_aws_sqs_queue_arn(strategy_id, queue_type)

            topic_arn, topic_name = self.generate_aws_sns_topic_details(strategy_id, topic_type)

            topic_arns = self.get_topics_for_subscription()

            # Subscribe the SQS queue to the SNS topic
            if topic_arns is not None:
                for subscription in topic_arns:
                    topic_arn = subscription['topic_arn']
                    protocol = 'sqs'
                    endpoint = queue_arn
                    response = aws_sns_subscribe(self.sns_client, topic_arn, protocol, endpoint)

            log_info(f"Subscribed: {queue_name}: {response.get('ResponseMetadata', {}).get('RequestId')}")

            response = aws_sqs_subscribe(self.sqs_client, queue_url)
            if response is None:
                log_info("No messages available in the subscribed queue.")
                return None
            else:
                return response

                #################
        # SQS SUBSCRIBE #
        #################
        if self.aws_service == SQS:
            strategy_id = self.parameters.get('strategy_id')
            if strategy_id is None:
                log_error("Strategy ID is missing from parameters.")
                return None

            self.strategy_queue = self.get_aws_sqs_queue_name(strategy_id)
            if self.strategy_queue is None:
                log_error(f"Queue name not found for Strategy {strategy_id}.")
                return None

            url = self.get_aws_sqs_queue_url(self.strategy_queue)

            response = aws_sqs_subscribe(self.sqs_client, url)
            log_info(
                f"Message Subscribed: {self.strategy_queue}: {response.get('ResponseMetadata', {}).get('RequestId')}")

            if response.get('Messages'):
                return response
            else:
                log_info("No messages available in the subscribed queue.")
                return None
