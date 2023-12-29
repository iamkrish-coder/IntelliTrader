from datetime import date
import requests

def get_daily_historical_data(nsedata, dataset):
    # Check if the 'symbol' key is present in the 'dataset' and 'dataset' is not empty
    if 'symbol' not in dataset or not dataset:
        print("Symbol not found in the dataset or the dataset is empty.") 
        return None
    
    try:
        nse_api = nsedata.NSE()
        df = nse_api.getHistoricalData(dataset['symbol'], 'EQ', dataset['start_date'], dataset['end_date'])
        if df is not None:
            selected_columns = ['open', 'high', 'low', 'close', 'volume']
            df_subset = df[selected_columns]
            return df_subset
        else:
            print("Error fetching data or data is empty.")
    except Exception as e:
        print(f"Error fetching data for {dataset['symbol']}: {str(e)}")
        return None


def get_multiple_historical_data(dataset):
    pass