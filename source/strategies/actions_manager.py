# strategies/actions_manager.py
import logging
import datetime
import time
import logging
import boto3
import asyncio
import source.strategies as strategies

from source.enumerations.enums import Strategy
from time import sleep
from pandas import qcut
from source.constants.constants import *
from source.enumerations.enums import *
from source.strategies.base_actions import BaseActions

class ActionsManager(BaseActions):
    
    def __init__(self, connection, modules):
        super().__init__(connection, modules) 
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        self.sqs = boto3.client('sqs', region_name=REGION_NAME)
       
    ###########################################
    # Initialize Actions Manager
    ###########################################        

    def initialize_actions(self, configuration):
        try:

            debugger = configuration.get("debugger") 
            live_trade = configuration.get("live_trade")
            virtual_trade = configuration.get("virtual_trade")
            market_trade = configuration.get("market_trade")
            
            strategy_id = int(configuration.get("strategy"))
            strategy_enum = Strategy(strategy_id)
            strategy_name = strategy_enum.name
            
                
            if live_trade == True:
           
                live_trade          = configuration.get("live_trade")
                live_trade_params   = configuration.get("live_trade_params") if live_trade else None
                market_trade        = configuration.get("market_trade")
                market_trade_params = configuration.get("market_trade_params") if market_trade else None
                strategy_params     = configuration.get(f"strategy_{strategy_enum.value}_params")
                common_params       = configuration.get("common_params")

                self.execute_actions(live_trade_params, market_trade_params, strategy_params, common_params)
                    
            elif virtual_trade == True and live_trade == False:

                virtual_trade        = configuration.get("virtual_trade")
                virtual_trade_params = configuration.get("virtual_trade_params") if virtual_trade else None
                market_trade         = configuration.get("market_trade")
                market_trade_params  = configuration.get("market_trade_params") if market_trade else None
                strategy_params      = configuration.get(f"strategy_{strategy_enum.value}_params")
                common_params       = configuration.get("common_params")
                    
                self.execute_actions(virtual_trade_params, market_trade_params, strategy_params, common_params)
                    
            else:
                self.logger.info("No Virtual trade or Live configuration found.")       

        except Exception as e:
            self.logger.info(f"An error occurred: {e}")
            
    def execute_actions(self, v_args, m_args, s_args, c_args):
        # Load Configurations
        
        # Virtual Trade Parameters
        self.symbol                       = v_args.get('symbol')
        self.exchange                     = v_args.get('exchange')
        self.historical_data_subscription = v_args.get('historical_data_subscription')
        max_allocation                    = v_args.get('max_allocation')
        quantity                          = v_args.get('quantity')
        tpsl_method                       = v_args.get('tpsl_method')
        target                            = v_args.get('target')
        stop_loss                         = v_args.get('stop_loss')
        trail_profit                      = v_args.get('trail_profit')
        trail_stop_loss                   = v_args.get('trail_stop_loss')

        # Multi Timeframe
        multi_timeframe = m_args.get('multi_timeframe', {})
        self.DAILY      = multi_timeframe.get('daily_interval')
        self.WEEKLY     = multi_timeframe.get('weekly_interval')
        self.MONTHLY    = multi_timeframe.get('monthly_interval')

        # Strategy Parameters
        self.TIMEFRAME = s_args.get('timeframe')
        self.strategy_type = s_args.get('type')
        
        # Market Parameters
        market_params  = m_args.get('market_params')
        market_indices = m_args.get('market_indices')

        # Common Parameters
        prettier = c_args.get('prettier_print')
            
        self.subscribe_message()
        
    ###########################################
    # Subscribe Stock Alert from Queue
    ###########################################
        
    def subscribe_message(self):
        # Receive messages from the queue
        response = self.sqs.receive_message(
            QueueUrl = f'{AWS_SQS.URL.value}/{AWS_SQS.ACCOUNT_ID.value}/{Queues.Queue1.value}',
            MaxNumberOfMessages = 5
        )

        # TODO: Do Async Multi Processing to process messages simultaneously

        # Process received messages
        messages = response.get('Messages', [])
        for i, message in enumerate(messages, start=1):
                        
            self.is_stock_monitored = True
            self.message = message['Body']
            self.receipt_handle = message['ReceiptHandle']
            
            exchange, symbol, token = self.message.split(',')
            self.trading_exchange   = exchange
            self.trading_symbol     = symbol
            self.instrument_token   = token
            
            ##################################################################################################################################
            print(f"\nPreparing Stock {i}/{len(messages)}: {self.trading_exchange}, {self.trading_symbol}, {self.instrument_token}\n")
            ##################################################################################################################################

            self.logger.info(f"Message Received: {self.message}")
            # Delete the message from the queue
            self.sqs.delete_message(
                QueueUrl = f'{AWS_SQS.URL.value}/{AWS_SQS.ACCOUNT_ID.value}/{Queues.Queue1.value}',
                ReceiptHandle = self.receipt_handle
            )
            self.logger.info(f"Purge message from Queue: {self.message}")

            # Pass the message to process_stock_alerts
            stock_processing_successful = self.process_stock_alerts()
            
            if stock_processing_successful and self.strategy_type == Strategy_Type.LONG.value:
                
                stock_to_trade = (self.trading_exchange, self.trading_symbol, self.instrument_token)
                self.generate_buy_signal(stock_to_trade)
                
            elif stock_processing_successful and self.strategy_type == Strategy_Type.SHORT.value:    
                pass
            else:
                self.logger.info(f"Stock {self.trading_exchange}, {self.trading_symbol}, {self.instrument_token} not processed.")
                
    def process_stock_alerts(self):
        """
        Manage Stock Alerts to generate buy or sell signals
        """
        self.logger.info(f"Processing Stock Alerts for {self.trading_exchange}, {self.trading_symbol}, {self.instrument_token}")
        
        check_counter = 0

        while self.is_stock_monitored:
            try:
                current_time = datetime.datetime.now()
                if current_time.minute % 2 == 0 and check_counter == 0:
                    # No need to sleep if the current minute is already a multiple 
                    self.logger.info(f"Fetching OHLCV data for Secondary Conditions: {self.trading_exchange}, {self.trading_symbol}, {self.instrument_token}")
                    candlestick_data = asyncio.run(self.get_candlestick_data())
                    conditions_met = self.evaluate_secondary_conditions(candlestick_data)
                    
                    if conditions_met:
                        print(f"Buy Now")
                        self.is_stock_monitored = False
                        return True
                    
                    check_counter = 1
                else:
                    # Calculate the time difference until the next multiple of 2 minutes
                    check_counter = 0
                    seconds_until_next_run = (2 - (current_time.minute % 2)) * 60 - current_time.second
                    print(f"Sleeping for {seconds_until_next_run} seconds")
                    time.sleep(seconds_until_next_run)
            except Exception as e:
                self.logger.error(f"An error occurred while monitoring stock alerts: {str(e)}")

        
    ###########################################
    # Async Processing
    ###########################################

    async def get_candlestick_data(self):
        """
        Asynchronously fetches OHLC data for different timeframes.
        """
        if self.historical_data_subscription:        
            tasks = [
                self.fetch_ohlc_async(self.trading_exchange, self.trading_symbol, self.instrument_token, self.timeframe)
                for self.timeframe in [TODAY_1M, TODAY_2M, TODAY_3M]
            ]
            candles = await asyncio.gather(*tasks)     
            return candles
    
    async def fetch_ohlc_async(self, trading_exchange, trading_symbol, instrument_token, trading_timeframe):
        """
        Fetches OHLC data asynchronously for the given timeframe.
        """
        loop = asyncio.get_running_loop()  
        candles = await loop.run_in_executor(None, self.modules['fetch'].fetch_ohlc, trading_exchange, trading_symbol, instrument_token, trading_timeframe)
        return candles
    
    ###########################################
    # Evaluate Strategy Conditions
    ###########################################
        
    def evaluate_secondary_conditions(self, candlestick_data):

        candles_today_1m, candles_today_2m, candles_today_3m = candlestick_data       
        
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


        last_candle_today_1m = self.get_last_n_candles(candles_today_1m, 1)
        last_candle_today_2m = self.get_last_n_candles(candles_today_2m, 1)
        last_candle_today_3m = self.get_last_n_candles(candles_today_3m, 1)
        
        
        second_last_candle_today_1m = self.get_last_n_candles(candles_today_1m, 1)
        second_last_candle_today_2m = self.get_last_n_candles(candles_today_2m, 1)
        second_last_candle_today_3m = self.get_last_n_candles(candles_today_3m, 1)
        

        # Check if the last obtained candles are green
        is_last_1m_green = self.is_green(last_candle_today_1m)
        is_last_2m_green = self.is_green(last_candle_today_2m)
        is_last_3m_green = self.is_green(last_candle_today_3m)
        
        is_higher_high_1m = self.is_higher_high(last_candle_today_1m, second_last_candle_today_1m)
        is_higher_high_2m = self.is_higher_high(last_candle_today_2m, second_last_candle_today_2m)
        is_higher_high_3m = self.is_higher_high(last_candle_today_3m, second_last_candle_today_3m)


        # TODO  - Define Secondary Level Checking

        # Generate a buy signal if all last obtained candles are green
        try:
            if is_last_1m_green.item() and is_last_2m_green.item():
                # buy signal 
                return True    
            elif is_last_2m_green.item() and is_last_3m_green.item():
                # buy signal 
                return True    
            elif is_last_3m_green.item(): 
                # buy signal             
                return True    
            else: 
                return False
        except Exception as e:
            self.logger.error(f"An error occurred while evaluating secondary conditions: {str(e)}")
            return False
        
    ###########################################
    # Buy Signal
    ###########################################

    def generate_buy_signal(self, trade_information):
            
        exchange, symbol, token = trade_information
            

    ###########################################
    # Sell Signal
    ###########################################

    def generate_sell_signal(self, trade_information):
            
        exchange, symbol, token = trade_information