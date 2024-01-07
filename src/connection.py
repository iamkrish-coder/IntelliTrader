import logging
import pyotp
import time
import datetime
from time import sleep
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from src.helper import Helper

class Connection:
    def __init__(self, params):
        self.prop = params

    def broker_login(self, KiteConnect, KiteTicker):
        # Assign properties
        api_key = self.prop.get('api_key')
        secret_key = self.prop.get('secret_key')
        user_id = self.prop.get('user_id')
        user_pass = self.prop.get('user_pass')
        mfa_token = self.prop.get('mfa_token')

        kite = KiteConnect(api_key=api_key)

        # Initialize browser service
        driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))

        # Auto enter login information
        driver.get(kite.login_url())
        driver.implicitly_wait(10)

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

        driver.implicitly_wait(10)

        # Submit button
        submit = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//*[@id="container"]/div/div/div[2]/form/div[4]/button'))
        )
        submit.click()

        # MFA / external TOTP
        totp = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//*[@id="container"]/div[2]/div/div/form/div[1]/input'))
        )
        authkey = pyotp.TOTP(mfa_token)
        totp.send_keys(authkey.now())

        continue_btn = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//*[@id="container"]/div[2]/div/div/form/div[2]/button'))
        )

        time.sleep(5)
        auth_date = datetime.datetime.now().strftime('%d%H');

        # Request token generation
        url = driver.current_url
        url_parts = url.split('request_token=')
        if len(url_parts) > 1:
            initial_token = url_parts[1]
            request_token = initial_token.split('&')[0]
            Helper.write_text_output('request_token' + '_' + auth_date + '.txt', request_token)
            logging.info("Kite request_token generated successfully")
        else:
            # Handle the case when the 'request_token=' delimiter is not found
            logging.error("Kite 'request_token=' not found in the URL")
            with open('./src/output/request_token' + '_' + auth_date + '.txt', 'r') as r_file:
                request_token = r_file.readline()
                r_file.close()

        # Access token generation
        data = kite.generate_session(request_token, api_secret=secret_key)
        access_token = data['access_token']
        Helper.write_text_output('access_token' + '_' + auth_date + '.txt', access_token)
        logging.info("Kite access_token generated successfully")

        # Kite Ticker Subscription
        kite_ticker = KiteTicker(api_key, access_token)

        driver.quit()

        return kite, kite_ticker, access_token
