# IntelliTrader_web.py

from flask import Flask, render_template, request, redirect, session
from source.constants.const import *
from source.enumerations.enums import *
import os


# Other imports for routes and logic (if needed)

def create_web_app(configuration):
    app = Flask(__name__, template_folder=os.path.join(os.path.dirname(__file__), TEMPLATES_PATH),
                static_url_path='/source/static',
                static_folder=os.path.join(os.path.dirname(__file__), STATIC_FILE_PATH))

    @app.route('/')
    def index():
        # Render the index.html template
        return render_template('index.html', settings=configuration)

    @app.route('/login')
    def login():
        # Code for handling login logic (if any)
        return render_template('login.html')

    return app
