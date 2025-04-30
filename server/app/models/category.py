# 📁 server/app/models/category.py

from .. import db

class Category(db.Model):
    __tablename__ = 'categories'  # ✅ Explicit table name for migrations

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)  # ✅ Optional short description

    # ✅ One-to-Many relationship to Resources
    resources = db.relationship(
        "Resource",
        back_populates="category",
        cascade="all, delete",
        lazy=True
    )

    def __repr__(self):
        return f"<Category {self.name}>"
