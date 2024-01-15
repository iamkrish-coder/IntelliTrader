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
    
class Strategy(Enum):
    OPTIONS = 'OptionsStrategy'

# Specify which names should be imported when using "from constants import *"
__all__ = ['Exchange', 'Interval', 'Symbol', 'Strategy']
