from flask import Blueprint, render_template

# Create the main blueprint
main = Blueprint("main", __name__)

# Add the index page
@main.route("/")
def index():
    return render_template("main/index.html")