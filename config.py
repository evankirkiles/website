""" Handles differentiation between dev environment and production

"""

import os

# What environment is being used?
env = os.environ.get("ENV", "production")
# Initialize the base directory for file lookups
basedir = os.path.abspath(os.path.dirname(__file__))
# Import environment variables from .config file if necessary
env_file = "/config/production.env" if env == "production" else \
            env + ".env" if os.path.exists(env + ".env") else None
assert env_file is not None, "ENV file is none!"
if env_file is not None:
    print("Importing env variables from .env file")
    for line in open(env_file):
        var = line.strip().split("=", 1)
        if len(var) == 2:
            os.environ[var[0]] = var[1].replace('"', "")

class Config:
    """Default config variables common across environments

    Stores information used to set up the app.

    Attributes:
        APP_NAME: The name of the app
        BASE_DIR: The directory all these files are in
        JWT_SECRET_KEY: The secret key for signing JWT tokens
        BASE_URI: The base URI for the app configuration
    """
    APP_NAME = os.environ.get("APP_NAME")
    BASE_DIR = basedir
    SSL_DISABLE = os.environ.get("SSL_DISABLE")
    if os.environ.get("SECRET_KEY"):
        SECRET_KEY = os.environ.get("SECRET_KEY")
    else:
        SECRET_KEY = "SECRET_KEY_ENV_VAR_NOT_SET"
        print("Secret key environment variable not set! Careful!")
    JWT_SECRET_KEY = SECRET_KEY
    JWT_HEADER_NAME="EK-Authorization"
    JWT_TOKEN_LOCATION = ['headers', 'cookies']
    JWT_COOKIE_CSRF_PROTECT = False
    BASE_URI = os.environ.get("BASE_URI")

    @staticmethod
    def init_app(cls, app):
        pass

class DevelopmentConfig(Config):
    """The config for an app in development"""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get("DEV_DATABASE_URL", 
        "sqlite:///" + os.path.join(basedir, "data-dev.sqlite"))

    @classmethod
    def init_app(cls, app):
        print("Running app in debug mode...")

class ProductionConfig(Config):
    """The config for an app in production"""
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", 
        "sqlite:///" + os.path.join(basedir, "data-dev.sqlite"))

    @classmethod
    def init_app(cls, app):
        print("Running app in production!")


config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": ProductionConfig,
}