""" The manager for the website backend

Also builds the Flask web server app.

"""

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

from app import create_app, db
from app.models import User, Section

import os

# Build the app with the config specified in config.env
app = create_app(os.getenv("FLASK_CONFIG") or "default")

# Add the CLI manager to the app to allow commands
manager = Manager(app)
migrate = Migrate(app, db)
manager.add_command("db", MigrateCommand)

@manager.command
def recreate_db():
    """
    Recreates a local database. You probably should not use this on
    production.
    """
    db.drop_all()
    db.create_all()
    db.session.commit()

@manager.command
def create_admin():
    """Creates the admin account"""
    user = User(
        name=os.getenv("ADMIN_NAME"), 
        username=os.getenv("ADMIN_USERNAME"),
        password=os.getenv("ADMIN_PASSWORD"))
    db.session.add(user)
    db.session.commit()

@manager.command
def create_section():
    """Creates the general section"""
    section = Section(
        index=1,
        name="General")
    db.session.add(section)
    db.session.commit()

# Run the manager to listen for a CLI input
if __name__ == "__main__":
	manager.run()