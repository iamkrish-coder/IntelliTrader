# source/models/topics_model.py

from datetime import datetime

class TopicsModel:
    def __init__(self, topic_arn, 
        topic_name,
        is_active      =  False,
        is_published   =  True,
        is_subscribed  =  False,
        is_deleted     =  False,
        created_by     =  "IntelliTrader",
        created_date   =  "1992-07-11",
        modified_date  =  "1992-07-11"
    ):
        self.topic_arn     = topic_arn
        self.topic_name    = topic_name
        self.is_active     = is_active
        self.is_published  = is_published
        self.is_subscribed = is_subscribed
        self.is_deleted    = is_deleted
        self.created_by    = created_by
        self.created_date  = datetime.utcnow().strftime('%Y-%m-%d')
        self.modified_date = datetime.utcnow().strftime('%Y-%m-%d')


    def convert_object_to_dict(self):
        """
        Converts the TopicsModel object attributes to a dictionary.
        """
        data_dict = {}
        # Get all public attributes (excluding methods)
        for attr_name, attr_value in self.__dict__.items():
            if not callable(attr_value):  
                data_dict[attr_name] = attr_value
        return data_dict


    def convert_key_to_dict(self):
        """
        Converts the TopicsModel object attributes to a dictionary.
        """
        data_dict = {}
        # Get all public attributes (excluding methods)
        for attr_name, attr_value in self.__dict__.items():
            if not callable(attr_value):  
                data_dict[attr_name] = attr_value
        return data_dict