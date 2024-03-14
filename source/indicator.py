import os
import datetime as dt
import time
import pandas as pd
import source.modules.indicators.ma as ma
from source.modules.indicators.rsi import rsi
from source.modules.indicators.supertrend import supertrend
from source.modules.indicators.macd import macd
from source.modules.indicators.atr import atr
from source.modules.indicators.williams_r import williams_r
from source.modules.indicators.vwap import vwap
from source.modules.indicators.adx import adx
from source.modules.indicators.stochastic import stochastic
from source.modules.indicators.renko import renko
from source.modules.indicators.bollinger_bands import bollinger_bands
from source.modules.indicators.truerange import truerange
from source.modules.indicators.average_truerange import average_truerange
from source.helper import Helper
from source.utils.logging_utils import *

class Indicator:
    def __init__(self, params):
        self.prop = params

    def use_indicator(self, indicator_option, dataset, period=0):
        match indicator_option:
            case 'rsi':
                return(self.option_rsi(dataset, period))
            case 'wma':
                return(self.option_wma(dataset, period))
            case 'sma':
                return(self.option_sma(dataset, period))
            case 'ema':
                return(self.option_ema(dataset, period))               
            case 'supertrend':
                return(self.option_supertrend(dataset, period))
            case 'macd':
                return(self.option_macd(dataset, period))                
            case 'atr':
                return(self.option_atr(dataset, period))
            case 'williams_r':
                return(self.option_williams_r(dataset, period))
            case 'vwap':
                return(self.option_vwap(dataset, period))
            case 'adx':
                return(self.option_adx(dataset, period))
            case 'stochastic':
                return(self.option_stochastic(dataset, period))
            case 'renko':
                return(self.option_renko(dataset, period))
            case 'bollinger_bands':
                return(self.option_bollinger_bands(dataset, period))
            case 'truerange':
                return(self.option_truerange(dataset, period))                 
            case 'average_truerange':
                return(self.option_average_truerange(dataset, period))                   
            case _:
                self.invalid_option(dataset)

    # RSI 
    def option_rsi(self, dataset, period):
        try:
            rsi_values = {}
            if dataset is not None:
                # Calculate RSI
                pdf = pd.DataFrame(dataset)
                rsi_values = rsi(pdf, period)
                return rsi_values
            else:
                log_error("Failed to calculate RSI") 
                return False
        except Exception as e:
            log_error("An exception occurred: {}".format(e))
    
    # WMA
    def option_wma(self, dataset, period):
        try:
            if dataset is not None:
                # Calculate WMA
                pdf = pd.DataFrame(dataset)
                wma_values = ma.wma(pdf, period)
                return wma_values
            else:
                log_error("Failed to calculate WMA") 
                return False
        except Exception as e:
            log_error("An exception occurred: {}".format(e))

    # SMA            
    def option_sma(self, dataset, period):
        try:
            sma_values = {}
            if dataset is not None:
                # Calculate SMA
                pdf = pd.DataFrame(dataset)
                sma_values = ma.sma(pdf, period)
                return sma_values
            else:
                log_error("Failed to calculate SMA") 
                return False
        except Exception as e:
            log_error("An exception occurred: {}".format(e))

    # EMA
    def option_ema(self, dataset, period):
        try:
            ema_values = {}
            if dataset is not None:
                # Calculate EMA
                pdf = pd.DataFrame(dataset)
                ema_values = ma.ema(pdf, period)
                return ema_values
            else:
                log_error("Failed to calculate EMA") 
                return False
        except Exception as e:
            log_error("An exception occurred: {}".format(e))
            
    # SUPERTREND
    def option_supertrend(self, dataset, period):
        try:
            supertrend_values = {}
            if dataset is not None:
                # Calculate SUPERTREND
                pdf = pd.DataFrame(dataset)
                supertrend_values = supertrend(pdf, period)
                return supertrend_values
            else:
                log_error("Failed to calculate SUPERTREND")
                return False
        except Exception as e:
            log_error("An exception occurred: {}".format(e))

    # MACD
    def option_macd(self, dataset, period):
        try:
            macd_values = {}
            if dataset is not None:
                # Calculate MACD
                pdf = pd.DataFrame(dataset)
                macd_line, signal_line, macd_histogram = macd(pdf, period)
                macd_values = {
                    "macd_line": macd_line,
                    "signal_line": signal_line,
                    "macd_histogram": macd_histogram
                }
                return macd_values
            else:
                log_error("Failed to calculate MACD")
                return False
        except Exception as e:
            log_error("An exception occurred: {}".format(e))

    # ATR
    def option_atr(self, dataset, period):
        try:
            atr_values = {}
            if dataset is not None:
                # Calculate ATR
                pdf = pd.DataFrame(dataset)
                atr_values = atr(pdf, period)
                return atr_values
            else:
                log_error("Failed to calculate ATR") 
                return False
        except Exception as e:
            log_error("An exception occurred: {}".format(e))

    # WILLIAMS %R
    def option_williams_r(self, dataset, period):
        try:
            williams_values = {}
            if dataset is not None:
                # Calculate Williams %R
                pdf = pd.DataFrame(dataset)
                williams_values = williams_r(pdf, period)
                return williams_values
            else:
                log_error("Failed to calculate Williams Range") 
                return False
        except Exception as e:
            log_error("An exception occurred: {}".format(e))

    # VWAP
    def option_vwap(self, dataset, period):
        try:
            vwap_values = {}
            if dataset is not None:
                # Calculate VWAP
                pdf = pd.DataFrame(dataset)
                vwap_values = vwap(pdf, period) 
                return vwap_values
            else:
                log_error("Failed to calculate VWAP") 
                return False
        except Exception as e:
            log_error("An exception occurred: {}".format(e))

    # ADX
    def option_adx(self, dataset, period):
        try:
            adx_values = {}
            if dataset is not None:
                # Calculate ADX
                pdf = pd.DataFrame(dataset)
                adx_values = adx(pdf, period) 
                return adx_values
            else:
                log_error("Failed to calculate ADX") 
                return False
        except Exception as e:
            log_error("An exception occurred: {}".format(e))

    # STOCHASTIC
    def option_stochastic(self, dataset, period):
        try:
            stochastic_values = {}
            if dataset is not None:
                # Calculate Stochastic
                pdf = pd.DataFrame(dataset)
                stochastic_line_k, stochastic_line_d = stochastic(pdf, period)
                stochastic_values = {
                    "k": stochastic_line_k,
                    "d": stochastic_line_d,
                }
                return stochastic_values
            else:
                log_error("Failed to calculate Stochastic") 
                return False
        except Exception as e:
            log_error("An exception occurred: {}".format(e))
    
    # RENKO
    def option_renko(self, dataset, period):
        try:
            renko_values = {}
            if dataset is not None:
                # Calculate Renko Bricks
                pdf = pd.DataFrame(dataset)
                renko_values = renko(pdf, period)  
                return renko_values
            else:
                log_error("Failed to calculate Renko") 
                return False
        except Exception as e:
            log_error("An exception occurred: {}".format(e))

    # BOLLINGER BANDS        
    def option_bollinger_bands(self, dataset, period):
        try:
            bollinger_values = {}
            if dataset is not None:
                # Calculate Bollinger Bands
                pdf = pd.DataFrame(dataset)
                upper_band, middle_band, lower_band = bollinger_bands(pdf, period)
                bollinger_values = {
                    "upper_band": upper_band.tolist(), 
                    "middle_band": middle_band.tolist(),
                    "lower_band": lower_band.tolist()
                }
                return bollinger_values
            else:
                log_error("Failed to calculate Bollinger Bands") 
                return False
        except Exception as e:
            log_error("An exception occurred: {}".format(e))

    # TRUE RANGE 
    def option_truerange(self, dataset, period):
        try:
            truerange_values = {}
            if dataset is not None:
                # Calculate True Range
                pdf = pd.DataFrame(dataset)
                truerange_values = truerange(pdf, period)
                return truerange_values
            else:
                log_error("Failed to calculate True Range") 
                return False
        except Exception as e:
            log_error("An exception occurred: {}".format(e))

    # ATR
    def option_average_truerange(self, dataset, period):
        try:
            average_truerange_values = {}
            if dataset is not None:
                # Calculate Average Truerange
                pdf = pd.DataFrame(dataset)
                average_truerange_values = average_truerange(pdf, period)
                return average_truerange_values
            else:
                log_error("Failed to calculate Average True Range") 
                return False
        except Exception as e:
            log_error("An exception occurred: {}".format(e))
            
    def invalid_option(self, dataset):
        # Invalid indicator option provided
        log_warn("The indicator option provided is not valid") 
        