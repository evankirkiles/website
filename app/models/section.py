from .. import db

class Section(db.Model):
    """[PostgreSQL model] Represents a "Section"

    A section on the website under which thoughts can be filtered. I'm
    thinking this will represent each project I'm working on. I'm not actually
    using this model, so this class can be ignored.

    """
    
    __tablename__ = "sections"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    index = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String(64), unique=True, nullable=False)