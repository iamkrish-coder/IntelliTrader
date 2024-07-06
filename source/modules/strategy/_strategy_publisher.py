# handlers/strategy
import time
import uuid

from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *
from ...utils.caching_utils import *
from ...aws.sns.aws_sns_manager import SNSManager
from ...aws.sqs.aws_sqs_manager import SQSManager
from ...models.topics_model import TopicsModel
from .BaseStrategy import BaseStrategy


class StrategyPublisher(BaseStrategy):
    def __init__(self, connection, modules, parameters, database, alerts, publisher):
        super().__init__(connection, modules)
        self.connection = connection
        self.modules = modules
        self.parameters = parameters
        self.database = database
        self.alerts = alerts
        self.publisher = publisher
        self.object_sns_manager = SNSManager()
        self.object_sqs_manager = SQSManager()
        self.strategy_id = self.parameters.get('strategy_params.strategy_id')
        self.topic_mode = self.parameters.get('runtime_params.topic_type')   
        self.strategy_queue = None
        self.date_time_now = None
        self.client = None
        
    def initialize(self):
        return self.publish()

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


    # def set_topic_published_status(self):
    #
    #     log_info(f"Updating SNS Topic status...")
    #     dataset = {
    #         "topic_arn": topic_arn,
    #         "topic_name": topic_name,
    #         "is_active": True,
    #         "is_published": True,
    #     }
    #     update_topic_params = self.prepare_request_parameters(
    #         event=Events.UPDATE.value,
    #         table=Tables.TABLE_TOPICS.value,
    #         model=TopicsModel,
    #         dataset=dataset,
    #     )
    #     self.database_request(update_topic_params)
    #
    #     cached_key = f"{TABLE_TOPICS}_{topic_name}_{IS_PUBLISHED}"
    #     cached_value = [dataset]
    #     set_cached_item(
    #         Cache_Type.DISK.value,
    #         CACHE_TOPICS_DIR,
    #         cached_key,
    #         cached_value,
    #     )

    def publish(self):
        ###############
        # SNS PUBLISH #
        ###############
        if self.publisher == SNS:
            successfully_published = []
            if self.strategy_id is None:
                log_error("Strategy ID is missing from parameters.")
                return None    

            """ Build Parameters """
            topic_arn, topic_name = self.generate_aws_sns_topic_details(self.strategy_id, self.topic_mode)
            group_id = self.generate_group_id(self.strategy_id)
            deduplication_id = uuid.uuid4()

            for alert in self.alerts:
                exchange, symbol, token = alert.split(",")
                message = f"{exchange.strip()}, {symbol.strip()}, {token.strip()}"
                subject = "IntelliTrader - Stock Alert"

                try:
                    # Publish to SNS
                    arguments = {
                        "mode": self.topic_mode,
                        "topic_name": topic_name,
                        "topic_arn": topic_arn,
                        "message": message,
                        "subject": subject,
                        "deduplication_id": deduplication_id,
                        "group_id": group_id
                    }
                    publish_topic = self.object_sns_manager.get_action("publish_topic", **arguments)
                    response = publish_topic.execute()

                    if "MessageId" in response:
                        successfully_published.append(message)
                    else:
                        log_error("Failed to get Message ID in response.")
                except Exception as error:
                    log_error(f"Error publishing message to SNS: {str(error)}")

                time.sleep(1)
                if len(successfully_published) == len(self.alerts):
                    log_info("Alerts Published ...COMPLETE!")
                    break

        ###############
        # SQS PUBLISH #
        ###############
        if self.publisher == SQS:
            successfully_published = []
            if self.strategy_id is None:
                log_error("Strategy ID is missing from parameters.")
                return None

            self.strategy_queue = self.get_aws_sqs_queue_name(self.strategy_id)
            if self.strategy_queue is None:
                log_error(f"Queue name not found for Strategy {self.strategy_id}.")
                return None

            url = (
                f"{AWS_SQS.URL.value}/{AWS_SQS.ACCOUNT_ID.value}/{self.strategy_queue}"
            )

            for alert in self.alerts:
                exchange, symbol, token = alert.split(", ")
                message = f"{exchange.strip()}, {symbol.strip()}, {token.strip()}"

                try:
                    # Publish to SQS
                    arguments = {"mode": self.topic_mode, "topic": topic_name, "message": message, "subject": subject}
                    publish_queue_message = self.object_sqs_manager.get_action("publish_queue_message", **arguments)
                    response = publish_queue_message.execute()

                    if "MessageId" in response:
                        successfully_published.append(message)
                    else:
                        log_error("Failed to get Message ID in response.")
                except Exception as error:
                    log_error(f"Error publishing message to SQS: {str(error)}")

                time.sleep(1)
                if len(successfully_published) == len(self.alerts):
                    log_info("Alerts Published ...COMPLETE!")
                    break
