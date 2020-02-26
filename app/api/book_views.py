""" Interface for getting and creating book reviews!

"""
from flask import Blueprint, request
from flask_jwt_extended import jwt_optional, jwt_required, get_jwt_identity
from sqlalchemy import func

from app import db
from app.models import Book
from datetime import datetime, timedelta
import json

books_bp = Blueprint("api/books", __name__)

@books_bp.route("/get-all", methods=["GET"])
def get_all_books():
    """Retrieves the metadata of all books from the database (without body)"""
    results = db.session.query(Book).order_by(Book.edited_on.desc())
    return (json.dumps({
        "success": True,
        "sync_id": "" if len(results.all()) == 0 else results[-1].id,
        "results": [{
            "title": book.title,
            "year": book.year,
            "author": book.author,
            "cover": book.cover,
            "id": book.id,
            "created_on": book.created_on.strftime('%Y-%m-%dT%H:%M:%SZ')
        } for book in results]}), 200, {"Content-Type": "application/json"})

@books_bp.route("/get", methods=["POST"])
def get_book():
    """Retrieves the review for a specific book"""
    book_id = request.json.get("id")
    book = db.session.query(Book).filter(Book.id == book_id).first()
    return (json.dumps({
            "success": True,
            "book": {
                "title": book.title,
                "year": book.year,
                "author": book.author,
                "cover": book.cover,
                "id": book.id,
                "body": book.review,
                "created_on": book.created_on.strftime('%Y-%m-%dT%H:%M:%SZ')
            }
        }), 200, {"Content-Type": "application/json"})

@books_bp.route("/create", methods=["POST"])
@jwt_required
def create_book():
    """Creates a book!"""
    user = get_jwt_identity()
    body = request.json.get("body")
    author = request.json.get("author")
    title = request.json.get("title")
    year = request.json.get("year")
    cover = request.json.get("cover")
    book = Book(review=body,title=title,author=author,year=year,cover=cover)
    db.session.add(book)
    db.session.commit()
    return (json.dumps({"success": True}), 200, {"Content-Type": "application/json"})

@books_bp.route("/edit", methods=["POST"])
@jwt_required
def edit_book():
    """Edits a thought given by the id."""
    body = request.json.get("body")
    book_id = request.json.get("id")
    book = db.session.query(Book).filter(Book.id == book_id).first()
    book.review = body
    book.edited_on = datetime.utcnow()
    db.session.commit()
    return (json.dumps({"success": True}), 200, {"Content-Type": "application/json"})

@books_bp.route("/delete", methods=["POST"])
@jwt_required
def delete_book():
    """Deletes a thought from the db"""
    book_id = request.json.get("id")
    db.session.query(Book).filter_by(id=book_id).delete()
    db.session.commit()
    return (json.dumps({"success": True}), 200, {"Content-Type": "application/json"})
