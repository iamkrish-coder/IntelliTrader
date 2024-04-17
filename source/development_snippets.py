"""
###################################################################################
######################### SOURCE CODE DEPRICATED SNIPPETS #########################
###################################################################################

                event = Events.SCAN.value
                table = Tables.TABLE_TOPICS.value
                config = self.database.table_configuration[table]
                dataset = {
                    "topic_arn": topic_arn,
                    "created_date": time.strftime("%Y-%m-%d %H:%M:%S"), 
                    "topic_name": topic_name,
                    "is_active": False, 
                    "is_published": False, 
                    "is_subscribed": False, 
                    "is_deleted": False
                }
                attributes = TopicsModel(**dataset).convert_table_rows_to_dict(config)
                projection = ["is_active"] 
                filters = { "is_active": { "eq": False } }

                custom_sort = {
                    attributes["sort_object"]["condition"].update({
                        attributes["sort_object"]["key"] : { "begins_with": "IntelliTrader" }
                    })
                }

                request_parameters = {
                    "event": event,
                    "table": table,
                    "config": config,
                    "data": {
                        "attributes" : attributes,
                        "projection": projection,
                        "filters": filters    
                    }
                }


filters = {
    "topic_name": Attr("topic_name").eq(model_data["row_data"]["topic_name"]),
    "is_active": Attr("is_active").eq(False)
}
            
operators = {
    "hash_keys": "eq",
    "sort_keys": "eq" 
}
# existing_topic = self.database.manage_table_records(Events.GET.value, Tables.TABLE_TOPICS.value, model_data)
            
# existing_topic = self.database.manage_table_records(Events.SCAN.value, Tables.TABLE_TOPICS.value, model_data)
            
existing_topic = self.database.manage_table_records(Events.QUERY.value, Tables.TABLE_TOPICS.value, model_data, 'custom_query_1', filters, operators)


deprecated_source_code.py


# Extract relevant information and store it
instrument_quote = self.modules['fetch'].fetch_quote(self.exchange, self.trading_symbol)           
stock_data[self.trading_symbol] = {
    'token_data': self.instrument_token,
    'quote_data': instrument_quote,
    'summary_data': stock
}


Fetch


        if "hash_key" in self.table_data:
            hash_key_name       = self.table_data["hash_object"].get("name")
            hash_key_value      = self.table_data["hash_object"].get("value")
            hash_key_comparison = self.operators["hash_keys"]

            Check if the comparison operator exists
            if hash_key_comparison not in self.comparison_operators:
                raise ValueError(f"Invalid comparison operator: {hash_key_comparison}")

            condition_object = self.comparison_operators[hash_key_comparison](hash_key_name, hash_key_value)
            hash_key_condition = f"{hash_key_name} {condition_object.expression_operator} :{hash_key_name}"

            query_args = {
                'KeyConditionExpression': hash_key_condition,
                'ExpressionAttributeValues': { f":{hash_key_name}": hash_key_value }
            }
            
        
        if "sort_key" in self.table_data and self.table_data["sort_object"] is not None:
            sort_key_name       = self.table_data["sort_object"].get("name")
            sort_key_value      = self.table_data["sort_object"].get("value")
            sort_key_comparison = self.operators["sort_keys"]

            Check if the comparison operator exists
            if sort_key_comparison not in self.comparison_operators:
                raise ValueError(f"Invalid comparison operator: {sort_key_comparison}")
            else:
                Use the Attr method corresponding to the comparison operator
                sort_condition = self.comparison_operators[sort_key_comparison](sort_key_name, sort_key_value)

                Build sort key condition expression
                sort_key_condition = f" AND {sort_condition}"
                query_args['KeyConditionExpression'] += sort_key_condition

                Add sort key value to ExpressionAttributeValues
                query_args['ExpressionAttributeValues'].update({f":{sort_key_name}": sort_key_value})

           
        filter_expression = ""
        expression_attribute_values = {}

        if self.filters:
            count = 0
            for attribute_key, condition in self.filters.items():
                count += 1

                Access the actual value using the value() method of the attribute object
                attribute_value = condition._values[1]

                Build filter expression with placeholder for value
                filter_expression += f"{attribute_key} {condition.expression_operator} :{attribute_key}"
                expression_attribute_values[f":{attribute_key}"] = attribute_value

                Add AND separator conditionally within the loop (after each condition except the last)
                filter_expression += (" AND " if count < len(self.filters) else "")
            
        query_args["FilterExpression"] = filter_expression
        query_args["ExpressionAttributeValues"].update(expression_attribute_values)

        return query_args


candles, candles_daily, candles_weekly, candles_monthly, candles_today_5m, candles_today_15m, candles_today_30m, candles_today_60m = self.candlestick_data         

# Default Candles  
last_open, last_high, last_low, last_close, last_volume                                    = self.get_nth_last_prices(candles, 1)
second_last_open, second_last_high, second_last_low, second_last_close, second_last_volume = self.get_nth_last_prices(candles, 2)
third_last_open, third_last_high, third_last_low, third_last_close, third_last_volume      = self.get_nth_last_prices(candles, 3)

# Daily Candles        
last_open_daily, last_high_daily, last_low_daily, last_close_daily, last_volume_daily                                    = self.get_nth_last_prices(candles_daily, 1)
second_last_open_daily, second_last_high_daily, second_last_low_daily, second_last_close_daily, second_last_volume_daily = self.get_nth_last_prices(candles_daily, 2)
third_last_open_daily, third_last_high_daily, third_last_low_daily, third_last_close_daily, third_last_volume_daily      = self.get_nth_last_prices(candles_daily, 3)

# Weekly Candles
last_open_weekly, last_high_weekly, last_low_weekly, last_close_weekly, last_volume_weekly                                    = self.get_nth_last_prices(candles_weekly, 1)
second_last_open_weekly, second_last_high_weekly, second_last_low_weekly, second_last_close_weekly, second_last_volume_weekly = self.get_nth_last_prices(candles_weekly, 2)
third_last_open_weekly, third_last_high_weekly, third_last_low_weekly, third_last_close_weekly, third_last_volume_weekly      = self.get_nth_last_prices(candles_weekly, 3)

# Monthly Candles
last_open_monthly, last_high_monthly, last_low_monthly, last_close_monthly, last_volume_monthly                                    = self.get_nth_last_prices(candles_monthly, 1)
second_last_open_monthly, second_last_high_monthly, second_last_low_monthly, second_last_close_monthly, second_last_volume_monthly = self.get_nth_last_prices(candles_monthly, 2)
third_last_open_monthly, third_last_high_monthly, third_last_low_monthly, third_last_close_monthly, third_last_volume_monthly      = self.get_nth_last_prices(candles_monthly, 3)

# Today Candles
first_open_today_5m, first_high_today_5m, first_low_today_5m, first_close_today_5m, first_volume_today_5m      = self.get_nth_first_prices(candles_today_5m, n=1)
first_open_today_15m, first_high_today_15m, first_low_today_15m, first_close_today_15m, first_volume_today_15m = self.get_nth_first_prices(candles_today_15m, n=1)
first_open_today_30m, first_high_today_30m, first_low_today_30m, first_close_today_30m, first_volume_today_30m = self.get_nth_first_prices(candles_today_30m, n=1)
first_open_today_60m, first_high_today_60m, first_low_today_60m, first_close_today_60m, first_volume_today_60m = self.get_nth_first_prices(candles_today_60m, n=1)
       
rsi               = self.indicator_data.get('rsi')       
wma5              = self.indicator_data.get('wma5')
wma20             = self.indicator_data.get('wma20')
supertrend        = self.indicator_data.get('supertrend')
truerange         = self.indicator_data.get('truerange')
average_truerange = self.indicator_data.get('average_truerange')
macd              = self.indicator_data.get('macd')
macd_line         = macd['macd_line']
macd_signal       = macd['signal_line']
macd_histogram    = macd['macd_histogram']

# TODO - Get More Indicators 


# TODO - Define Primary Level Checking

# Define strategy conditions
try:
    conditions = {
        '1': rsi[-1] > 40
        # '2': close[-1] > (open[-1] * 1.01),
        # '3': volume[-1] > 200000,
        # '4': close[-1] > 2000,
        # '5': close[-1] > close_daily[-2],                    
        # '6': truerange[-1] > average_truerange[-1],
        # '7': truerange[-1] > 8,
        # '8': close[-1] > close_weekly[-2],                                   
        # '9': close[-1] > close_monthly[-2], 
        # '10': close_weekly[-1] > close_weekly[-2],                                                    
        # '11': close_monthly[-1] > close_monthly[-2],
        # '12': close[-1] > ((open[-1] + high_daily[-2] + close_daily[-2]) / 3),
        # '13': macd_histogram[-1] > 0,
        # '14': macd_line[-1] > macd_signal[-1],
        # '15': close[-1] > high_daily[-2],
        # '16': close[-1] > open_5m[0],
        # '17': close[-1] > supertrend[-1],
        # '18': close[-2] <= supertrend[-2],
        # '19': rsi[-1] > 60,
        # '20': rsi[-2] <= 60,
        # '21': wma5[-1] > wma20[-1]
    }
except Exception as error:
    log_error(f"An error occurred while evaluating primary conditions: {str(error)}")

        
# Log and display each Condition check
log_info(f"Evaluating Strategy {self.trading_symbol}")
for condition_id, condition_check in conditions.items():
    log_info(f"::::::: Condition ::::::: {condition_id} Status: {condition_check}")

       
# Final Strategy Condition
if all(conditions.values()):
    conditions_met = True
else:
    conditions_met = False
        
if conditions_met:              
    message = f"{self.trading_exchange},{self.trading_symbol},{self.trading_token}" 
    return message 
else:
    return None     


def initialize_strategy(self, configuration):
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

        self.execute_strategy(**settings)

    except Exception as error:
        log_info(f"An error occurred: {error}")

##########################################
Execute Strategy
##########################################
            
def execute_strategy(self, **kwargs):
    Executes a trading strategy using provided arguments.

    Parameters:
    - v_args (dict): Virtual trading arguments including initial capital, virtual account settings, etc.
    - m_args (dict): Market data arguments including OHLCV data, indicators, etc.
    - s_args (dict): Strategy-specific arguments including strategy parameters, rules, etc.
    - c_args (dict): Additional contextual arguments if needed.

    Returns:
    - result (dict): Dictionary containing the result of the virtual strategy execution.
    Example keys: 'profit_loss', 'trades_executed', 'strategy_performance', etc.
        
    # Declare variables
    instruments_list   = []
    watchlist_stocks   = []
    local_indices      = []
    global_indices     = []
    stock_alerts       = []
        
    stock_data         = {}
    indicator_data     = {}
               
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
        
        
# Market Trend Study
if self.market_params:
    local_market_sentiment  = self.get_local_market_sentiment()
    global_market_sentiment = self.get_global_market_sentiment()


Get Live Data
stock_basket     = self.get_stock_basket(self.exchange, self.symbol)
instruments_list = self.modules['fetch'].fetch_instruments(self.exchange)  
watchlist_stocks = [instrument for instrument in instruments_list if instrument['tradingsymbol'] in stock_basket]

Loop through stocks
for i, stock in enumerate(watchlist_stocks, start=1):
            
    self.trading_exchange = stock.get('exchange')           
    self.trading_symbol   = stock.get('tradingsymbol')

    if self.trading_symbol is None or self.trading_symbol is None:
        continue

    self.trading_token = stock.get('instrument_token') if stock.get('instrument_token') else self.modules['fetch'].trading_token_lookup(self.trading_exchange, self.trading_symbol)

    print(f"\nScanning Stock {i}/{len(watchlist_stocks)}: {self.trading_exchange}, {self.trading_symbol}, {self.trading_token}\n")
            
    # Candlestick Data          
    log_info(f"Fetching OHLCV data for Primary Conditions: {self.trading_exchange}, {self.trading_symbol}, {self.trading_token}")
    candlestick_data = asyncio.run(self.get_candlestick_data())     

    candles = candlestick_data[0]
           

# Indicators Data          
log_info(f"Fetching Indicator data for Primary Conditions: {self.trading_exchange}, {self.trading_symbol}, {self.trading_token}")

indicator_data = self.calculate_indicators(candles)
          
           
<Debug> 
self.modules['help'].format_json_output_print(candles, "Now", prettier)
self.modules['help'].format_json_output_print(candles_daily, "Daily", prettier)
self.modules['help'].format_json_output_print(candles_weekly, "Weekly", prettier)
self.modules['help'].format_json_output_print(candles_monthly, "Monthly", prettier)
self.modules['help'].format_json_output_print(candles_today_5m, "Today 5M", prettier)
self.modules['help'].format_json_output_print(candles_today_15m, "Today 15M", prettier)
            
Evaluate Strategy Conditions 
conditions_met = self.evaluate_primary_conditions(candlestick_data, indicator_data)
            
if conditions_met:
    stock_alerts.append(self.trading_symbol) 
                
    # Publish the stock alert to a queue 
    message = f"{self.trading_exchange},{self.trading_symbol},{self.trading_token}" 
                
    queue_response = self.publish_message(message)   

else:
    continue     

###########################################
# Calculate Indicators Data
###########################################
        
def calculate_indicators(self, candles):
    Calculates and stores various technical indicators for the given OHLCV data.

    Args:
        candles (pandas.DataFrame): The OHLCV data

    Returns:
        dict: A dictionary containing calculated indicator values.
    indicator_data                      = {}
    indicator_data['rsi']               = self.get_indicator_values('rsi', candles, RSI.RSI_8.value)
    indicator_data['wma5']              = self.get_indicator_values('wma', candles, WMA.WMA_5.value)
    indicator_data['wma20']             = self.get_indicator_values('wma', candles, WMA.WMA_21.value)
    indicator_data['supertrend']        = self.get_indicator_values('supertrend', candles, Supertrend.SUPERTREND_4_2.value)
    indicator_data['truerange']         = self.get_indicator_values('truerange', candles, TrueRange.TRUERANGE_14.value)
    indicator_data['average_truerange'] = self.get_indicator_values('average_truerange', candles, AverageTrueRange.AVERAGETRUERANGE_14.value)
    indicator_data['macd']              = self.get_indicator_values('macd', candles, MACD.MACD_12_26_9.value)
        
    # Check if any indicator data is None, if so, return None
    if any(value is None for value in indicator_data.values()):
        return None
    
    return indicator_data

##########################################
Evaluate Primary Strategy Conditions
##########################################

def evaluate_primary_conditions(self, candlestick_data, indicator_data):
    Evaluates the trading strategy conditions based on provided data.

    Parameters:
    - candlestick_data (DataFrame): OHLCV data for all timeframes.
    - indicator_data (DataFrame): Additional indicator data used for evaluation.

    Returns:
    - conditions_met (bool): True if strategy conditions are met, False otherwise.
        
    candles, candles_daily, candles_weekly, candles_monthly, candles_today_5m, candles_today_15m, candles_today_30m, candles_today_60m = candlestick_data         


    # Default Candles  
    last_open, last_high, last_low, last_close, last_volume                                    = self.get_nth_last_prices(candles, 1)
    second_last_open, second_last_high, second_last_low, second_last_close, second_last_volume = self.get_nth_last_prices(candles, 2)
    third_last_open, third_last_high, third_last_low, third_last_close, third_last_volume      = self.get_nth_last_prices(candles, 3)

    # Daily Candles        
    last_open_daily, last_high_daily, last_low_daily, last_close_daily, last_volume_daily                                    = self.get_nth_last_prices(candles_daily, 1)
    second_last_open_daily, second_last_high_daily, second_last_low_daily, second_last_close_daily, second_last_volume_daily = self.get_nth_last_prices(candles_daily, 2)
    third_last_open_daily, third_last_high_daily, third_last_low_daily, third_last_close_daily, third_last_volume_daily      = self.get_nth_last_prices(candles_daily, 3)

    # Weekly Candles
    last_open_weekly, last_high_weekly, last_low_weekly, last_close_weekly, last_volume_weekly                                    = self.get_nth_last_prices(candles_weekly, 1)
    second_last_open_weekly, second_last_high_weekly, second_last_low_weekly, second_last_close_weekly, second_last_volume_weekly = self.get_nth_last_prices(candles_weekly, 2)
    third_last_open_weekly, third_last_high_weekly, third_last_low_weekly, third_last_close_weekly, third_last_volume_weekly      = self.get_nth_last_prices(candles_weekly, 3)

    # Monthly Candles
    last_open_monthly, last_high_monthly, last_low_monthly, last_close_monthly, last_volume_monthly                                    = self.get_nth_last_prices(candles_monthly, 1)
    second_last_open_monthly, second_last_high_monthly, second_last_low_monthly, second_last_close_monthly, second_last_volume_monthly = self.get_nth_last_prices(candles_monthly, 2)
    third_last_open_monthly, third_last_high_monthly, third_last_low_monthly, third_last_close_monthly, third_last_volume_monthly      = self.get_nth_last_prices(candles_monthly, 3)

    # Today Candles
    first_open_today_5m, first_high_today_5m, first_low_today_5m, first_close_today_5m, first_volume_today_5m      = self.get_nth_first_prices(candles_today_5m, n=1)
    first_open_today_15m, first_high_today_15m, first_low_today_15m, first_close_today_15m, first_volume_today_15m = self.get_nth_first_prices(candles_today_15m, n=1)
    first_open_today_30m, first_high_today_30m, first_low_today_30m, first_close_today_30m, first_volume_today_30m = self.get_nth_first_prices(candles_today_30m, n=1)
    first_open_today_60m, first_high_today_60m, first_low_today_60m, first_close_today_60m, first_volume_today_60m = self.get_nth_first_prices(candles_today_60m, n=1)
       
    rsi               = indicator_data.get('rsi')       
    wma5              = indicator_data.get('wma5')
    wma20             = indicator_data.get('wma20')
    supertrend        = indicator_data.get('supertrend')
    truerange         = indicator_data.get('truerange')
    average_truerange = indicator_data.get('average_truerange')
    macd              = indicator_data.get('macd')
    macd_line         = macd['macd_line']
    macd_signal       = macd['signal_line']
    macd_histogram    = macd['macd_histogram']

    # TODO - Get More Indicators 


    # TODO - Define Primary Level Checking

    # Define strategy conditions
    try:
        conditions = {
            '1': rsi[-1] > 40
            # '2': close[-1] > (open[-1] * 1.01),
            # '3': volume[-1] > 200000,
            # '4': close[-1] > 2000,
            # '5': close[-1] > close_daily[-2],                    
            # '6': truerange[-1] > average_truerange[-1],
            # '7': truerange[-1] > 8,
            # '8': close[-1] > close_weekly[-2],                                   
            # '9': close[-1] > close_monthly[-2], 
            # '10': close_weekly[-1] > close_weekly[-2],                                                    
            # '11': close_monthly[-1] > close_monthly[-2],
            # '12': close[-1] > ((open[-1] + high_daily[-2] + close_daily[-2]) / 3),
            # '13': macd_histogram[-1] > 0,
            # '14': macd_line[-1] > macd_signal[-1],
            # '15': close[-1] > high_daily[-2],
            # '16': close[-1] > open_5m[0],
            # '17': close[-1] > supertrend[-1],
            # '18': close[-2] <= supertrend[-2],
            # '19': rsi[-1] > 60,
            # '20': rsi[-2] <= 60,
            # '21': wma5[-1] > wma20[-1]
        }
    except Exception as error:
        log_error(f"An error occurred while evaluating primary conditions: {str(error)}")

        
    # Log and display each Condition check
    log_info(f"Evaluating Strategy {self.trading_symbol}")
    for condition_id, condition_check in conditions.items():
        log_info(f"::::::: Condition ::::::: {condition_id} Status: {condition_check}")

       
    # Final Strategy Condition
    if all(conditions.values()):
        return True
    else:
        return False
        
##########################################
Publish Stock Alert to Queue
##########################################
        
def publish_message(self, message):
    # Publish messages to the queue
    response = aws_publish(self.sqs, message, f'{AWS_SQS.URL.value}/{AWS_SQS.ACCOUNT_ID.value}/{Queues.Queue1.value}')
    log_info(f"Message Published: {response['MessageId']}")     
    return response
"""