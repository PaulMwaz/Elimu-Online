
from flask import Flask
def create_app():
    app = Flask(__name__)
    from .routes.auth_routes import auth_routes
    app.register_blueprint(auth_routes)
    return app
