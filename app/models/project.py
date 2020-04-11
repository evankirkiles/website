from .. import db
from flask_sqlalchemy import event
import datetime

class Project(db.Model):
    """[PostgreSQL model] Represents a project I've built

    A project's cover image, its title, when it was last worked on (year-wise), 
    and what I have to say about it. 

    """
    __tablename__ = "projects"
    id = db.Column(db.Integer, primary_key=True)
    created_on = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    title = db.Column(db.String(64), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    cover = db.Column(db.String(256), nullable=False)
    review = db.Column(db.Text, nullable=False, default="TODO")