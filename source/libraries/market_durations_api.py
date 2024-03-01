import calendar
import datetime as dt
import source.libraries.market_holidays_api as _marketHolidays

class MarketDurations:
    def __init__(self, depth):
        self.depth = depth

    def calculate_all_durations(self):
        all_durations = {
            'sameday': self.get_duration_sameday(self.depth),
            'minute': self.get_duration_minutes(self.depth),
            'hour': self.get_duration_hour(self.depth),
            'day': self.get_duration_day(self.depth),
            'week': self.get_duration_week(self.depth),
            'month': self.get_duration_month(self.depth)
        }
        
        return all_durations

    def get_duration_sameday(self, depth=1):
        
        duration_in_days = 0       
        min_duration     = 1
        trading_holidays = self.get_market_holidays()  
        today            = dt.date.today()
        
        for i in range(0, min_duration):
            current_year     = today.year
            current_month    = today.month
            current_weekday  = today.weekday()

            if current_weekday == 5:            # Saturday
                today -= dt.timedelta(days=1)   # Move back to Friday
                duration_in_days += 1
            elif current_weekday == 6:          # Sunday
                today -= dt.timedelta(days=2)   # Move back to Friday
                duration_in_days += 2

            # Update the duration for each working day
            duration_in_days += 1
            today -= dt.timedelta(days=1)
            
            # Iterate over the trading holidays and check if they fall within the depth or min_duration
            for holiday in trading_holidays:
                holiday_date = holiday['date']
                current_holiday = (today - holiday_date).days
            
                # Check if the holiday is not on a Saturday (5) or Sunday (6)
                if current_holiday < 0:
                    break
            
                if current_holiday >= 0 and current_holiday <= min_duration \
                        and holiday_date.weekday() != 5 and holiday_date.weekday() != 6:
                    duration_in_days += 1

        return duration_in_days

    def get_duration_minutes(self, depth):
        
        duration_in_days = 0       
        min_duration     = depth if depth > 1 else 2
        trading_holidays = self.get_market_holidays()  
        today            = dt.date.today()
        
        for i in range(0, min_duration):
            current_year     = today.year
            current_month    = today.month
            current_weekday  = today.weekday()

            if current_weekday == 5:            # Saturday
                today -= dt.timedelta(days=1)   # Move back to Friday
                duration_in_days += 1
            elif current_weekday == 6:          # Sunday
                today -= dt.timedelta(days=2)   # Move back to Friday
                duration_in_days += 2

            # Update the duration for each working day
            duration_in_days += 1
            today -= dt.timedelta(days=1)
            
            # Iterate over the trading holidays and check if they fall within the depth or min_duration
            for holiday in trading_holidays:
                holiday_date = holiday['date']
                current_holiday = (today - holiday_date).days
            
                # Check if the holiday is not on a Saturday (5) or Sunday (6)
                if current_holiday < 0:
                    break
            
                if current_holiday >= 0 and current_holiday <= min_duration \
                        and holiday_date.weekday() != 5 and holiday_date.weekday() != 6:
                    duration_in_days += 1

        return duration_in_days

    def get_duration_hour(self, depth):
        
        duration_in_days = 0       
        min_duration     = depth if depth > 1 else 2
        trading_holidays = self.get_market_holidays()  
        today            = dt.date.today()
        
        for i in range(0, min_duration):
            current_year     = today.year
            current_month    = today.month
            current_weekday  = today.weekday()

            if current_weekday == 5:            # Saturday
                today -= dt.timedelta(days=1)   # Move back to Friday
                duration_in_days += 1
            elif current_weekday == 6:          # Sunday
                today -= dt.timedelta(days=2)   # Move back to Friday
                duration_in_days += 2

            # Update the duration for each working day
            duration_in_days += 1
            today -= dt.timedelta(days=1)
            
            # Iterate over the trading holidays and check if they fall within the depth or min_duration
            for holiday in trading_holidays:
                holiday_date = holiday['date']
                current_holiday = (today - holiday_date).days
            
                # Check if the holiday is not on a Saturday (5) or Sunday (6)
                if current_holiday < 0:
                    break
            
                if current_holiday >= 0 and current_holiday <= min_duration \
                        and holiday_date.weekday() != 5 and holiday_date.weekday() != 6:
                    duration_in_days += 1

        return duration_in_days

    def get_duration_day(self, depth):
        
        duration_in_days = 0       
        min_duration     = depth if depth > 1 else 2
        trading_holidays = self.get_market_holidays()  
        today            = dt.date.today()
        
        for i in range(0, min_duration):
            current_year     = today.year
            current_month    = today.month
            current_weekday  = today.weekday()

            if current_weekday == 5:            # Saturday
                today -= dt.timedelta(days=1)   # Move back to Friday
                duration_in_days += 1
            elif current_weekday == 6:          # Sunday
                today -= dt.timedelta(days=2)   # Move back to Friday
                duration_in_days += 2

            # Update the duration for each working day
            duration_in_days += 1
            today -= dt.timedelta(days=1)
            
            # Iterate over the trading holidays and check if they fall within the depth or min_duration
            for holiday in trading_holidays:
                holiday_date = holiday['date']
                current_holiday = (today - holiday_date).days
            
                # Check if the holiday is not on a Saturday (5) or Sunday (6)
                if current_holiday < 0:
                    break
            
                if current_holiday >= 0 and current_holiday <= min_duration \
                        and holiday_date.weekday() != 5 and holiday_date.weekday() != 6:
                    duration_in_days += 1

        return duration_in_days

    def get_duration_week(self, depth):

        duration_in_days = 0
        min_duration = depth if depth > 1 else 2
        today = dt.date.today()

        for i in range(min_duration):
            if i == 0:
                # Get the number of days in the current week until today
                duration_in_days += today.weekday() + 1
            else:
                # Add 7 days for each subsequent week
                duration_in_days += 7

        return duration_in_days

        
    def get_duration_month(self, depth):
        
        duration_in_days = 0     
        min_duration = depth if depth > 1 else 2
        today = dt.date.today()
        current_year = today.year
        current_month = today.month
        current_day = today.day
        
        for i in range(0, min_duration):
            month = 12 if current_month - i == 0 else current_month - i
            days_in_month = calendar.monthrange(current_year, month)[1]
            if i == 0:
                duration_in_days = current_day
            else:
                duration_in_days += days_in_month
        
        return duration_in_days
    

    def get_market_holidays(self):
        # URL of the NSE India webpage containing holiday information
        url = "https://zerodha.com/marketintel/holiday-calendar/"

        # Scrape holiday data from the webpage
        nse_holiday_information = _marketHolidays.market_holidays(url)

        return nse_holiday_information
