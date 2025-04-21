from .. import db  # Relative import from app package

class Purchase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    resource_id = db.Column(db.Integer, db.ForeignKey('resource.id'))

    user = db.relationship("User", backref="purchases")
    resource = db.relationship("Resource", backref="purchases")
