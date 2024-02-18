import pandas as pd
import os
import json
from source.constants.constants import *

class Helper:
    def __init__(self, params=None):
        self.prop = params
        self.output_path = OUTPUT_PATH
        self.create_output_directory()

    def create_output_directory(self):
        if not os.path.exists(self.output_path):
            os.mkdir(self.output_path)
    
    def write_text_output(self, filename, data):
        with open(os.path.join(self.output_path, filename), 'w') as file:
            if isinstance(data, dict):
                json.dump(data, file, indent=4)
            else:
                file.write(str(data))

    def write_csv_output(self, filename, data):
        csv_data = pd.DataFrame(data)
        csv_data.to_csv(os.path.join(self.output_path, filename), index=False)

    def convert_enum_to_class_name(self, enum_name):
        words = str(enum_name).split('_')
        converted = ''.join(word.capitalize() for word in words)
        return converted

    def get_execution_time(self, start_time, end_time):
        return end_time - start_time
        # start_time = time.time()                 
        # end_time = time.time()
        # execution_time = end_time - start_time
        # logging.info(f"Execution time: {execution_time} seconds")
   
