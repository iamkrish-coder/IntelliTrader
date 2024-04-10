# handlers/strategy
import boto3
import time

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.utils.caching_utils import *
from source.aws.sqs.aws_sqs_manager import aws_sqs_publish
from source.aws.sns.aws_sns_manager import aws_sns_publish
from source.models.topics_model import TopicsModel
from source.modules.strategy.BaseStrategy import BaseStrategy


class StrategyPublisher(BaseStrategy):
    def __init__(self, modules, parameters, database, alerts, aws_service):
        self.modules = modules
        self.parameters = parameters
        self.database = database
        self.alerts = alerts
        self.aws_service = aws_service
        self.sns_client = boto3.client(SNS, region_name=REGION_NAME)
        self.sqs_client = boto3.client(SQS, region_name=REGION_NAME)

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

    def get_or_create_topic(self):

        log_info(f"Checking Existing SNS Topic...")
        dataset = {
                    "topic_arn": self.topic_arn,
                    "created_date": self.date_time_now,
                    "topic_name": self.topic_name,
                    "is_active": False,
                    "is_published": False,
                    "is_subscribed": False,
                    "is_deleted": False,
                }
        existing_topic_params = self.prepare_request_parameters(
            event=Events.QUERY.value,
            table=Tables.TABLE_TOPICS.value,
            model=TopicsModel,
            dataset=dataset,
            projection=["topic_arn", "topic_name"],
        )
        existing_topic = self.database_request(existing_topic_params)

        if existing_topic:
            cached_value = [dataset]
        else:
            log_info(f"Creating SNS Topic...")
            dataset = {
                "topic_arn": self.topic_arn,
                "created_date": self.date_time_now,
                "topic_name": self.topic_name,
                "is_active": False,
                "is_published": False,
                "is_subscribed": False,
                "is_deleted": False,
            }
            create_topic_params = self.prepare_request_parameters(
                event=Events.PUT.value,
                table=Tables.TABLE_TOPICS.value,
                model=TopicsModel,
                dataset=dataset,
            )
            self.database_request(create_topic_params)
            cached_value = [dataset]

        cached_key = f"{TABLE_TOPICS}_{self.topic_name}"
        set_cached_item(
            Cache_Type.DISK.value, 
            CACHE_TOPICS_DIR, 
            cached_key, 
            cached_value
        )

    def set_topic_published_status(self):

        log_info(f"Updating SNS Topic status...")                                
        dataset = {
            "topic_arn": self.topic_arn,
            "topic_name": self.topic_name,
            "is_active": True,
            "is_published": True,
        }
        update_topic_params = self.prepare_request_parameters(
            event=Events.UPDATE.value,
            table=Tables.TABLE_TOPICS.value,
            model=TopicsModel,
            dataset=dataset,
        )
        self.database_request(update_topic_params)

        cached_key = f"{TABLE_TOPICS}_{self.topic_name}_{IS_PUBLISHED}"
        cached_value = [dataset]
        set_cached_item(
            Cache_Type.DISK.value,
            CACHE_TOPICS_DIR,
            cached_key,
            cached_value,
        ) 

    def publish(self):
        ###############
        # SNS PUBLISH #
        ###############
        self.date_time_now = time.strftime("%Y-%m-%d %H:%M:%S")
        if self.aws_service == SNS:

            successfully_published = []
            topic_type = self.parameters.get('runtime_params.topic_type')            
            strategy_id = self.parameters.get('strategy_params.strategy_id')
            if strategy_id is None:
                log_error("Strategy ID is missing from parameters.")
                return None    

            self.topic_arn, self.topic_name = self.generate_aws_sns_topic_arn(strategy_id, topic_type)

            # Check existing disk cache
            cached_key = f"{TABLE_TOPICS}_{self.topic_name}"
            cached_value = get_cached_item(
                Cache_Type.DISK.value, 
                CACHE_TOPICS_DIR, 
                cached_key
            )

            if not cached_value:
                self.get_or_create_topic()  
                
            for alert in self.alerts:
                exchange, symbol, token = alert.split(",")
                message = f"{exchange.strip()}, {symbol.strip()}, {token.strip()}"
                subject = "Stock Alert"

                try:
                    response = aws_sns_publish(self.sns_client, self.topic_arn, message, subject)
                    if "MessageId" in response:
                        successfully_published.append(message)
                    else:
                        log_error("Failed to get Message ID in response.")
                except Exception as e:
                    log_error(f"Error publishing message to SNS: {str(e)}")

                time.sleep(1)

                if len(successfully_published) == len(self.alerts):
                    config = self.database.table_configuration.get(Tables.TABLE_TOPICS.value)
                    if config:
                        cached_key = f"{TABLE_TOPICS}_{self.topic_name}_{IS_PUBLISHED}"
                        cached_value = get_cached_item(
                            Cache_Type.DISK.value, 
                            CACHE_TOPICS_DIR, 
                            cached_key
                        )

                        if cached_value is None:
                            self.set_topic_published_status()

                    log_info("Alerts Published ...COMPLETE!")
                    break

        ###############
        # SQS PUBLISH #
        ###############
        if self.aws_service == SQS:
            successfully_published = []
            strategy_id = self.parameters.get("strategy_id")

            if strategy_id is None:
                log_error("Strategy ID is missing from parameters.")
                return None

            self.strategy_queue = self.get_aws_sqs_queue_name(strategy_id)
            if self.strategy_queue is None:
                log_error(f"Queue name not found for Strategy {strategy_id}.")
                return None

            url = (
                f"{AWS_SQS.URL.value}/{AWS_SQS.ACCOUNT_ID.value}/{self.strategy_queue}"
            )

            for alert in self.alerts:
                exchange, symbol, token = alert.split(", ")
                message = f"{exchange.strip()}, {symbol.strip()}, {token.strip()}"

                try:
                    response = aws_sqs_publish(self.client, message, url)

                    if "MessageId" in response:
                        successfully_published.append(message)
                    else:
                        log_error("Failed to get Message ID in response.")
                except Exception as e:
                    log_error(f"Error publishing message to SQS: {str(e)}")

                time.sleep(1)
                if len(successfully_published) == len(self.alerts):
                    log_info("Alerts Published ...COMPLETE!")
                    break
