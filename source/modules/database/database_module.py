# source/controllers/database_controller.py
"""
DatabaseController
"""
import json

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
        self.connection                     = connection
        self.modules                        = modules
        self.app_configuration              = app_configuration
        self.table_configuration            = table_configuration        
        self.tables_list                    = None
        self.table_to_delete                = None # Get this from app_config // Todo
        
    ###########################################
    # Initialize Database Controller
    ###########################################  
    
    def initialize(self):
        log_info(f"We are setting up the database for the first time. Hang tight, we're on it!")    
        self.manage_tables()
        self.manage_topics()
        # self.manage_queues()
                       
    def manage_tables(self):
        """
        Pre-Requisite Database Operations
        """
        if len(self.table_configuration) == 0:
            log_info(f"No tables to manage.")
            return
            
        for config in self.table_configuration.values():
            table = config["table_key"] 

            # 1. Delete Existing Tables
            if self.table_to_delete is not None and table == self.table_to_delete:
                object_delete_table_handler = DatabaseDeleteTable(table, config)
                object_delete_table_handler.initialize()

            # 2. Create Required Tables
            object_create_table_handler = DatabaseCreateTable(table, config)
            object_create_table_handler.initialize()


    def manage_topics(self):
        """
        Pre-Requisite Topic Operations
        Get Strategies list from database
        Create topics for respective strategies
        """

        strategy_list = self.manage_strategies()
        topic_mode = self.app_configuration.get("topic_type")

        for strategy in strategy_list:
            strategy_id = strategy.get('strategy_id')
            topic_arn, topic_name = self.generate_aws_sns_topic_details(strategy_id, topic_mode)
            
            # if topic_mode and topic_name:
            #     log_info(f"Creating topic for Strategy {strategy_id}")
            # else:
            #     log_info(f"Skipping topic creation for Strategy {strategy_id}")
            #     continue    

            object_sns_topics_manager = SNSTopicsManager()
            arguments = {"mode": topic_mode, "name": topic_name}
            
            # 1. Create Topic
            create_topic = object_sns_topics_manager.get_action("create_topic", **arguments)
            # create_topic.execute()

            # 2. Delete Topic
            arguments = {"topic_arn": topic_arn}
            delete_topic = object_sns_topics_manager.get_action("delete_topic", **arguments) 
            # delete_topic.execute()

            # 3. List Subscriptions
            arguments = {"topic_arn": topic_arn}
            list_subscriptions = object_sns_topics_manager.get_action("list_subscriptions", **arguments) 
            # list_subscriptions.execute()

            # 4. List Topics
            arguments = {}
            list_topics = object_sns_topics_manager.get_action("list_topics", **arguments) 
            # list_topics.execute()

            # 5. Publish Topics

            # 6. Subscribe Topics

            # 7. Unsubscribe Topics
            subscription_arn = ""
            arguments = {'subscription_arn': subscription_arn}
            unsubscribe_topic = object_sns_topics_manager.get_action("unsubscribe_topic", **arguments) 
            unsubscribe_topic.execute()

        exit()

        
    def manage_queues(self):
        """
        Pre-Requisite Queue Operations
        """
        pass
    
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
        return self.manage_table_records(list_strategies)


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
            }
        }

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