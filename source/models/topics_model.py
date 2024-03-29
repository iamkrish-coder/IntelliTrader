# source/models/topics_model.py

from source.models.BaseModel import BaseModel
from datetime import datetime

class TopicsModel(BaseModel):
    def __init__(self, 
            topic_arn, 
            created_date, 
            topic_name, 
            is_active     = False, 
            is_published  = True, 
            is_subscribed = False, 
            is_deleted    = False):
        super().__init__()

        self.topic_arn        = topic_arn
        self.created_date     = created_date
        self.topic_name       = topic_name
        self.is_active        = is_active
        self.is_published     = is_published
        self.is_subscribed    = is_subscribed
        self.is_deleted       = is_deleted

