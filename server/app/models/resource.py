from .. import db

class Resource(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    file_url = db.Column(db.String(300), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))

    users = db.relationship("User", secondary="user_resources", back_populates="resources")
    category = db.relationship("Category", back_populates="resources")

