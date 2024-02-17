import logging
import os
import datetime as dt
import time
import pandas as pd
import src.indicators.ma as ma
from src.indicators.rsi import rsi
from src.indicators.supertrend import supertrend
from src.indicators.macd import macd
from src.indicators.atr import atr
from src.indicators.williams_r import williams_r
from src.indicators.vwap import vwap
from src.indicators.adx import adx
from src.indicators.stochastic import stochastic
from src.indicators.renko import renko
from src.indicators.bollinger_bands import bollinger_bands
from src.helper import Helper

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
                return(self.option_macd(dataset))                
            case 'atr':
                return(self.option_atr(dataset))
            case 'williams_r':
                return(self.option_williams_r(dataset))
            case 'vwap':
                return(self.option_vwap(dataset))
            case 'adx':
                return(self.option_adx(dataset))
            case 'stochastic':
                return(self.option_stochastic(dataset))
            case 'renko':
                return(self.option_renko(dataset, period))
            case 'bollinger_bands':
                return(self.option_bollinger_bands(dataset))               
            case _:
                self.invalid_option(dataset)

    # RSI 
    def option_rsi(self, dataset, period):
        try:
            rsi_values = {}
            if dataset is not None:
                # Calculate RSI
                pdf = pd.DataFrame(dataset)
                rsi_values = rsi(pdf)
                return rsi_values
            else:
                logging.error("Failed to calculate RSI") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))
    
    # WMA
    def option_wma(self, dataset, period):
        try:
            if dataset is not None:
                # Calculate WMA
                pdf = pd.DataFrame(dataset)
                wma_values = ma.wma(pdf, period)
                return wma_values
            else:
                logging.error("Failed to calculate WMA") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

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
                logging.error("Failed to calculate SMA") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

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
                logging.error("Failed to calculate EMA") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))
            
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
                logging.error("Failed to calculate SUPERTREND")
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

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
                logging.error("Failed to calculate MACD")
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

    # ATR
    def option_atr(self, dataset, period):
        try:
            atr_values = {}
            if dataset is not None and not dataset.empty:
                # Calculate ATR
                pdf = pd.DataFrame(dataset)
                atr_values = atr(pdf, period)
                return atr_values
            else:
                logging.error("Failed to calculate ATR") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

    # WILLIAMS %R
    def option_williams_r(self, dataset, period):
        try:
            williams_values = {}
            if dataset is not None and not dataset.empty:
                # Calculate Williams %R
                pdf = pd.DataFrame(dataset)
                williams_values = williams_r(pdf, period)
                return williams_values
            else:
                logging.error("Failed to calculate Williams Range") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

    # VWAP
    def option_vwap(self, dataset, period):
        try:
            vwap_values = {}
            if dataset is not None and not dataset.empty:
                # Calculate VWAP
                pdf = pd.DataFrame(dataset)
                vwap_values = vwap(pdf, period) 
                return vwap_values
            else:
                logging.error("Failed to calculate VWAP") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

    # ADX
    def option_adx(self, dataset, period):
        try:
            adx_values = {}
            if dataset is not None and not dataset.empty:
                # Calculate ADX
                pdf = pd.DataFrame(dataset)
                adx_values = adx(pdf, period) 
                return adx_values
            else:
                logging.error("Failed to calculate ADX") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

    # STOCHASTIC
    def option_stochastic(self, dataset, period):
        try:
            stochastic_values = {}
            if dataset is not None and not dataset.empty:
                # Calculate Stochastic
                pdf = pd.DataFrame(dataset)
                stochastic_line_k, stochastic_line_d = stochastic(pdf, period)
                stochastic_values = {
                    "k": stochastic_line_k,
                    "d": stochastic_line_d,
                }
                return stochastic_values
            else:
                logging.error("Failed to calculate Stochastic") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))
    
    # RENKO
    def option_renko(self, dataset, period):
        try:
            renko_values = {}
            if dataset is not None and not dataset.empty:
                # Calculate Renko Bricks
                pdf = pd.DataFrame(dataset)
                renko_values = renko(pdf, period)  
                return renko_values
            else:
                logging.error("Failed to calculate Renko") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

    # BOLLINGER BANDS        
    def option_bollinger_bands(self, dataset, period):
        try:
            bollinger_values = {}
            if dataset is not None and not dataset.empty:
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
                logging.error("Failed to calculate Bollinger Bands") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

    def invalid_option(self, dataset):
        # Invalid indicator option provided
        logging.warn("The indicator option provided is not valid") 
        