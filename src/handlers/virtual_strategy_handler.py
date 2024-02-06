from turtle import st
from src.constants.constants import *
from src.enumerations.enums import *
import pandas as pd

class VirtualStrategyHandler:
    def __init__(self):
        pass
        
    def get_stock_baskets(self, exchange, symbol):
        stock_list = []       
        if(exchange.upper() == Exchange.NSE.value):
            if(symbol.upper() == "DEFAULT"):
               symbols_list = pd.read_csv(DEFAULT_BASKET)
               stock_list = symbols_list['Symbol'].tolist()
            else:
                stock_list.append(symbol.upper())
        elif(exchange.upper() == Exchange.BSE.value):
            if(symbol.upper() == "DEFAULT"):
                stock_list = pd.read_csv(DEFAULT_BASKET)
            else:
                stock_list.append(symbol.upper())
        else:
            print(f"Invalid Exchange {exchange}")
                    
        return stock_list