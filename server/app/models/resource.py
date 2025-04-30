# 📁 server/app/models/resource.py

from .. import db

class Resource(db.Model):
    __tablename__ = 'resources'  # ✅ Explicitly name table 'resources'

    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)    # ✅ Uploaded file name (e.g., "Notes_Term1.pdf")
    subject = db.Column(db.String(100), nullable=False)     # ✅ E.g., "Mathematics", "English"
    class_form = db.Column(db.String(50), nullable=False)   # ✅ E.g., "Form 2", "Grade 6", "PP1"
    level = db.Column(db.String(50), nullable=False)        # ✅ "primary" or "highschool"
    term = db.Column(db.String(50), nullable=False)         # ✅ "Term 1", "Term 2", "Term 3"
    price = db.Column(db.Integer, default=0)                # ✅ Free if price = 0 (Optional: Paid files)
    file_url = db.Column(db.String(500), nullable=False)    # ✅ Google Cloud Storage URL

    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    # 🔗 Relationships
    users = db.relationship(
        "User",
        secondary="user_resources",
        back_populates="resources",
        lazy="subquery"
    )

    category = db.relationship(
        "Category",
        back_populates="resources",
        lazy="joined"
    )

    purchases = db.relationship(
        "Purchase",
        back_populates="resource",
        lazy="subquery"
    )

    def __repr__(self):
        return f"<Resource {self.filename} - {self.subject}>"
