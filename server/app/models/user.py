from .. import db  # ✅ Relative import for db instance
from werkzeug.security import generate_password_hash, check_password_hash

# ✅ Association table for many-to-many relationship: User ↔ Resource
user_resources = db.Table(
    'user_resources',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('resource_id', db.Integer, db.ForeignKey('resource.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'user'  # ✅ Explicit table name (especially helpful for migrations)

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    # ✅ Define relationship to resources via association table
    resources = db.relationship(
        "Resource",
        secondary=user_resources,
        back_populates="users",
        lazy="subquery"  # optional: improves performance for eager loading
    )

    def set_password(self, password):
        """Hashes the password and stores the hash."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Checks hashed password against input."""
        return check_password_hash(self.password_hash, password)
