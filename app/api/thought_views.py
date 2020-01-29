""" Interface for getting and creating thoughts!

"""
from flask import Blueprint, request
from flask_jwt_extended import jwt_optional, jwt_required, get_jwt_identity
from sqlalchemy import func

from app import db
from app.models import Thought
from datetime import datetime, timedelta
import json

# Initialize the thought view for getting/sending
thoughts_bp = Blueprint("api/thoughts", __name__)

@thoughts_bp.route("/get", methods=["POST"])
@jwt_optional
def get_thoughts():
    """Retrieves a number of thoughts from the database to render"""
    num_days = request.json.get("num_days_back")
    start_from = request.json.get("start_from")
    fromDate = datetime.strptime(start_from, "%Y-%m-%dT%H:%M:%S.%fZ")
    toDate = fromDate - timedelta(days=num_days)
    results = db.session.query(Thought).filter(
        func.date(Thought.created_on) >= toDate,
        func.date(Thought.created_on) < fromDate).all()
    return (json.dumps({
        "success": True,
        "fromDate": str(fromDate),
        "toDate": str(toDate),
        "results": [{
            "body": thought.body,
            "section": thought.section,
            "created_on": str(thought.created_on)
        } for thought in results]}), 200, {"Content-Type": "application/json"})

@thoughts_bp.route("/create", methods=["POST"])
@jwt_required
def create_thought():
    """Creates a thought!"""
    user = get_jwt_identity()
    body = request.json.get("body")
    section = request.json.get("section")
    thought = Thought(body=body,created_by=user,section=section)
    db.session.add(thought)
    db.session.commit()
    return (json.dumps({"success": True}), 200, {"Content-Type": "application/json"})