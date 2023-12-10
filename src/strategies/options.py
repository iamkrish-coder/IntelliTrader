import src.strategies.shared as shared

def nifty_scalper(self, dataset):
    if dataset:
        common_utils = dataset['common_utils']
        user_input = dataset['user_input']

        # Input values
        m_ticker = user_input['ticker']
        m_strike = user_input['strike']
        m_exchange = user_input['exchange']
        m_expiry_offset = user_input['expiry'] 
        m_strike_offset = user_input['strikes'] 

        # Get derivative instrument's last traded price
        current_index = shared.get_underlying_ltp(self, m_ticker)

        if current_index:
            # Get NFO instruments dump
            nfo_dump = common_utils['fetch'].fetch_instruments(m_exchange)
        
            # Get specific instrument's option contracts
            ce_options = shared.get_options(nfo_dump, m_ticker, m_strike[0], m_exchange)
            pe_options = shared.get_options(nfo_dump, m_ticker, m_strike[1], m_exchange)

            # Get specific instrument's current expiry option contracts
            ce_options_current = shared.get_options_with_expiry(ce_options, m_expiry_offset)
            pe_options_current = shared.get_options_with_expiry(pe_options, m_expiry_offset)

            # Get option chain for call and put contracts
            call_option_chain = shared.get_call_option_chain(ce_options_current,current_index, m_strike_offset)
            put_option_chain = shared.get_put_option_chain(pe_options_current, current_index, m_strike_offset)

            print(call_option_chain)
            print(put_option_chain)
