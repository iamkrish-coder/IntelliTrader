import pandas as pd
import numpy as np
import datetime as dt
import yfinance as yf

def get_underlying_ltp(self, ticker):
    stock = ticker if ticker not in ('NIFTY', 'BANKNIFTY') else None

    if ticker == 'NIFTY':
        underlying = '^NSEI'
    elif ticker == 'BANKNIFTY':
        underlying = '^NSEBANK'
    elif stock is not None:
        underlying = stock + '.NS'
    else:
        self.prop['log'].error("The derivative instrument provided is invalid")
        return False

    hist_data = yf.download(underlying, period='5d')
    underlying_current_price = hist_data['Adj Close'].iloc[-1]
    return underlying_current_price

def get_options(dump, ticker, strike, exchange):
    contracts = []
    for instrument in dump:
        if instrument['name']==ticker and instrument['instrument_type']==strike:
            contracts.append(instrument)
    return pd.DataFrame(contracts)

def get_options_with_expiry(contracts, expiry_span):
    contracts['time_to_expiry'] = (pd.to_datetime(contracts['expiry']) - dt.datetime.now()).dt.days
    next_expiry_in_days = np.sort(contracts['time_to_expiry'].unique())
    if expiry_span <= len(next_expiry_in_days):
        expiry_eta = next_expiry_in_days[expiry_span]
    else:
        min_day_count = None 
    return (contracts[contracts["time_to_expiry"] == expiry_eta]).reset_index(drop=True)

def get_options_ce_atm(contracts, current_index_price):
    return abs(contracts['strike'] - current_index_price).argmin()

def get_options_pe_atm(contracts, current_index_price):
    return abs(contracts['strike'] - current_index_price).argmin()

def get_call_option_chain(contracts, current_index_price, strike_span):
    contracts.sort_values(by=['strike'], inplace=True, ignore_index=True)
    atm_index = (abs(contracts['strike'] - current_index_price).argmin()) + 2
    return contracts.iloc[atm_index-strike_span:atm_index] 

def get_put_option_chain(contracts, current_index_price, strike_span):
    contracts.sort_values(by=['strike'], inplace=True, ignore_index=True)
    atm_index = (abs(contracts['strike'] - current_index_price).argmin()) + 1
    return contracts.iloc[atm_index:atm_index+strike_span] 
