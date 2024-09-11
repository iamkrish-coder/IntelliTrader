# IntelliTrader_web.py

from flask import Flask, render_template, request, redirect, session, send_from_directory
from source.constants.const import *
from source.enumerations.enums import *
import os


# Other imports for routes and logic (if needed)

def create_web_app(configuration):

    app = Flask(__name__,
                static_url_path='/static',
                static_folder=os.path.join(os.path.dirname(__file__), 'source_web/public' if os.path.exists(
                    'source_web/public') else 'source_web/build'))

    @app.route('/')
    def index():
        # Render the index.html template
        return render_template('index.html')

    return app
