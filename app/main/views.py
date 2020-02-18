from flask import Blueprint, render_template

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