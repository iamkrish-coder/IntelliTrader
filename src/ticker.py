import pandas as pd
import os
import datetime as dt
import time
from src.helper import Helper

class Ticker:
    def __init__(self, params):
        self.prop = params
        self.tokens = []
        self.ticker_data = []  

    # Callback for successful connection.
    def on_connect(self, ws, response):
        self.prop['log'].info("Successfully connected. Response: {}".format(response))
        ws.subscribe(self.tokens)

        if self.mode == "ltp":
            ticker_mode = ws.MODE_LTP
        elif self.mode == "quote":
            ticker_mode = ws.MODE_QUOTE
        elif self.mode == "full":
            ticker_mode = ws.MODE_FULL
        else:
            self.prop['log'].warn("No ticker mode is defined: {}".format(ticker_mode))

        ws.set_mode(ticker_mode, self.tokens)
        self.prop['log'].info("Subscribe to tokens in Full/LTP/Quote mode: {}".format(self.tokens))


    # Callback when current connection is closed.
    def on_close(self, ws, code, reason):
        self.prop['log'].info("Connection closed: {code} - {reason}".format(code=code, reason=reason))
        #ws.stop()

    # Callback when connection closed with error.
    def on_error(self, ws, code, reason):
        self.prop['log'].info("Connection error: {code} - {reason}".format(code=code, reason=reason))


    # Callback when reconnect is on progress
    def on_reconnect(self, ws, attempts_count):
        self.prop['log'].info("Reconnecting: {}".format(attempts_count))


    # Callback when all reconnect failed (exhausted max retries)
    def on_noreconnect(self, ws):
        self.prop['log'].info("Reconnect failed.")

    # Callback for tick reception.
    def on_ticks(self, ws, ticks):
        if len(ticks) > 0:
            #self.prop['log'].info("Current mode: {}".format(ticks[0]["mode"]))
            self.ticker_data.extend(ticks)
            self.process_ticker_data(ws)


    # Process the stored ticker data or perform any required operations
    def process_ticker_data(self, ws):             
        for tick in self.ticker_data:
            print("Ticks: {}".format(tick))
            time.sleep(1)

            if dt.datetime.now().time() >= self.exit_time:
                ws.stop()  # Close the connection at a specific time

            target_profit = self.target_profit
            if tick[-1]['last_price'] >= target_profit:
                ws.stop()  # Close the connection when target price is reached

            stop_loss = self.stop_loss
            if tick[-1]['last_price'] <= stop_loss:
                ws.stop()  # Close the connection when stop loss is triggered

            entry_price = self.entry_price
            target_profit_points = self.target_profit_points
            if tick[-1]['last_price'] >= entry_price + target_profit_points:
                ws.stop()  # Close the connection when profit target is reached

    def connect_to_ticker(self, tokens, mode, user_settings):
        self.tokens = tokens
        self.mode = mode
        self.exit_time = dt.time(15,30)
        self.entry_price = user_settings.en_price
        self.target_profit = user_settings.tp_price
        self.stop_loss = user_settings.sl_price
        self.target_profit_points = user_settings.tp_points
        self.stop_loss_points = user_settings.sl_points

        # Assign the callbacks    
        self.prop['kiteticker'].on_connect = self.on_connect
        self.prop['kiteticker'].on_reconnect = self.on_reconnect
        self.prop['kiteticker'].on_noreconnect = self.on_noreconnect
        self.prop['kiteticker'].on_ticks = self.on_ticks
        self.prop['kiteticker'].on_close = self.on_close
        self.prop['kiteticker'].on_error = self.on_error

        self.prop['kiteticker'].connect(threaded=True, disable_ssl_verification=True)

        while True:
            if self.prop['kiteticker'].is_connected():
                self.prop['kiteticker'].set_mode(self.mode, self.tokens)
            time.sleep(1)