# IntelliTrader

**IntelliTrader** is a cutting-edge algorithmic trading application tailored for personal use, empowering users to automate and optimize their trading strategies. The application is designed using the Python programming language and seamlessly integrates with the KiteConnect API for robust connectivity to financial markets.

## Development Notes


pip install -r requirements.txt

pip list --outdated

Upgrade the packages Manually for now

Build new requirements.txt File

pip install pipreqs

pipreqs --force  /home/srikrishnan/Desktop/Projects/IntelliTrader > requirements.txt


### Historical API Frequency and Limit on Number of Candles Fetched

- **Minute: 60 days**
- **3-minute: 100 days**
- **5-minute: 100 days**
- **10-minute: 100 days**
- **15-minute: 200 days**
- **30-minute: 200 days**
- **60-minute: 400 days**
- **Day: 2000 days**

### Variety

- **Regular:** Regular order
- **AMO:** After Market Order
- **CO:** Cover Order
- **Iceberg:** Iceberg Order
- **Auction:** Auction Order

### Order Types

- **MARKET:** Market order
- **LIMIT:** Limit order
- **SL:** Stoploss order
- **SL-M:** Stoploss-market order

### Product Types

- **CNC:** Cash & Carry for equity
- **NRML:** Normal for futures and options
- **MIS:** Margin Intraday Squareoff for futures and options.
  
### Commit Message Convention

#### fix: Represents bug fixes, correlates to a SemVer patch.
#### feat: Represents a new feature, correlates to a SemVer minor.
#### feat!:, fix!:, refactor!: Represents a breaking change (indicated by the !) and will result in a SemVer major.
#### feat(lang): add Polish language
#### feat(api)!: send an email to the customer when a product is shipped
#### docs: correct spelling of CHANGELOG
#### revert: let us never again speak of the noodle incident

-----------------------------------------------------------------------------------------------------------------

### Order Placement Example

```python
if transaction == 'buy':
    transaction_type = self.prop['kite'].TRANSACTION_TYPE_BUY
elif transaction == 'sell':
    transaction_type = self.prop['kite'].TRANSACTION_TYPE_SELL
else:
    logging.error("The order placement does not have a specified action to buy or sell.")
    exit()

order_single = [{
    "exchange": exchange,
    "tradingsymbol": symbol,
    "transaction_type": transaction_type,
    "quantity": quantity,
    "order_type": otype,
    "product": product,
    "price": price,
}]

order_oco = [{
    "exchange": "NSE",
    "tradingsymbol": "SBIN",
    "transaction_type": transaction_type,
    "quantity": 1,
    "order_type": "LIMIT",
    "product": "CNC",
    "price": price
}, {
    "exchange": "NSE",
    "tradingsymbol": "SBIN",
    "transaction_type": self.prop['kite'].TRANSACTION_TYPE_SELL,
    "quantity": 1,
    "order_type": "LIMIT",
    "product": "CNC",
    "price": 480
}]

res = fetch.fetch_quote('NSE', 'AAVAS')
res = fetch.fetch_ltp('NSE', 'AAVAS')
res = fetch.fetch_positions()
res = fetch.fetch_holdings()
res = fetch.fetch_orders()
logging.info(res)

res = fetch.fetch_quote('NSE', 'AAVAS')
res = fetch.fetch_ltp('NSE', 'AAVAS')
res = fetch.fetch_positions()
res = fetch.fetch_holdings()
res = fetch.fetch_orders()
logging.info(res)

###############################################
# ATM Options Sample Output
###############################################

# Call Option
instrument_token: 12254978
exchange_token: 47871
tradingsymbol: NIFTY2381019500CE
name: NIFTY
last_price: 0.0
expiry: 2023-08-10
strike: 19500.0
tick_size: 0.05
lot_size: 50
instrument_type: CE
segment: NFO-OPT
exchange: NFO
time_to_expiry: 4

# Put Option
instrument_token: 12255234
exchange_token: 47872
tradingsymbol: NIFTY2381019500PE
name: NIFTY
last_price: 0.0
expiry: 2023-08-10
strike: 19500.0
tick_size: 0.05
lot_size: 50
instrument_type: PE
segment: NFO-OPT
exchange: NFO
time_to_expiry: 4

# NSE historical data // Alternative zerodha historical subscription
# Example usage:
# symbol = 'TCS'
# start_date = '2023-01-01'
# end_date = '2023-12-31'
# data = get_historical_data(symbol, start_date, end_date)
# print(data)

Architecture Flow:

Publisher: Your Python application publishes a message to an SNS topic.
SNS Topic: The SNS topic routes the message to all its subscribers.
SQS Queue: In this case, the subscriber is your SQS queue. The message gets delivered to the SQS queue.
Subscriber: Your Python application (acting as the subscriber) polls the SQS queue for new messages.
Message Processing: Upon receiving a message, your application processes the message content.
Diagram:

+-------------------+      +-------------------+      +-------------------+
| Publisher App     |----->| SNS Topic         |----->| SQS Queue           |
+-------------------+      +-------------------+      +-------------------+
                         ^                         |
                         | Receives message        | (Subscriber)
                         |                         |
+-------------------+      +-------------------+
| Subscriber App     |----->| SQS Queue (Polling) |----->| Message Processing |
+-------------------+      +-------------------+      +-------------------+
Explanation:

The publisher application sends a message to the SNS topic.
The SNS topic, acting as a pub/sub mechanism, forwards the message to all its subscribers, which in this case is a single SQS queue.
The SQS queue acts as a buffer, storing the message until the subscriber application polls it.
The subscriber application periodically polls the SQS queue for new messages.
Upon receiving a message, the subscriber application extracts and processes the message content according to your application logic.