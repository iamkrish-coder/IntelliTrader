# source/models/topics_model.py

from source.models.BaseModel import BaseModel

class TopicsModel(BaseModel):
    def __init__(self, 
            topic_arn     = None, 
            created_date  = None, 
            topic_name    = None, 
            is_active     = None, 
            is_published  = None, 
            is_subscribed = None, 
            is_deleted    = None):
        super().__init__()

        self.topic_arn        = topic_arn
        self.created_date     = created_date
        self.topic_name       = topic_name
        self.is_active        = is_active
        self.is_published     = is_published
        self.is_subscribed    = is_subscribed
        self.is_deleted       = is_deleted

