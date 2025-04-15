
from flask import Blueprint
auth_routes = Blueprint('auth', __name__)
@auth_routes.route('/login')
def login():
    return {"message": "Login route works!"}
