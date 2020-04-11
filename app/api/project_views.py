""" Interface for getting and creating book reviews!

"""
from flask import Blueprint, request
from flask_jwt_extended import jwt_optional, jwt_required, get_jwt_identity
from sqlalchemy import func

from app import db
from app.models import Project
from datetime import datetime, timedelta
import json

projects_bp = Blueprint("api/projects", __name__)

@projects_bp.route("/get-all", methods=["GET"])
def get_all_projects():
    """Retrieves the information of all my projects from the database"""
    results = db.session.query(Project).order_by(Project.year.desc())
    return (json.dumps({
        "success": True,
        "results": [{
            "title": project.title,
            "year": project.year,
            "review": project.review,
            "cover": project.cover,
            "id": project.id,
            "created_on": project.created_on.strftime('%Y-%m-%dT%H:%M:%SZ')
        } for project in results]}), 200, {"Content-Type": "application/json"})

@projects_bp.route("/create", methods=["POST"])
@jwt_required
def create_project():
    """Creates a project!"""
    review = request.json.get("review")
    title = request.json.get("title")
    year = request.json.get("year")
    cover = request.json.get("cover")
    project = Project(review=review,title=title,year=year,cover=cover)
    db.session.add(project)
    db.session.commit()
    return (json.dumps({"success": True}), 200, {"Content-Type": "application/json"})

@projects_bp.route("/edit", methods=["POST"])
@jwt_required
def edit_project():
    """Edits a project given by the id."""
    review = request.json.get("review")
    project_id = request.json.get("id")
    project = db.session.query(Project).filter(Project.id == project_id).first()
    project.review = review
    db.session.commit()
    return (json.dumps({"success": True}), 200, {"Content-Type": "application/json"})

@projects_bp.route("/delete", methods=["POST"])
@jwt_required
def delete_project():
    """Deletes a project from the db"""
    project_id = request.json.get("id")
    db.session.query(Project).filter_by(id=project_id).delete()
    db.session.commit()
    return (json.dumps({"success": True}), 200, {"Content-Type": "application/json"})
