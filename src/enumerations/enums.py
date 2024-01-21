# ENUMS

from enum import Enum

class Exchange(Enum):
    NSE = 'NSE',
    BSE = 'BSE'

class Interval(Enum):
    DAILY = 'daily'
    MULTI = 'multi'

class Symbol(Enum):
    SBIN = 'SBIN'
    IRCTC = 'IRCTC'

class Strategy(Enum):
    STOCK_OPTIONS    = 1
    STOCK_FUTURES    = 2   
    STOCK_DELIVERY   = 3
    STOCK_INTRADAY   = 4
    INDEX_OPTIONS    = 5
    INDEX_FUTURES    = 6 

# Specify which names should be imported when using "from constants import *"
__all__ = ['Exchange', 'Interval', 'Symbol', 'Strategy']
