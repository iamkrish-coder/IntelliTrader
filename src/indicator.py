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
from asyncio.windows_events import NULL

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
        rsi_result = {}    
        try:
            if dataset is not None:
                # Calculate RSI
                for stock_name, stock_data in dataset.items():
                    pdf = pd.DataFrame(stock_data)
                    rsi_result = rsi(pdf, period)
                   
                return rsi_result
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
                for stock_name, stock_data in dataset.items():
                    pdf = pd.DataFrame(stock_data)
                    wma_result = ma.wma(pdf, period)
                    
                return wma_result
            else:
                logging.error("Failed to calculate WMA") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

    # SMA            
    def option_sma(self, dataset, period):
        try:
            if dataset is not None:
                # Calculate SMA
                for stock_name, stock_data in dataset.items():
                    pdf = pd.DataFrame(stock_data)
                    sma_result = ma.sma(pdf, period)
                    
                return sma_result
            else:
                logging.error("Failed to calculate SMA") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

    # EMA
    def option_ema(self, dataset, period):
        try:
            if dataset is not None:
                # Calculate EMA
                for stock_name, stock_data in dataset.items():
                    pdf = pd.DataFrame(stock_data)
                    ema_result = ma.ema(pdf, period)
                    
                return ema_result
            else:
                logging.error("Failed to calculate EMA") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))
            
    # SUPERTREND
    def option_supertrend(self, dataset, period):
        try:
            if dataset is not None:
                # Calculate SUPERTREND
                for stock_name, stock_data in dataset.items():
                    pdf = pd.DataFrame(stock_data)
                    supertrend_result = supertrend(pdf, period)

                return supertrend_result
            else:
                logging.error("Failed to calculate SUPERTREND")
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

    def option_macd(self, dataset):
        try:
            if dataset is not None and not dataset.empty:
                # Calculate MACD
                pdf = pd.DataFrame(dataset)
                macd_line, signal_line, macd_histogram = macd(pdf)
                last_macd_value = macd_line.iloc[-1]
                last_signal_value = signal_line.iloc[-1]
                last_histogram_value = macd_histogram.iloc[-1]

                # logging.info the calculated MACD values
                logging.info("\nMACD Line:")
                logging.info(macd_line)

                logging.info("\nSignal Line:")
                logging.info(signal_line)  

                logging.info("\nMACD Histogram:")
                logging.info(macd_histogram)
            else:
                logging.error("Failed to calculate MACD") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

    def option_atr(self, dataset):
        try:
            if dataset is not None and not dataset.empty:
                # Calculate ATR
                pdf = pd.DataFrame(dataset)
                atr_line = atr(pdf)
                last_atr_value = atr_line[-1]

                # logging.info the calculated ATR values
                logging.info("\nATR Line:")
                logging.info(atr_line)
            else:
                logging.error("Failed to calculate ATR") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

    def option_williams_r(self, dataset):
        try:
            if dataset is not None and not dataset.empty:
                # Calculate Williams %R
                pdf = pd.DataFrame(dataset)
                williams_r_line = williams_r(pdf)
                last_williams_r_value = williams_r_line[-1]

                # logging.info the calculated Williams %R values
                logging.info("\nWilliams %R Line:")
                logging.info(williams_r_line)
            else:
                logging.error("Failed to calculate Williams Range") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

    def option_vwap(self, dataset):
        try:
            if dataset is not None and not dataset.empty:
                # Calculate VWAP
                pdf = pd.DataFrame(dataset)
                vwap_line = vwap(pdf)
                last_vwap_value = vwap_line.iloc[-1]

                # logging.info the calculated VWAP values
                logging.info("\nVWAP Line:")
                logging.info(vwap_line)
            else:
                logging.error("Failed to calculate VWAP") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

    def option_adx(self, dataset):
        try:
            if dataset is not None and not dataset.empty:
                # Calculate ADX
                pdf = pd.DataFrame(dataset)
                adx_line = adx(pdf)
                last_adx_value = adx_line.iloc[-1]

                # logging.info the calculated ADX values
                logging.info("\nADX Line:")
                logging.info(adx_line)
            else:
                logging.error("Failed to calculate ADX") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

    def option_stochastic(self, dataset):
        try:
            if dataset is not None and not dataset.empty:
                # Calculate Stochastic
                pdf = pd.DataFrame(dataset)
                stochastic_line_k, stochastic_line_d = stochastic(pdf)
                last_stochastic_k_value = stochastic_line_k.iloc[-1]
                last_stochastic_d_value = stochastic_line_d.iloc[-1]

                # logging.info the calculated Stochastic values
                logging.info("\nStochastic Line %K:")
                logging.info(stochastic_line_k)
                    
                logging.info("\nStochastic Line %D:")
                logging.info(stochastic_line_d)
            else:
                logging.error("Failed to calculate Stochastic") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

    def option_renko(self, dataset, period):
        try:
            if dataset is not None and not dataset.empty:
                # Calculate Renko
                pdf = pd.DataFrame(dataset)
                renko_bricks = renko(pdf, period)
                last_renko_brick = renko_bricks.iloc[-1]

                # logging.info the calculated Renko values
                logging.info("\nRenko Bricks:")
                logging.info(renko_bricks)
            else:
                logging.error("Failed to calculate Renko") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

    def option_bollinger_bands(self, dataset):
        try:
            if dataset is not None and not dataset.empty:
                # Calculate Bollinger Bands
                pdf = pd.DataFrame(dataset)
                bollinger_bands = bollinger_bands(pdf)
                last_bollinger_band_value = bollinger_bands.iloc[-1]

                # logging.info the calculated Bollinger Band values
                logging.info("\nBollinger Bands:")
                logging.info(last_bollinger_band_value)
            else:
                logging.error("Failed to calculate Bollinger Band") 
                return False
        except Exception as e:
            logging.error("An exception occurred: {}".format(e))

    def invalid_option(self, dataset):
        # Invalid indicator option provided
        logging.warn("The indicator option provided is not valid") 
        