from src.helper import Helper
import src.libs.nse_historical_data as nse_data

class Libs:
    def __init__(self, params):
        self.prop = params

    def execute_handler(self, user_input):
        match user_input['type']:
            case 'daily':
                nse_data.get_historical_data_for_current_year(user_input)
            case 'historical':
                nse_data.get_historical_data(user_input)                
            case _:
                self.invalid_option(user_input)
                
