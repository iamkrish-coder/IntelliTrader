# IntelliTrader\source\modules\fetch\BaseFetch.py

from abc import ABC, abstractmethod
from ..shared.shared_functions import SharedFunctions
from ...constants.const import *
from ...enumerations.enums import *
from ...utils.logging_utils import *


class BaseFetch(ABC, SharedFunctions):
    def __init__(self):
        pass
