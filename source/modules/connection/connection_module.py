import pyotp
import time
import datetime
import json
import glob
from time import sleep
from source.modules.helper.helper_module import Helper
from source.utils.logging_utils import *
from selenium.common.exceptions import TimeoutException
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from kiteconnect import KiteConnect, KiteTicker
from source.aws.aws_secrets_manager import get_secret

class Connection: 
    def __init__(self):
        self.secret_keys = self.get_secret_keys()

    def get_secret_keys(self):
        secret_keys = json.loads(get_secret(SECRET_NAME, REGION_NAME))
        return secret_keys

    def connect_to_broker(self):
        api_key = self.secret_keys.get('api_key')
        auth_date = datetime.datetime.now().strftime('%d%H')
        access_token_file = f"{ACCESS_TOKEN_PATH + '_' + auth_date + '.txt'}"

        # Establish connection
        if os.path.isfile(access_token_file):
            kite, kite_ticker, access_token = self.establish_old_connection(api_key)
        else:
            self.remove_old_tokens()
            kite, kite_ticker, access_token = self.establish_new_connection()

        # Initialize connection object
        connection_object = {
            "kite" : kite,
            "kiteticker": kite_ticker,
            "authorize" : access_token
        }
        return connection_object
    
    def establish_old_connection(self, api_key):
        auth_date = datetime.datetime.now().strftime('%d%H')
        access_token = open(ACCESS_TOKEN_PATH + '_' + auth_date +  '.txt','r').read()
        kite = KiteConnect(api_key)
        kite_ticker = KiteTicker(api_key, access_token)
        kite.set_access_token(access_token)
        log_info(INFO.CONNECT_KITE_COMPLETE)
        return kite, kite_ticker, access_token

    def establish_new_connection(self):
        kite, kite_ticker, access_token = self.broker_login(KiteConnect, KiteTicker)
        kite.set_access_token(access_token)
        log_info(INFO.NEW_CONNECTION_REQUEST_COMPLETE)       
        return kite, kite_ticker, access_token

    def remove_old_tokens(self):
        old_access_token_files = glob.glob(ACCESS_TOKEN_PATH + '*.txt')
        for old_access_token_file in old_access_token_files:
            self.remove_file(old_access_token_file)

        old_request_token_files = glob.glob(REQUEST_TOKEN_PATH + '*.txt')
        for old_request_token_file in old_request_token_files:
            self.remove_file(old_request_token_file)

    def remove_file(self, file_path):
        try:
            os.remove(file_path)
        except Exception as e:
            log_error(ERROR.REMOVE_FILE_ERROR, file_path)

    def broker_login(self, KiteConnect, KiteTicker):
        # Assign properties
        api_key = self.secret_keys.get('api_key')
        secret_key = self.secret_keys.get('secret_key')
        user_id = self.secret_keys.get('user_id')
        user_pass = self.secret_keys.get('user_pass')
        mfa_token = self.secret_keys.get('mfa_token')

        kite = KiteConnect(api_key=api_key)

        # Initialize browser service
        driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))

        try:
            # Auto enter login information
            driver.get(kite.login_url())

            # Username input
            username = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, '//*[@id="userid"]'))
            )
            username.send_keys(user_id)

            # Password input
            password = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, '//*[@id="password"]'))
            )
            password.send_keys(user_pass)

            # Submit button
            submit = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, '//*[@id="container"]/div/div/div[2]/form/div[4]/button'))
                
            )
            submit.click()

            # MFA / external TOTP
            totp = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, '//*[@id="container"]/div[2]/div/div/form/div[1]/input'))
            )
            authkey = pyotp.TOTP(mfa_token)
            totp.send_keys(authkey.now())

            auth_date = datetime.datetime.now().strftime('%d%H')
            sleep(3)

            # Request token generation
            url = driver.current_url
            url_parts = url.split('request_token=')
            if len(url_parts) > 1:
                initial_token = url_parts[1].split('&')[0]
                token_str = str(initial_token)
                Helper().write_text_output('request_token' + '_' + auth_date + '.txt', token_str)
                log_info("Generate Kite Request Token ...COMPLETE!")
            else:
                log_error("Kite Request Token Not Found")

            # Access token generation
            data = kite.generate_session(initial_token, api_secret=secret_key)
            access_token = data['access_token']
            token_str = str(access_token)
            Helper().write_text_output('access_token' + '_' + auth_date + '.txt', token_str)
            log_info("Generate Kite Access Token ...COMPLETE!")

            # Kite Ticker Subscription
            kite_ticker = KiteTicker(api_key, access_token)

            return kite, kite_ticker, access_token

        except Exception as e:
            log_error(f"Error during broker login: {e}")
            raise

        finally:
            if driver:
                driver.quit()
