# source/modules/configurations/configuration_module.py

import json
import os

from source.constants.constants import *
from source.enumerations.enums import *

class Configuration: 
    def __init__(self):
     pass
    
    @classmethod
    def read_input_configuration(self):
        with open(CONFIGURATION_PATH + '/config.json', 'r') as f:
            config = json.load(f)
        return config