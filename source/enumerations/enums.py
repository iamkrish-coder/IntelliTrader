# ENUMS
from enum import Enum
from source.constants.constants import ARN

class AWS_SQS(Enum):
    ACCOUNT_ID = '265153260161'
    URL        = 'https://sqs.ap-south-1.amazonaws.com'

class Logger(Enum):
    STRATEGY_LOGGER   = "strategy_logger"
    ACTION_LOGGER     = "action_logger"
    MONITORING_LOGGER = "monitoring_logger"
    TRADE_LOGGER      = "trade_logger"

class Queues(Enum):
    QUEUE_1     = 'IntelliTrader_Q1.fifo'
    QUEUE_2     = 'IntelliTrader_Q2.fifo'
    QUEUE_3     = 'IntelliTrader_Q3.fifo'
    QUEUE_4     = 'IntelliTrader_Q4.fifo'
    QUEUE_5     = 'IntelliTrader_Q5.fifo'
    QUEUE_6     = 'IntelliTrader_Q6.fifo'

class AWS_SNS(Enum):
    ARN        = 'arn'
    AWS        = 'aws'
    SNS        = 'sns'
    REGION     = 'ap-south-1'
    ACCOUNT_ID = '265153260161'
    
class Topics(Enum):
    TOPIC_1     = 'IntelliTrader_T1'
    TOPIC_2     = 'IntelliTrader_T2'
    TOPIC_3     = 'IntelliTrader_T3'
    TOPIC_4     = 'IntelliTrader_T4'
    TOPIC_5     = 'IntelliTrader_T5'
    TOPIC_6     = 'IntelliTrader_T6'

class Market_Sentiment(Enum):
    POSITIVE = 'POSITIVE'
    NEGATIVE = 'NEGATIVE'  

class Variety(Enum):
    REGULAR = 'REGULAR'
    AMO = 'AMO'
    CO = 'CO'
    ICEBERG = 'ICEBERG'
    AUCTION = 'AUCTION'

class Exchange(Enum):
    NSE = 'NSE'
    BSE = 'BSE'

class Transaction_Type(Enum):
    BUY = 'BUY'
    SELL = 'SELL'

class Product(Enum):
    MIS = 'MIS'
    CNC = 'CNC'
    NRML = 'NRML'

class Order_Type(Enum):
    MARKET = 'MARKET'
    LIMIT = 'LIMIT'
    SL = 'SL'
    SL_M = 'SL-M'
    GTT = 'GTT'

class Validity(Enum):
    DAY = 'DAY'
    IOC = 'IOC'
    TTL = 'TTL'
    
class Strategy_Type(Enum):
    LONG  = 'LONG'
    SHORT = 'SHORT'

class Strategy(Enum):
    ALGORITHM_1  = 1
    ALGORITHM_2  = 2
    ALGORITHM_3  = 3   
    ALGORITHM_4  = 4
    ALGORITHM_5  = 5
    ALGORITHM_6  = 6 

class RSI(Enum):
    RSI_5  = 5
    RSI_8  = 8   
    RSI_10 = 10
    RSI_14 = 14
    RSI_21 = 21

class WMA(Enum):
    WMA_5   = 5
    WMA_8   = 8
    WMA_10  = 10
    WMA_14  = 14
    WMA_21  = 21
    WMA_34  = 34
    WMA_50  = 50
    WMA_100 = 100
    WMA_200 = 200

class SMA(Enum):
    SMA_5   = 5
    SMA_8   = 8
    SMA_10  = 10
    SMA_14  = 14
    SMA_21  = 21
    SMA_50  = 50
    SMA_100 = 100
    SMA_200 = 200
    
class EMA(Enum):
    EMA_5   = 5
    EMA_8   = 8
    EMA_10  = 10
    EMA_14  = 14
    EMA_21  = 21
    EMA_50  = 50
    EMA_100 = 100
    EMA_200 = 200

class Williams_R(Enum):
    WILLIAMSR_5   = 5
    WILLIAMSR_8   = 8  
    WILLIAMSR_10  = 10
    WILLIAMSR_14  = 14
    WILLIAMSR_21  = 21
    WILLIAMSR_50  = 50
    WILLIAMSR_100 = 100
    WILLIAMSR_200 = 200
   
class Supertrend(Enum):
    SUPERTREND_4_2   = [4, 2]
    SUPERTREND_7_3   = [7, 3]
    SUPERTREND_10_3  = [10, 3]
    SUPERTREND_14_3  = [14, 3]
    SUPERTREND_20_2  = [20, 2]
    SUPERTREND_50_10 = [50, 10]
    
class Bollinger_Bands(Enum):
    BOLLINGERBANDS_20_2  = [20, 2]
    BOLLINGERBANDS_14_1  = [14, 1]
    BOLLINGERBANDS_30_3  = [30, 3]
    BOLLINGERBANDS_50_2  = [50, 2]
    BOLLINGERBANDS_100_5 = [100, 5]
    
class MACD(Enum):
    MACD_12_26_9 = [12, 26, 9]
    MACD_8_17_9  = [8, 17, 9]
    MACD_5_13_9  = [5, 13, 9]
    MACD_10_20_5 = [10, 20, 5]
    MACD_14_28_7 = [14, 28, 7]
    
class Stochastic(Enum):
    STOCHASTIC_5_3_3    = [5, 3, 3]
    STOCHASTIC_10_3_3   = [10, 3, 3]
    STOCHASTIC_14_3_3   = [14, 3, 3]
    STOCHASTIC_20_5_5   = [20, 5, 5]
    STOCHASTIC_50_14_14 = [50, 14, 14]

class TrueRange(Enum):
    TRUERANGE_5   = 5
    TRUERANGE_8   = 8
    TRUERANGE_10  = 10
    TRUERANGE_14  = 14
    TRUERANGE_21  = 21
    TRUERANGE_50  = 50
    TRUERANGE_100 = 100
    TRUERANGE_200 = 200

class AverageTrueRange(Enum):
    AVERAGETRUERANGE_5   = 5
    AVERAGETRUERANGE_8   = 8
    AVERAGETRUERANGE_10  = 10
    AVERAGETRUERANGE_14  = 14
    AVERAGETRUERANGE_21  = 21
    AVERAGETRUERANGE_50  = 50
    AVERAGETRUERANGE_100 = 100
    AVERAGETRUERANGE_200 = 200
