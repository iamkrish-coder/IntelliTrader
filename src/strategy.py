from src.helper import Helper
import src.strategies.options as options
import logging

class Strategy:
    def __init__(self, params):
        self.prop = params
    
    def execute_handler(self, common_utils, user_input):
        match user_input['type']:
            case 'options':
                self.init_options(common_utils, user_input)

            ####### Not implemented for now #######
            case 'delivery':
               pass
               print('Scheduled for a future release or currently in the pipeline.') 
            case 'intraday':
               pass
               print('Scheduled for a future release or currently in the pipeline.') 
            case 'futures':
               pass
               print('Scheduled for a future release or currently in the pipeline.') 
            case _:
                self.invalid_option(common_utils, user_input)


    def init_options(self, common_utils, user_input):
        try:
            strategy_action = user_input['action']
            if strategy_action is not None and strategy_action.strip():
                dataset = {
                    'common_utils': common_utils,
                    'user_input': user_input
                }
                match strategy_action:
                    case 'buy':
                        options.nifty_scalper(self, dataset)
                    case 'sell':
                        pass
                    case _:
                        logging.warn("The strategy type provided is not valid") 
            else:
                logging.error("Failed to load Options Strategy") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))


    def invalid_option(self, common_utils, user_input):
        # Invalid strategy option provided
        logging.warn("The strategy option provided is not valid") 