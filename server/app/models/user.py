# 📁 server/app/models/user.py

from .. import db
from werkzeug.security import generate_password_hash, check_password_hash

# ✅ Association table: Users ↔ Resources (many-to-many)
user_resources = db.Table(
    'user_resources',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('resource_id', db.Integer, db.ForeignKey('resources.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    
    # ✅ NEW: Field to store secure reset tokens
    reset_token = db.Column(db.String(255), nullable=True)

    # ✅ Relationships
    resources = db.relationship(
        "Resource",
        secondary=user_resources,
        back_populates="users",
        lazy="subquery"
    )

    purchases = db.relationship(
        "Purchase",
        back_populates="user",
        lazy="subquery"
    )

    feedbacks = db.relationship(
        "Feedback",
        back_populates="user",
        lazy="subquery"
    )

    def set_password(self, password):
        """Hashes and stores a password securely."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Verifies a plaintext password against the stored hash."""
        return check_password_hash(self.password_hash, password)
