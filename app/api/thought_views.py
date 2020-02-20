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
    num_rows = request.json.get("quantity")
    sync_id = request.json.get("sync_id") # Could be empty, if so get most recent
    results = None
    if sync_id == 0:
        results = db.session.query(Thought).order_by(Thought.id.desc()).limit(num_rows)
    else:
        results = db.session.query(Thought).filter(Thought.id < sync_id).\
            order_by(Thought.id.desc()).limit(num_rows)
    return (json.dumps({
        "success": True,
        "sync_id": "" if len(results.all()) == 0 else results[-1].id,
        "results": [{
            "body": thought.body,
            "section": thought.section,
            "created_on": thought.created_on.strftime('%Y-%m-%dT%H:%M:%SZ')
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

@thoughts_bp.route("/edit", methods=["POST"])
@jwt_required
def edit_thought():
    """Edits a thought given by the id."""
    body = request.json.get("body")
    thoughtid = request.json.get("id")
    result = db.session.query(Thought).filter(Thought.id == thoughtid).first()
    result.body = body
    db.session.commit()
    return (json.dumps({"success": True}), 200, {"Content-Type": "application/json"})

@thoughts_bp.route("/delete", methods=["POST"])
@jwt_required
def delete_thought():
    """Deletes a thought from the db"""
    thoughtid = request.json.get("id")
    db.session.query(Thought).filter_by(id=thoughtid).delete()
    db.session.commit()
    return (json.dumps({"success": True}), 200, {"Content-Type": "application/json"})
