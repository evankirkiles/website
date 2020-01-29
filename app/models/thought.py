from .. import db
from sqlalchemy.dialects.postgresql import UUID

class Thought(db.Model):
    """[PostgreSQL model] Represents a "Thought"

    A small collection of text (potentially formatted later) that
    will be displayed on the front page of the website.

    """

    __tablename__ = "thoughts"
    id = db.Column(db.Integer, primary_key=True)
    created_on = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    created_by = db.Column(UUID(as_uuid=True), db.ForeignKey("users.id"), nullable=False)
    section = db.Column(db.String, db.ForeignKey())
    body = db.Column(db.Text, nullable=False)
    tags = db.Column()