""" Starts the application through WSGIPath

"""

from app import create_app, db

import os

# Build the app with the config specified in config.env
application = create_app(os.getenv("ENV") or "default")

if __name__ == "__main__":
    application.run()