from .. import db
import datetime, uuid
from werkzeug.security import check_password_hash, generate_password_hash
from sqlalchemy.dialects.postgresql import UUID

class User(db.Model):
    """[PostgreSQL model] Represents a user

    I'll be the only user, this just allows me to log in.

    """
    __tablename__ = "users"
    id = db.Column(UUID(as_uuid=True), unique=True, nullable=False, 
        default=uuid.uuid4, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    username = db.Column(db.String(64), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    @property
    def password(self):
        raise AttributeError("`password` is not a readable attribute")
    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)
    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)
