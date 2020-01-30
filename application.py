""" Starts the application through WSGIPath

"""

from app import create_app, db

import os

# Build the app with the config specified in config.env
app = create_app(os.getenv("FLASK_CONFIG") or "default")