""" Views to log in and just verify identity before creating thoughts.

"""
from flask import Blueprint, request
from flask_jwt_extended import (
    jwt_optional, jwt_required, get_jwt_identity,
    create_access_token, create_refresh_token)
from sqlalchemy import func

import json
from app import db
from app.models import User
from datetime import datetime, timedelta

# Initialize the thought view for getting/sending
auth_bp = Blueprint("api/auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    """Simple login functionality creates JWT token"""
    username = request.json.get("username")
    password = request.json.get("password")
    if username and password:
        user = User.query.filter_by(username=username).first()
        if (user is None or user.password_hash is None
            or not user.verify_password(password)):
            return _failed_login("Login failed.")
        return _successful_login(user.id)
    return _failed_login("Malformed login request.")
    
def _failed_login(reason):
    """Return this if the login fails"""
    return (json.dumps({"success": False, "reason": reason}), 400, 
        {"Content-Type": "application/json"})

def _successful_login(user_id):
    """Return this if the login succeeds"""
    access_token_expiration_date = timedelta(days=1)
    refresh_token_expiration_date = timedelta(weeks=8)
    access_token = create_access_token(
        identity=user_id, expires_delta=access_token_expiration_date)
    refresh_token = create_refresh_token(
        identity=user_id, expires_delta=refresh_token_expiration_date)
    return (json.dumps({"success": True,"access_token": access_token,
            "refresh_token": refresh_token}), 200,
            {"Content-Type": "application/json"})