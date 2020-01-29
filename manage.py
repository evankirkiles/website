""" The manager for the website backend

Also builds the Flask web server app.

"""

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

from app import create_app, db

import os

# Build the app with the config specified in config.env
app = create_app(os.getenv("FLASK_CONFIG") or "default")

# Add the CLI manager to the app to allow commands
manager = Manager(app)
migrate = Migrate(app)
manager.add_command("db", MigrateCommand)

# Run the manager to listen for a CLI input
if __name__ == "__main__":
	manager.run()