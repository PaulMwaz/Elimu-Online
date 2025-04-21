from .. import db  # ✅ Relative import from the parent app package

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

    resources = db.relationship("Resource", back_populates="category", cascade="all, delete")
