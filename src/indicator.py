from asyncio.windows_events import NULL
import os
import datetime as dt
import time
import pandas as pd
from src.helper import Helper
from src.indicators.macd import macd
from src.indicators.rsi import rsi
from src.indicators.atr import atr
from src.indicators.williams_r import williams_r
import src.indicators.ma as ma
from src.indicators.vwap import vwap
from src.indicators.adx import adx
from src.indicators.stochastic import stochastic
from src.indicators.renko import renko

class Indicator:
    def __init__(self, params):
        self.prop = params

    def execute_handler(self, indicator_option, dataset, period=0):
        match indicator_option:
            case 'macd':
                self.option_macd(dataset)
            case 'rsi':
                self.option_rsi(dataset)
            case 'atr':
                self.option_atr(dataset)
            case 'sma':
                self.option_sma(dataset)
            case 'ema':
                self.option_ema(dataset)
            case 'williams_r':
                self.option_williams_r(dataset)
            case 'vwap':
                self.option_vwap(dataset)
            case 'adx':
                self.option_adx(dataset)
            case 'stochastic':
                self.option_stochastic(dataset)
            case 'renko':
                self.option_renko(dataset, period)
                
            case _:
                self.invalid_option(dataset)

    def option_macd(self, dataset):
        try:
            if dataset is not None and not dataset.empty:
                # Calculate MACD
                pdf = pd.DataFrame(dataset)
                macd_line, signal_line, macd_histogram = macd(pdf)
                last_macd_value = macd_line.iloc[-1]
                last_signal_value = signal_line.iloc[-1]
                last_histogram_value = macd_histogram.iloc[-1]

                # Print the calculated MACD values
                print("\nMACD Line:")
                print(macd_line)

                print("\nSignal Line:")
                print(signal_line)  

                print("\nMACD Histogram:")
                print(macd_histogram)
            else:
                self.prop['log'].error("Failed to calculate MACD") 
                return False
        except Exception as e:
            self.prop['log'].error("An exception occurred: {}".format(e))

    def option_rsi(self, dataset):
            try:
                if dataset is not None and not dataset.empty:
                    # Calculate RSI
                    pdf = pd.DataFrame(dataset)
                    rsi_line = rsi(pdf)
                    last_rsi_value = rsi_line[-1]

                    # Print the calculated RSI values
                    print("\nRSI Line:")
                    print(rsi_line)
                else:
                    self.prop['log'].error("Failed to calculate RSI") 
                    return False
            except Exception as e:
                self.prop['log'].error("An exception occurred: {}".format(e))

    def option_atr(self, dataset):
            try:
                if dataset is not None and not dataset.empty:
                    # Calculate ATR
                    pdf = pd.DataFrame(dataset)
                    atr_line = atr(pdf)
                    last_atr_value = atr_line[-1]

                    # Print the calculated ATR values
                    print("\nATR Line:")
                    print(atr_line)
                else:
                    self.prop['log'].error("Failed to calculate ATR") 
                    return False
            except Exception as e:
                self.prop['log'].error("An exception occurred: {}".format(e))

    def option_sma(self, dataset):
            try:
                if dataset is not None and not dataset.empty:
                    # Calculate SMA
                    pdf = pd.DataFrame(dataset)
                    sma_line = ma.sma(pdf)
                    last_sma_value = sma_line.iloc[-1]

                    # Print the calculated SMA values
                    print("\nSMA Line:")
                    print(sma_line)
                else:
                    self.prop['log'].error("Failed to calculate SMA") 
                    return False
            except Exception as e:
                self.prop['log'].error("An exception occurred: {}".format(e))

    def option_ema(self, dataset):
            try:
                if dataset is not None and not dataset.empty:
                    # Calculate EMA
                    pdf = pd.DataFrame(dataset)
                    ema_line = ma.ema(pdf)
                    last_ema_value = ema_line.iloc[-1]

                    # Print the calculated EMA values
                    print("\nEMA Line:")
                    print(ema_line)
                else:
                    self.prop['log'].error("Failed to calculate EMA") 
                    return False
            except Exception as e:
                self.prop['log'].error("An exception occurred: {}".format(e))

    def option_williams_r(self, dataset):
            try:
                if dataset is not None and not dataset.empty:
                    # Calculate Williams %R
                    pdf = pd.DataFrame(dataset)
                    williams_r_line = williams_r(pdf)
                    last_williams_r_value = williams_r_line[-1]

                    # Print the calculated Williams %R values
                    print("\nWilliams %R Line:")
                    print(williams_r_line)
                else:
                    self.prop['log'].error("Failed to calculate Williams Range") 
                    return False
            except Exception as e:
                self.prop['log'].error("An exception occurred: {}".format(e))

    def option_vwap(self, dataset):
            try:
                if dataset is not None and not dataset.empty:
                    # Calculate VWAP
                    pdf = pd.DataFrame(dataset)
                    vwap_line = vwap(pdf)
                    last_vwap_value = vwap_line.iloc[-1]

                    # Print the calculated VWAP values
                    print("\nVWAP Line:")
                    print(vwap_line)
                else:
                    self.prop['log'].error("Failed to calculate VWAP") 
                    return False
            except Exception as e:
                self.prop['log'].error("An exception occurred: {}".format(e))

    def option_adx(self, dataset):
            try:
                if dataset is not None and not dataset.empty:
                    # Calculate ADX
                    pdf = pd.DataFrame(dataset)
                    adx_line = adx(pdf)
                    last_adx_value = adx_line.iloc[-1]

                    # Print the calculated ADX values
                    print("\nADX Line:")
                    print(adx_line)
                else:
                    self.prop['log'].error("Failed to calculate ADX") 
                    return False
            except Exception as e:
                self.prop['log'].error("An exception occurred: {}".format(e))

    def option_stochastic(self, dataset):
            try:
                if dataset is not None and not dataset.empty:
                    # Calculate Stochastic
                    pdf = pd.DataFrame(dataset)
                    stochastic_line_k, stochastic_line_d = stochastic(pdf)
                    last_stochastic_k_value = stochastic_line_k.iloc[-1]
                    last_stochastic_d_value = stochastic_line_d.iloc[-1]

                    # Print the calculated Stochastic values
                    print("\nStochastic Line %K:")
                    print(stochastic_line_k)
                    
                    print("\nStochastic Line %D:")
                    print(stochastic_line_d)
                else:
                    self.prop['log'].error("Failed to calculate Stochastic") 
                    return False
            except Exception as e:
                self.prop['log'].error("An exception occurred: {}".format(e))

    def option_renko(self, dataset, period):
            try:
                if dataset is not None and not dataset.empty:
                    # Calculate Renko
                    pdf = pd.DataFrame(dataset)
                    renko_bricks = renko(pdf, period)
                    last_renko_brick = renko_bricks.iloc[-1]

                    # Print the calculated Renko values
                    print("\nRenko Bricks:")
                    print(renko_bricks)
                else:
                    self.prop['log'].error("Failed to calculate Renko") 
                    return False
            except Exception as e:
                self.prop['log'].error("An exception occurred: {}".format(e))

    def invalid_option(self, dataset):
        # Invalid indicator option provided
        self.prop['log'].warn("The indicator option provided is not valid") 
        