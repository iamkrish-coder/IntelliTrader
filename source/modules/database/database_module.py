# source/controllers/database_controller.py
"""
DatabaseController
"""
import json
import time

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.aws.sns.aws_sns_manager import SNSManager
from source.aws.sqs.aws_sqs_manager import SQSManager
from source.models.strategies_model import StrategiesModel
from source.models.topics_model import TopicsModel
from source.models.queues_model import QueuesModel

from source.modules.database.BaseDatabase import BaseDatabase
from source.modules.database._database_create_table import DatabaseCreateTable
from source.modules.database._database_delete_table import DatabaseDeleteTable
from source.modules.database._database_insert_record import DatabaseInsertRecord
from source.modules.database._database_update_record import DatabaseUpdateRecord

# from source.modules.database._database_delete_record import DatabaseDeleteRecord
from source.modules.database._database_fetch_record import DatabaseFetchRecord


class Database(BaseDatabase):

    def __init__(self, connection, modules, app_configuration, table_configuration):
        self.connection = connection
        self.modules = modules
        self.app_configuration = app_configuration
        self.table_configuration = table_configuration
        self.object_sns_manager = SNSManager()
        self.object_sqs_manager = SQSManager()
        self.topic_mode = self.app_configuration.get("topic_type")
        self.queue_mode = self.app_configuration.get("queue_type")
        self.reset_app = self.app_configuration.get("reset_app")
        self.strategy_list = []


    ###########################################
    # Initialize Database Controller
    ###########################################

    def initialize(self):
        log_info(f" ********* Setting up the application requirements... Hang tight, we're on it! ********* ")
        self.restore_factory_defaults()
        self.manage_tables()
        self.manage_strategies()
        self.manage_topics()
        self.manage_queues()
        self.manage_subscriptions()
        

    def prepare_request_parameters(self, event, table, model, dataset=None, projection=[], filters={}):
        attributes = None
        config = self.table_configuration[table]
        if model and dataset is not None:
            attributes = model(**dataset).convert_table_rows_to_dict(config)
        return {
            "event": event,
            "table": table,
            "config": config,
            "data": {
                "attributes": attributes,
                "projection": projection,
                "filters": filters,
            },
        }


    def database_request(self, request):
        log_info(f"Requesting AWS DynamoDB...")
        return self.manage_table_records(request)


    def restore_factory_defaults(self):
        # Reset Tables (if required)
        if self.reset_app is True:           
            log_info("Resetting the application to its factory defaults. Please wait...")

            # Delete Tables | Delete Caches | Delete Configs
            for config in self.table_configuration.values():
                table = config["table_key"]
                object_delete_table_handler = DatabaseDeleteTable(table, config)
                object_delete_table_handler.initialize()
                            
            # Delete Subscriptions 
            self.delete_subscriptions()

            # Delete Topics
            self.delete_topics()
            
            # Delete Queues
            self.delete_queues()


    def delete_subscriptions(self):
        list_subscriptions = self.object_sns_manager.get_action("list_subscriptions", **{})
        subscriptions = list_subscriptions.execute()
        subscription_list = subscriptions.get("Subscriptions")
        if subscription_list is not None:
            for subscription in subscription_list:
                subscription_arn = subscription.get("SubscriptionArn")
                arguments = {"subscription_arn": subscription_arn}
                unsubscribe_topic = self.object_sns_manager.get_action("unsubscribe_topic", **arguments)
                unsubscribe_topic.execute()
                # TODO : Update DB is_subscribed = False and is_active = False



    def delete_topics(self):
        list_topics = self.object_sns_manager.get_action("list_topics", **{})
        topics_list = (list_topics.execute()).get("Topics")

        if topics_list is not None:
            for topics in topics_list:
                topic_arn = topics.get("TopicArn")
                arguments = {"topic_arn": topic_arn}
                delete_topic = self.object_sns_manager.get_action("delete_topic", **arguments)
                delete_topic.execute()


    def delete_queues(self):
        list_queues = self.object_sqs_manager.get_action("list_queues", **{})
        queues_list = (list_queues.execute()).get("QueueUrls")

        if queues_list is not None:
            for queues in queues_list:
                queue_url = queues
                arguments = {"queue_url": queue_url}
                delete_queue = self.object_sqs_manager.get_action("delete_queue", **arguments)
                delete_queue.execute()


    def manage_tables(self):
        """
        Pre-Requisite Table Operations
        """
        if len(self.table_configuration) == 0:
            log_info(f"No tables to manage.")
            return

        # Create Required Tables
        for config in self.table_configuration.values():
            table = config["table_key"]
            object_create_table_handler = DatabaseCreateTable(table, config)
            object_create_table_handler.initialize()

        
    def get_strategy_list(self):
        dataset = None
        list_strategies = self.prepare_request_parameters(
            event=Events.SCAN.value,
            table=Tables.TABLE_STRATEGIES.value,
            model=StrategiesModel,
            dataset=dataset,
            projection=["strategy_id", "strategy_name"],
        )
        self.strategy_list = self.manage_table_records(list_strategies)


    def manage_strategies(self):
        """
        Pre-Requisite Strategy Operations
        """
        saved_strategy_list = []
        self.get_strategy_list()

        if self.strategy_list is not None:
            for strategy in self.strategy_list:
                saved_strategy_list.append(strategy.get("strategy_id"))

        for filename in os.listdir(ALGORITHM_PATH):
            strategy_id, name, description = self.generate_strategy_details(filename)

            if strategy_id in saved_strategy_list:
                continue

            current_date = time.strftime("%Y-%m-%d %H:%M:%S")        
            dataset = {
                "strategy_id": strategy_id,
                "strategy_name": name,
                "strategy_description": description,
                "created_date": current_date
            }
            save_strategies = self.prepare_request_parameters(
                event=Events.PUT.value,
                table=Tables.TABLE_STRATEGIES.value,
                model=StrategiesModel,
                dataset=dataset
            )
            self.database_request(save_strategies)

        strategy = self.app_configuration.get("strategy")
        self.selected_strategy = self.app_configuration.get(f"strategy_{strategy}_params").get("strategy_id")


    def manage_topics(self):
        """
        Pre-Requisite Topic Operations
        """
        # List Topics
        arguments = {}
        list_topics = self.object_sns_manager.get_action("list_topics", **arguments)
        response = list_topics.execute()
        topics_list = response.get("Topics")

        # Create Topic
        if self.strategy_list is None:
            self.get_strategy_list()
            
        if self.strategy_list is None:
            log_info(f"No Strategy Topics to manage.")
            return
        else:
            saved_topics_list = []
            if topics_list is not None and topics_list != []:
                for topics in topics_list:
                    saved_topics_list.append(topics.get("TopicArn"))

            for strategy in self.strategy_list:
                strategy_id = strategy.get("strategy_id")
                topic_arn, topic_name = self.generate_aws_sns_topic_details(strategy_id, self.topic_mode)
                
                if topic_arn in saved_topics_list:
                    log_info(f"Skipping topic creation for Strategy {strategy_id}")
                    continue

                # Create Topic in AWS SNS 
                arguments = {"mode": self.topic_mode, "name": topic_name}
                create_topic = self.object_sns_manager.get_action("create_topic", **arguments)
                create_topic.execute()
                
                # Add entry to AWS DynamoDB
                current_date = time.strftime("%Y-%m-%d %H:%M:%S")      
                dataset = {
                    "topic_arn": topic_arn,
                    "topic_name": topic_name,
                    "strategy_id": strategy_id,
                    "created_date": current_date
                }
                save_topics = self.prepare_request_parameters(
                    event=Events.PUT.value,
                    table=Tables.TABLE_TOPICS.value,
                    model=TopicsModel,
                    dataset=dataset
                )
                self.database_request(save_topics)                    


    def manage_queues(self):
        """
        Pre-Requisite Queue Operations
        """
        # List Queues
        arguments = {}
        list_queues = self.object_sqs_manager.get_action("list_queues", **arguments)
        response = list_queues.execute()
        queues_list = response.get("QueueUrls")

        # Create Queue
        if self.strategy_list is None:
            self.get_strategy_list()
            
        if self.strategy_list is None:
            log_info(f"No Strategy Queues to manage.")
            return
        else:
            saved_queues_list = []
            if queues_list is not None and queues_list != []:
                for queues in queues_list:
                    saved_queues_list.append(queues)

            for strategy in self.strategy_list:
                strategy_id = strategy.get("strategy_id")
                queue_arn, queue_name, queue_url = self.generate_aws_sqs_queue_details(strategy_id, self.queue_mode)

                if queue_url in saved_queues_list:
                    log_info(f"Skipping Queue creation for Strategy {strategy_id}")
                    continue

                # Create Queue in AWS SQS 
                arguments = {"mode": self.queue_mode, "name": queue_name}
                create_queue = self.object_sqs_manager.get_action("create_queue", **arguments)
                create_queue.execute()

                # Add entry to AWS DynamoDB
                current_date = time.strftime("%Y-%m-%d %H:%M:%S")      
                dataset = {
                    "queue_arn": queue_arn,
                    "queue_name": queue_name,
                    "queue_url": queue_url,
                    "strategy_id": strategy_id,
                    "created_date": current_date
                }
                save_queues = self.prepare_request_parameters(
                    event=Events.PUT.value,
                    table=Tables.TABLE_QUEUES.value,
                    model=QueuesModel,
                    dataset=dataset
                )
                self.database_request(save_queues)      
            

    def manage_subscriptions(self):
        """
        Pre-Requisite Subscription Operations
        """
        if self.strategy_list is None:
            log_info(f"No Strategy Subscriptions to manage.")
            return
        for strategy in self.strategy_list:
            strategy_id = strategy.get("strategy_id")
            topic_arn, topic_name = self.generate_aws_sns_topic_details(strategy_id, self.topic_mode)
            queue_arn, queue_name, queue_url = self.generate_aws_sqs_queue_details(strategy_id, self.queue_mode)

            # List Subscriptions
            arguments = {"topic_arn": topic_arn}
            list_subscriptions = self.object_sns_manager.get_action("list_subscriptions", **arguments)
            subscriptions = list_subscriptions.execute()
            subscription_list = subscriptions.get("Subscriptions")

            if subscription_list is not None and subscription_list != []:
                for subscription in subscription_list:
                    if subscription.get("Endpoint") != queue_arn:
                        self.create_save_subscriptions(topic_arn, queue_arn)
                        log_info(f"Subscription created for {topic_name}!")
                    else:
                        log_info(f"Skipping Subscription creation for {topic_name}, Topic already Subscribed!")                        
            else:
                self.create_save_subscriptions(topic_arn, queue_arn)
                log_info(f"Subscription created for {topic_name}!")


    def create_save_subscriptions(self, topic_arn, queue_arn):
        # Create Subscription in AWS SNS 
        if topic_arn is not None and queue_arn is not None:
            arguments = {
                "topic_arn": topic_arn,
                "protocol": SQS,
                "endpoint": queue_arn,
                "attributes": {},
            }
            subscribe_topic = self.object_sns_manager.get_action("subscribe_topic", **arguments)
            subscribe_topic.execute()

            # Add entry to AWS DynamoDB
            modified_date = time.strftime("%Y-%m-%d %H:%M:%S")      
            dataset = {
                "topic_arn": topic_arn,
                "modified_date": modified_date,
                "is_subscribed": True,
                "is_active": True
            }
            update_topics = self.prepare_request_parameters(
                event=Events.UPDATE.value,
                table=Tables.TABLE_TOPICS.value,
                model=TopicsModel,
                dataset=dataset
            )
            self.database_request(update_topics)

    def manage_table_records(self, dataset):
        event = dataset.get("event")
        table = dataset.get("table")
        config = dataset.get("config")
        data = dataset.get("data")

        match event:
            case "get" | "query" | "scan":
                object_fetch_record_handler = DatabaseFetchRecord(event, table, config, data)
                return object_fetch_record_handler.initialize()

            case "put":
                object_insert_record_handler = DatabaseInsertRecord(event, table, config, data)
                return object_insert_record_handler.initialize()

            case "update":
                object_update_record_handler = DatabaseUpdateRecord(event, table, config, data)
                return object_update_record_handler.initialize()

            case "delete":
                # Handle "delete" event logic here
                pass

            case _:  # Default case
                log_warn(f"Unknown event type: {event}")
