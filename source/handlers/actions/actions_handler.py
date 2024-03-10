# # strategies/actions_handler.py
from ast import List
import datetime
import time
import math
import boto3
import asyncio
import source.handlers as strategies

from source.enumerations.enums import Strategy
from time import sleep
from pandas import qcut
from source.constants.constants import *
from source.enumerations.enums import *
from source.handlers.actions.base_actions import BaseActions
from source.queue.awsSubscriber import aws_subscribe
from source.shared.logging_utils import *
from source.modules.base_classes.trade import Trade
from source.modules.equity_trade import EquityTrade
from source.modules.option_trade import OptionTrade
from source.modules.futures_trade import FuturesTrade

class ActionsHandler(BaseActions):
    
    def __init__(self, connection, modules):
        super().__init__(connection, modules) 
        self.sqs = boto3.client('sqs', region_name=REGION_NAME)
       
    ###########################################
    # Initialize Actions Handler
    ###########################################        

    def initialize_actions(self, configuration):
        try:

            debugger      = configuration.get("debugger") 
            live_trade    = configuration.get("live_trade")
            virtual_trade = configuration.get("virtual_trade")
            market_trade  = configuration.get("market_trade")
            
            strategy_id   = int(configuration.get("strategy"))
            strategy_enum = Strategy(strategy_id)
            strategy_name = strategy_enum.name
            
                
            # Initialize Settings
            settings = {}

            if live_trade:
                settings['trade_params'] = configuration.get("live_trade_params")
            elif virtual_trade and not live_trade:
                settings['trade_params'] = configuration.get("virtual_trade_params")

            # Add common parameters
            settings['market_trade_params']   = configuration.get("market_trade_params")
            settings['strategy_trade_params'] = configuration.get(f"strategy_{strategy_enum.value}_params")
            settings['common_trade_params']   = configuration.get("common_trade_params")

            self.execute_actions(**settings)

        except Exception as e:
            log_info(f"An error occurred: {e}")
            
    ###########################################
    # Execute Actions
    ###########################################
            
    def execute_actions(self, **kwargs):
        params = []

        params.append(kwargs.get('trade_params'))
        params.append(kwargs.get('market_trade_params'))
        params.append(kwargs.get('strategy_trade_params'))
        params.append(kwargs.get('common_trade_params'))

        # Trade Params
        trade_params = params[0] if params else {}

        self.historical_data_subscription  = trade_params.get('historical_data_subscription', None)
        self.max_allocation                = trade_params.get('max_allocation', None)
        self.quantity                      = trade_params.get('quantity', None)
        self.tpsl_method                   = trade_params.get('tpsl_method', None)
        self.target                        = trade_params.get('target', None)
        self.stop_loss                     = trade_params.get('stop_loss', None)
        self.trail_profit                  = trade_params.get('trail_profit', None)
        self.trail_stop_loss               = trade_params.get('trail_stop_loss', None)
        self.variety                       = trade_params.get('variety', None)
        self.order_type                    = trade_params.get('order_type', None)
        self.product                       = trade_params.get('product', None)
        self.validity                      = trade_params.get('validity', None)

        # Market Parameters
        market_params = params[1] if len(params) > 1 else {}
        
        self.market_params   = market_params.get('market_params')
        self.market_indices  = market_params.get('market_indices', {})
        self.order_params    = market_params.get('order_params', {})

        # Strategy Parameters
        strategy_params = params[2] if len(params) > 2 else {}

        self.exchange             = strategy_params.get('exchange', None)  
        self.symbol               = strategy_params.get('symbol', None)    
        self.timeframe            = strategy_params.get('timeframe', None)
        self.strategy_type        = strategy_params.get('strategy_type', None)
        self.ticker               = strategy_params.get('ticker', None)
        self.ticker_mode          = strategy_params.get('ticker_mode', None)       
        self.equity_trading       = strategy_params.get('equity_trading', None)               
        self.option_trading       = strategy_params.get('option_trading', None)
        self.futures_trading      = strategy_params.get('futures_trading', None)
        self.strike               = strategy_params.get('strike', [])
        self.expiry               = strategy_params.get('expiry', None)
        self.offset               = strategy_params.get('offset', None)

        # Common Parameters
        common_params = params[3] if len(params) > 3 else {}

        self.prettier = common_params.get('prettier_print')
        
        # Member Parameters
        self.quantity = self.compute_quantity()

        strategy_transaction_map = {
            Strategy_Type.LONG.name: Transaction_Type.BUY.value,
            Strategy_Type.SHORT.name: Transaction_Type.SELL.value
        }
        # Get the transaction type based on the strategy type
        self.transaction_type = strategy_transaction_map.get(self.strategy_type)
        
        # Check if the transaction type is available
        if not self.transaction_type:
            log_error("No transaction type available... Exiting")
            exit()
        
        # Subscribe To Messages in Queue
        response = self.subscribe_message()
        
        # TODO: Do Async Multi Processing to process messages simultaneously
        self.process_messages(response)

    ###########################################
    # Process Messages
    ###########################################

    def process_messages(self, response):
        messages = response.get('Messages', [])
        if messages:
            print(f"\nMessage Received from Queue: {response}")
        
            for i, message in enumerate(messages, start=1):
                self.is_stock_monitored = True
                self.message            = message['Body']
                self.receipt_handle     = message['ReceiptHandle']
        
                self.trading_exchange, self.trading_symbol, self.instrument_token = self.message.split(',')
       
                print(f"\nPreparing Stock {i}/{len(messages)}: {self.trading_exchange}, {self.trading_symbol}, {self.instrument_token}\n")

                # Delete the message from the queue
                self.sqs.delete_message(
                    QueueUrl      = f'{AWS_SQS.URL.value}/{AWS_SQS.ACCOUNT_ID.value}/{Queues.Queue1.value}',
                    ReceiptHandle = self.receipt_handle
                )
                log_info(f"Purge message from Queue: {self.message}")
            
                # Process trade
                self.process_trade()
        else:           
            print("No Message available in Queue.")
                  
    ###########################################
    # Process Trade
    ###########################################            

    def process_trade(self):
        if not self.process_stock_alerts():
            log_info(f"Stock {self.trading_exchange}, {self.trading_symbol}, {self.instrument_token} not processed.")
            return

        if self.option_trading:
            trade = OptionTrade(self.modules)
        elif self.futures_trading:
            trade = FuturesTrade(self.modules)
        elif self.equity_trading:
            trade = EquityTrade(self.modules, self.variety, self.trading_exchange, self.trading_symbol, self.transaction_type, self.quantity, self.product, self.order_type, self.validity)
        else:
            log_error("Error: Invalid trading type")
            return

        result = trade.execute_trade()
        print(f"{trade.__class__.__name__} executed:", result)
        
    ###########################################
    # Subscribe Stock Alert from Queue
    ###########################################
        
    def subscribe_message(self):
        # Receive messages from the queue
        response = aws_subscribe(self.sqs, f'{AWS_SQS.URL.value}/{AWS_SQS.ACCOUNT_ID.value}/{Queues.Queue1.value}')
        log_info(f"Message Subscribed: {response.get('ResponseMetadata', {}).get('RequestId')}")               
        return response

    ###########################################
    # Process Stock Alerts
    ###########################################

    def process_stock_alerts(self):
        """
        Manage Stock Alerts to generate buy or sell signals
        """
        log_info(f"Processing Stock Alerts for {self.trading_exchange}, {self.trading_symbol}, {self.instrument_token}")
        
        check_counter = 0

        while self.is_stock_monitored:
            try:
                current_time = datetime.datetime.now()
                if current_time.minute % 1 == 0 and check_counter == 0:
                    # No need to sleep if the current minute is already a multiple 
                    log_info(f"Fetching OHLCV data for Secondary Conditions: {self.trading_exchange}, {self.trading_symbol}, {self.instrument_token}")
                    candlestick_data = asyncio.run(self.get_candlestick_data())
                    conditions_met   = self.evaluate_secondary_conditions(candlestick_data)
                    
                    if conditions_met:
                        self.is_stock_monitored = False
                        return conditions_met
                    
                    check_counter += 1
                else:
                    # Calculate the time difference until the next multiple of 2 minutes
                    check_counter = 0
                    seconds_until_next_run = (2 - (current_time.minute % 2)) * 60 - current_time.second
                    print(f"Sleeping for {seconds_until_next_run} seconds")
                    time.sleep(seconds_until_next_run)
            except Exception as e:
                log_error(f"An error occurred while monitoring stock alerts: {str(e)}")

    ###########################################
    # Async Processing Candlestick Data
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
    
    ###########################################
    # Async Processing Fetch Data
    ###########################################
        
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

        # Last candle
        last_candle_today_1m = self.get_last_n_candles(candles_today_1m, 1)
        last_candle_today_2m = self.get_last_n_candles(candles_today_2m, 1)
        last_candle_today_3m = self.get_last_n_candles(candles_today_3m, 1)
        
        # Second last candle
        second_last_candle_today_1m = self.get_last_n_candles(candles_today_1m, 1)
        second_last_candle_today_2m = self.get_last_n_candles(candles_today_2m, 1)
        second_last_candle_today_3m = self.get_last_n_candles(candles_today_3m, 1)
        
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
            except Exception as e:
                log_error(f"An error occurred while evaluating secondary conditions: {str(e)}")
                return False


        elif self.strategy_type.upper() == Strategy_Type.SHORT.value:
            
            # Check if the last obtained candles are red
            is_last_1m_green = self.is_red(last_candle_today_1m)
            is_last_2m_green = self.is_red(last_candle_today_2m)
            is_last_3m_green = self.is_red(last_candle_today_3m)
        
            is_higher_high_1m = self.is_lower_low(last_candle_today_1m, second_last_candle_today_1m)
            is_higher_high_2m = self.is_lower_low(last_candle_today_2m, second_last_candle_today_2m)
            is_higher_high_3m = self.is_lower_low(last_candle_today_3m, second_last_candle_today_3m)

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
            except Exception as e:
                log_error(f"An error occurred while evaluating secondary conditions: {str(e)}")
                return False

