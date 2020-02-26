from .. import db
from flask_sqlalchemy import event
import datetime

class Book(db.Model):
    """[PostgreSQL model] Represents a book I've read

    A book's cover image, its metadata (author, title, publication date),
    and what I have to say about it. 

    """
    __tablename__ = "books"
    id = db.Column(db.Integer, primary_key=True)
    created_on = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    edited_on = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    title = db.Column(db.String(64), nullable=False)
    author = db.Column(db.String(64), nullable=False)
    year = db.Column(db.String(4), nullable=False)
    cover = db.Column(db.String(256), nullable=False)
    review = db.Column(db.Text, nullable=False, default="TODO")