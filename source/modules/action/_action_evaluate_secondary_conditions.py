# handlers/actions

from source.constants.constants import *
from source.enumerations.enums import *
from source.utils.logging_utils import *

class ActionEvaluateSecondaryConditions():
    def __init__(self, modules, candlesticks_data_list, parameters):
        self.modules = modules
        self.candlesticks_data_list = candlesticks_data_list
        self.parameters = parameters
        
    def initialize(self):
        return self.evaluate_secondary_conditions()
        
    def evaluate_secondary_conditions(self):
    
        results = []

        for stock_index, (candlestick_data) in enumerate(zip(self.candlesticks_data_list)):
            
            try:
                 # Extracting stock details from candlestick_data
                exchange = candlestick_data['exchange']
                symbol   = candlestick_data['symbol']
                token    = candlestick_data['token']

                # Extracting candlestick data
                candles_today_1m           = candlestick_data['candlestick_data'][0]  # First dataframe
                candles_today_2m           = candlestick_data['candlestick_data'][1]  # Second dataframe
                candles_today_3m           = candlestick_data['candlestick_data'][2]  # Third dataframe

                # 1 Minute
                last_open_today_1m, last_high_today_1m, last_low_today_1m, last_close_today_1m, last_volume_today_1m                                    = self.get_nth_last_prices(candles_today_1m, 1)
                second_last_open_today_1m, second_last_high_today_1m, second_last_low_today_1m, second_last_close_today_1m, second_last_volume_today_1m = self.get_nth_last_prices(candles_today_1m, 2)
                third_last_open_today_1m, third_last_high_today_1m, third_last_low_today_1m, third_last_close_today_1m, third_last_volume_today_1m      = self.get_nth_last_prices(candles_today_1m, 3)

                # 2 Minute
                last_open_today_2m, last_high_today_2m, last_low_today_2m, last_close_today_2m, last_volume_today_2m                                    = self.get_nth_last_prices(candles_today_2m, 1)
                second_last_open_today_2m, second_last_high_today_2m, second_last_low_today_2m, second_last_close_today_2m, second_last_volume_today_2m = self.get_nth_last_prices(candles_today_2m, 2)
                third_last_open_today_2m, third_last_high_today_2m, third_last_low_today_2m, third_last_close_today_2m, third_last_volume_today_2m      = self.get_nth_last_prices(candles_today_2m, 3)

                # 3 Minute
                last_open_today_3m, last_high_today_3m, last_low_today_3m, last_close_today_3m, last_volume_today_3m                                    = self.get_nth_last_prices(candles_today_3m, 1)
                second_last_open_today_3m, second_last_high_today_3m, second_last_low_today_3m, second_last_close_today_3m, second_last_volume_today_3m = self.get_nth_last_prices(candles_today_3m, 2)
                third_last_open_today_3m, third_last_high_today_3m, third_last_low_today_3m, third_last_close_today_3m, third_last_volume_today_3m      = self.get_nth_last_prices(candles_today_3m, 3)

                # Last candle
                last_candle_today_1m = self.get_last_n_candles(candles_today_1m, 1)
                last_candle_today_2m = self.get_last_n_candles(candles_today_2m, 1)
                last_candle_today_3m = self.get_last_n_candles(candles_today_3m, 1)
        
                # Second last candle
                second_last_candle_today_1m = self.get_last_n_candles(candles_today_1m, 2)
                second_last_candle_today_2m = self.get_last_n_candles(candles_today_2m, 2)
                second_last_candle_today_3m = self.get_last_n_candles(candles_today_3m, 2)
        
                if self.strategy_type.upper() == Strategy_Type.LONG.value:
            
                    # Check if the last obtained candles are green
                    is_last_1m_green = self.is_green(last_candle_today_1m)
                    is_last_2m_green = self.is_green(last_candle_today_2m)
                    is_last_3m_green = self.is_green(last_candle_today_3m)
        
                    is_higher_high_1m = self.is_higher_high(last_candle_today_1m, second_last_candle_today_1m)
                    is_higher_high_2m = self.is_higher_high(last_candle_today_2m, second_last_candle_today_2m)
                    is_higher_high_3m = self.is_higher_high(last_candle_today_3m, second_last_candle_today_3m)
            
                    # Generate a buy signal if all last obtained candles are green
                    try:
                        # if is_last_1m_green.item() and is_last_2m_green.item():
                        #     # buy signal 
                        #     return True    
                        # elif is_last_2m_green.item() and is_last_3m_green.item():
                        #     # buy signal 
                        #     return True    
                        # elif is_last_3m_green.item(): 
                        #     # buy signal             
                        #     return True    
                        # else: 
                        #     return False
            
                        return True 
                    
                    except Exception as error:
                        log_error(f"An error occurred while evaluating secondary conditions for Long Trade: {str(error)}")
                        return False


                elif self.strategy_type.upper() == Strategy_Type.SHORT.value:
            
                    # Check if the last obtained candles are red
                    is_last_1m_red = self.is_red(last_candle_today_1m)
                    is_last_2m_red = self.is_red(last_candle_today_2m)
                    is_last_3m_red = self.is_red(last_candle_today_3m)
        
                    is_lower_low_1m = self.is_lower_low(last_candle_today_1m, second_last_candle_today_1m)
                    is_lower_low_2m = self.is_lower_low(last_candle_today_2m, second_last_candle_today_2m)
                    is_lower_low_3m = self.is_lower_low(last_candle_today_3m, second_last_candle_today_3m)

                    # Generate a sell signal if all last obtained candles are red
                    try:
                        # if is_last_1m_red.item() and is_last_2m_red.item():
                        #     # sell signal 
                        #     return True    
                        # elif is_last_2m_red.item() and is_last_3m_red.item():
                        #     # sell signal 
                        #     return True    
                        # elif is_last_3m_red.item(): 
                        #     # sell signal 
                        #     return True    
                        # else: 
                        #     return False
                    
                        return True 
                    except Exception as error:
                        log_error(f"An error occurred while evaluating secondary conditions for Short Trade: {str(error)}")
                        return False
            
            except Exception as error:
                log_error(f"An error occurred while evaluating secondary conditions for {symbol}: {str(error)}")

        return results

