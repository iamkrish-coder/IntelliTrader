import os
import src.libraries.backtest as backtest
import src.libraries.nse_data as nsedata
from src.helper import Helper

class Libs:
    def __init__(self, params):
        self.prop = params

    def execute_handler(self, user_input):
        match user_input['type']:
            case 'daily':
                return(backtest.get_daily_historical_data(nsedata, user_input))
            case 'multi':
                backtest.get_multiple_historical_data(user_input)                
            case _:
                self.invalid_option(user_input)
                
