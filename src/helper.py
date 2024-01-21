import pandas as pd
import os
import datetime as dt

class Helper:
    def __init__(self, params):
        self.prop = params

    # Store output to a text file
    def write_text_output(filename, data):
        path = './src/output'
        if os.path.exists(path):
            with open(path + '/' + filename, 'w') as file:
                file.write(data)
        else :
            os.mkdir(path)
            with open(path + '/' + filename, 'w') as file:
                file.write(data)

    # Store output to a csv file
    def write_csv_output(filename, data):
        path = './src/output'
        if os.path.exists(path):
            csv_data = pd.DataFrame(data)
            csv_data.to_csv(path + '/' + filename, index=False)
        else :
            os.mkdir(path)
            csv_data = pd.DataFrame(data)
            csv_data.to_csv(path + '/' + filename, index=False)
    
    def convert_enum_to_class_name(self, enum_name):
        words = str(enum_name).split('_')
        converted = ''.join(word.capitalize() for word in words)
        return converted






