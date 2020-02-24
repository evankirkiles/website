from flask import Blueprint, render_template
from flask_jwt_extended import jwt_required

# Create the main blueprint
main = Blueprint("main", __name__)

# Add the index page
@main.route("/")
def index():
    return render_template("main/index.html")

# Add the projects page
@main.route("/projects")
def projects():
    return render_template("main/projects.html")

# Add the books page
@main.route("/books")
def books():
    return render_template("main/books.html")

# Add a login page for validation
@main.route("/login")
def login():
    return render_template("main/login.html")

# Protected endpoints
@main.route("/thoughtbuilder")
@jwt_required
def create_thought():
    return render_template("main/thoughtbuilder.html")