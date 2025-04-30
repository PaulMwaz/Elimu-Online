# 📁 server/app/models/feedback.py

from .. import db
from datetime import datetime

class Feedback(db.Model):
    __tablename__ = 'feedbacks'  # ✅ Explicit table name

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # ✅ Relationship back to User
    user = db.relationship("User", back_populates="feedbacks", lazy=True)

    def __repr__(self):
        return f"<Feedback from User {self.user_id}>"
