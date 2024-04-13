# source/controllers/database_controller.py
"""
DatabaseController
"""
import json
import time

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *
from source.aws.sns.aws_sns_manager import SNSTopicsManager
from source.models.strategies_model import StrategiesModel
from source.models.topics_model import TopicsModel

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
        self.object_sns_topics_manager = SNSTopicsManager()
        self.topic_mode = self.app_configuration.get("topic_type")
        self.queue_mode = self.app_configuration.get("queue_type")
        self.reset_tables = self.app_configuration.get("reset_tables")
        self.reset_topics = self.app_configuration.get("reset_topics")
        self.reset_queues = self.app_configuration.get("reset_queues")


    ###########################################
    # Initialize Database Controller
    ###########################################

    def initialize(self):
        log_info(f" ********* Setting up the application requirements... Hang tight, we're on it! ********* ")
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


    def manage_tables(self):
        """
        Pre-Requisite Table Operations
        """
        if len(self.table_configuration) == 0:
            log_info(f"No tables to manage.")
            return

        # 1. Delete Specified Tables
        if self.reset_tables is not None and self.reset_tables is not False:
            tables_to_delete = []
            if self.reset_tables is True:
                tables_to_delete = "ALL"
            elif isinstance(self.reset_tables, list):
                tables_to_delete = self.reset_tables  
            else:
                tables_to_delete = []  

            for config in self.table_configuration.values():
                table = config["table_key"]
                if table in tables_to_delete or tables_to_delete == "ALL":
                    object_delete_table_handler = DatabaseDeleteTable(table, config)
                    object_delete_table_handler.initialize()

        # 2. Create Required Tables
        for config in self.table_configuration.values():
            table = config["table_key"]
            object_create_table_handler = DatabaseCreateTable(table, config)
            object_create_table_handler.initialize()
            

    def sync_strategies(self):
        """
        Load/Sync Strategies to cloud
        """
        saved_strategy_list = []
        if self.strategy_list is not None:
            for strategy in self.strategy_list:
                saved_strategy_list.append(strategy.get("strategy_id"))

        for filename in os.listdir(ALGORITHM_PATH):
            if os.path.isfile(os.path.join(ALGORITHM_PATH, filename)) and not filename.startswith('.'):
                strategy_name = os.path.splitext(filename)[0]
                parts = strategy_name.split('-')

                # Check if the split length matches the expected format (4 parts)
                if len(parts) != 4:
                    log_error(f"Warning: Unexpected format for strategy name: {strategy_name}")
                    continue

                strategy_id, name, description = parts[1], parts[2], parts[3]
                current_date = time.strftime("%Y-%m-%d %H:%M:%S")        

                if strategy_id in saved_strategy_list:
                    continue
    
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

        
    def manage_strategies(self):
        """
        Pre-Requisite Strategy Operations
        """
        dataset = None
        list_strategies = self.prepare_request_parameters(
            event=Events.SCAN.value,
            table=Tables.TABLE_STRATEGIES.value,
            model=StrategiesModel,
            dataset=dataset,
            projection=["strategy_id", "strategy_name"],
        )
        self.strategy_list = self.manage_table_records(list_strategies)
        self.sync_strategies()
        strategy = self.app_configuration.get("strategy")
        self.selected_strategy = self.app_configuration.get(f"strategy_{strategy}_params").get("strategy_id")


    def manage_topics(self):
        """
        Pre-Requisite Topic Operations
        """
        # List Topics
        arguments = {}
        list_topics = self.object_sns_topics_manager.get_action("list_topics", **arguments)
        response = list_topics.execute()
        topics_list = response.get("Topics")

        # Delete Topic
        if self.reset_topics is not None and self.reset_topics is True:
            for topics in topics_list:
                topic_arn = topics.get("TopicArn")
                arguments = {"topic_arn": topic_arn}
                delete_topic = self.object_sns_topics_manager.get_action("delete_topic", **arguments)
                delete_topic.execute()

        # Create Topic
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

                # Create Topic in AWS SNS and add entry to AWS DynamoDB
                arguments = {"mode": self.topic_mode, "name": topic_name}
                create_topic = self.object_sns_topics_manager.get_action("create_topic", **arguments)
                create_topic.execute()
                
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
        if self.strategy_list is None:
            log_info(f"No Strategy Queues to manage.")
            return


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
            list_subscriptions = self.object_sns_topics_manager.get_action("list_subscriptions", **arguments)
            list_subscriptions.execute()

            arguments = {
                "topic_arn": topic_arn,
                "protocol": SQS,
                "endpoint": queue_arn,
                "attributes": {},
            }
            subscribe_topic = self.object_sns_topics_manager.get_action("subscribe_topic", **arguments)
            # subscribe_topic.execute()

        if self.app_configuration.get("reset_topics"):
            subscription_arn = ""
            arguments = {"subscription_arn": subscription_arn}
            unsubscribe_topic = self.object_sns_topics_manager.get_action("unsubscribe_topic", **arguments)
            # unsubscribe_topic.execute()


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
                # You could raise an exception here if needed
