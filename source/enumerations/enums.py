# ENUMS
from enum import Enum

class AWS_SQS(Enum):
    ACCOUNT_ID = '265153260161'
    URL        = 'https://sqs.ap-south-1.amazonaws.com'
    
class Variety(Enum):
    REGULAR = 'REGULAR'
    AMO = 'AMO'
    CO = 'CO'
    ICEBERG = 'ICEBERG'
    AUCTION = 'AUCTION'

class Exchange(Enum):
    NSE = 'NSE'
    BSE = 'BSE'

class TransactionType(Enum):
    BUY = 'BUY'
    SELL = 'SELL'

class Product(Enum):
    MIS = 'MIS'
    CNC = 'CNC'
    NRML = 'NRML'

class OrderType(Enum):
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

class Queues(Enum):
    Queue1     = 'IntelliTrader_Q1.fifo'
    Queue2     = 'IntelliTrader_Q2.fifo'
    Queue3     = 'IntelliTrader_Q3.fifo'
    Queue4     = 'IntelliTrader_Q4.fifo'
    Queue5     = 'IntelliTrader_Q5.fifo'
    Queue6     = 'IntelliTrader_Q6.fifo'
    
class Strategy(Enum):
    algorithm_1  = 1
    algorithm_2  = 2
    algorithm_3  = 3   
    algorithm_4  = 4
    algorithm_5  = 5
    algorithm_6  = 6 

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

class WilliamsR(Enum):
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
    
class BollingerBands(Enum):
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
