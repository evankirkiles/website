"""Initializes the Flask web server app

Defines the create_app function which builds the app instance and
applies middlewares and sets up the config for the environment.

"""

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

from config import config as Config

import os

# Initialize middlewares
db = SQLAlchemy()
jwt = JWTManager()

def create_app(config):
    """Initialize the Flask web server"""
    template_dir = os.path.abspath('./app/templates')
    app = Flask(__name__, static_url_path="", static_folder="static", template_folder=template_dir)

    # Config stuff
    config_name = config
    if not isinstance(config, str):
        config_name = os.getenv("FLASK_CONFIG", "default")
    app.config.from_object(Config[config_name])
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    Config[config_name].init_app(app)
    app.secret_key = app.config["SECRET_KEY"]

    # Set up middlewares
    db.init_app(app)
    jwt.init_app(app)

    # Create app blueprints
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)
    from .api import thoughts_bp as thoughts_blueprint
    app.register_blueprint(thoughts_blueprint, url_prefix="/api/thoughts")
    from .api import auth_bp as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix="/api/auth")
    from .api import books_bp as books_blueprint
    app.register_blueprint(books_blueprint, url_prefix="/api/books")

    return app