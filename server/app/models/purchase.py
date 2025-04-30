# 📁 server/app/models/purchase.py

from .. import db
from datetime import datetime

class Purchase(db.Model):
    __tablename__ = 'purchases'  # ✅ Explicit table name

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)       # ✅ users.id
    resource_id = db.Column(db.Integer, db.ForeignKey('resources.id'), nullable=False)  # ✅ resources.id
    amount = db.Column(db.Integer, nullable=False)  # ✅ Record amount paid
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)  # ✅ Auto timestamp purchase

    # ✅ Relationships
    user = db.relationship("User", back_populates="purchases", lazy=True)
    resource = db.relationship("Resource", back_populates="purchases", lazy=True)

    def __repr__(self):
        return f"<Purchase User {self.user_id} Resource {self.resource_id}>"
