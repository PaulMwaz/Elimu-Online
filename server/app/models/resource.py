from .. import db

class Resource(db.Model):
    __tablename__ = 'resources'  # ✅ Explicit table name

    id = db.Column(db.Integer, primary_key=True)

    # 📄 File Info
    filename = db.Column(db.String(255), nullable=False)     # E.g., "Math_Notes.pdf"
    file_url = db.Column(db.String(500), nullable=False)     # Public URL from GCS

    # 📚 Classification Fields
    subject = db.Column(db.String(100), nullable=False)      # E.g., "Math", "English"
    class_form = db.Column(db.String(50), nullable=False)    # E.g., "Form 2", "Grade 5"
    level = db.Column(db.String(50), nullable=False)         # E.g., "primary", "highschool"
    term = db.Column(db.String(50), nullable=True)           # Optional: "Term 1", or "General"
    price = db.Column(db.Integer, nullable=False, default=0) # 0 = Free, else show price in KES

    # 🔗 Category FK (e.g., Notes, Exams, E-Books)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    # 🔁 Relationships

    # ↔️ Many-to-Many: Users <-> Resources (for tracking purchases/access)
    users = db.relationship(
        "User",
        secondary="user_resources",        # Join table (ensure exists)
        back_populates="resources",
        lazy="subquery"
    )

    # 🔗 Many-to-One: Resource -> Category
    category = db.relationship(
        "Category",
        back_populates="resources",
        lazy="joined"                      # Optimized eager loading
    )

    # 🔁 One-to-Many: Resource -> Purchases (payment records)
    purchases = db.relationship(
        "Purchase",
        back_populates="resource",
        lazy="subquery"
    )

    def __repr__(self):
        return f"<Resource #{self.id} '{self.filename}' | {self.subject} | {self.class_form}>"
