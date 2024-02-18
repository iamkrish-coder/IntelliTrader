# ENUMS
from enum import Enum

class Exchange(Enum):
    NSE = 'NSE'
    BSE = 'BSE'

class Interval(Enum):
    DAILY = 'daily'
    MULTI = 'multi'

class Symbol(Enum):
    SBIN = 'SBIN'
    IRCTC = 'IRCTC'

class Strategy(Enum):
    STOCK_OPTIONS = 1
    STOCK_FUTURES = 2   
    STOCK_DELIVERY = 3
    STOCK_INTRADAY = 4
    INDEX_OPTIONS = 5
    INDEX_FUTURES = 6 

class RSI(Enum):
    RSI_5 = 5
    RSI_8 = 8   
    RSI_10 = 10
    RSI_14 = 14
    RSI_20 = 20

class WMA(Enum):
    WMA_5 = 5
    WMA_8 = 8
    WMA_10 = 10
    WMA_14 = 14
    WMA_21 = 21
    WMA_34 = 34
    WMA_50 = 50
    WMA_100 = 100
    WMA_200 = 200

class SMA(Enum):
    SMA_5 = 5
    SMA_8 = 8
    SMA_10 = 10
    SMA_14 = 14
    SMA_21 = 21
    SMA_50 = 50
    SMA_100 = 100
    SMA_200 = 200
    
class EMA(Enum):
    EMA_5 = 5
    EMA_8 = 8
    EMA_10 = 10
    EMA_14 = 14
    EMA_21 = 21
    EMA_50 = 50
    EMA_100 = 100
    EMA_200 = 200

class WilliamsR(Enum):
    WILLIAMSR_5 = 5
    WILLIAMSR_10 = 10
    WILLIAMSR_14 = 14
    WILLIAMSR_20 = 20
    WILLIAMSR_50 = 50
    WILLIAMSR_100 = 100
    WILLIAMSR_200 = 200
   
class Supertrend(Enum):
    SUPERTREND_4_2 = [4, 2]
    SUPERTREND_7_3 = [7, 3]
    SUPERTREND_10_3 = [10, 3]
    SUPERTREND_14_3 = [14, 3]
    SUPERTREND_20_2 = [20, 2]
    SUPERTREND_50_10 = [50, 10]
    
class BollingerBands(Enum):
    BOLLINGERBANDS_20_2 = [20, 2]
    BOLLINGERBANDS_14_1 = [14, 1]
    BOLLINGERBANDS_30_3 = [30, 3]
    BOLLINGERBANDS_50_2 = [50, 2]
    BOLLINGERBANDS_100_5 = [100, 5]
    
class MACD(Enum):
    MACD_12_26_9 = [12, 26, 9]
    MACD_8_17_9 = [8, 17, 9]
    MACD_5_13_9 = [5, 13, 9]
    MACD_10_20_5 = [10, 20, 5]
    MACD_14_28_7 = [14, 28, 7]
    
class Stochastic(Enum):
    STOCHASTIC_5_3_3 = [5, 3, 3]
    STOCHASTIC_10_3_3 = [10, 3, 3]
    STOCHASTIC_14_3_3 = [14, 3, 3]
    STOCHASTIC_20_5_5 = [20, 5, 5]
    STOCHASTIC_50_14_14 = [50, 14, 14]

