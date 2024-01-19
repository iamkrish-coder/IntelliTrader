# ENUMS

from enum import Enum

class Exchange(Enum):
    NSE = 'NSE',
    BSE = 'BSE'

class Interval(Enum):
    DAILY = 'daily'
    MULTI = 'multi'

class Segment(Enum):
    EQ  = 'EQUITY'
    FUT = 'FUTURES'
    OPT = 'OPTIONS'
    
class Strategy(Enum):
    INDEXOPTIONS = 'IndexOptionsStrategy'
    DELIVERY = 'DeliveryStrategy'
    STOCKOPTIONS = 'StockOptionsStrategy'

# Specify which names should be imported when using "from constants import *"
__all__ = ['Exchange', 'Interval', 'Symbol', 'Strategy']
