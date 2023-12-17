from nsetools import Nse
import pandas as pd

def get_historical_data_for_current_year(symbol, start_date, end_date):
    nse = Nse()
    
    try:
        historical_data = nse.get_history(symbol, start=start_date, end=end_date)
        if historical_data:
            historical_data['Date'] = pd.to_datetime(historical_data['Date'])
            historical_data.set_index('Date', inplace=True)
            return historical_data
        else:
            print(f"No historical data available for {symbol} in the specified date range.")
            return None
    except Exception as e:
        print(f"Error fetching data for {symbol}: {str(e)}")
        return None

