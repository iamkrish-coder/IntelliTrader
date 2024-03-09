import pandas as pd
import os
import json
from source.constants.constants import *
from source.shared.logging_utils import *

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
        # log_info(f"Execution time: {execution_time} seconds")
   
    def format_json_output_print(self, dictionary_data, label, prettier=False, indent=4):
        """
        Formats JSON data into a human-readable string.

        Parameters:
        - dictionary_data (str): JSON data as a string.
        - indent (int): Number of spaces to use for indentation (default is 4).

        Returns:
        - str: Formatted JSON string.
        """
        
        try:
            
            # Convert the dictionary back to a formatted JSON string
            if prettier:
                formatted_json = json.dumps(dictionary_data, indent=indent)
            else:
                formatted_json = dictionary_data
                
            print(f"\n ******** {label} ********\n")
            print(formatted_json)

        except Exception as e:
            log_error(f"Error occurred while formatting data: {str(e)}")