from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize database and migration objects
db = SQLAlchemy()
migrate = Migrate()

# ✅ Import the config class directly (relative import)
from .config import Config

def create_app():
    app = Flask(__name__)

    # Enable CORS for frontend communication
    CORS(app, supports_credentials=True)

    # ✅ Use the directly imported Config object
    app.config.from_object(Config)

    # Initialize DB and Migrate
    db.init_app(app)
    migrate.init_app(app, db)

    # ✅ Import and register all route blueprints
    from .routes.auth_routes import auth_routes
    from .routes.resource_routes import resource_routes
    from .routes.admin_routes import admin_routes
    from .routes.test_routes import test_routes
    from .routes.file_routes import file_routes

    app.register_blueprint(auth_routes)
    app.register_blueprint(resource_routes)
    app.register_blueprint(admin_routes)
    app.register_blueprint(test_routes)
    app.register_blueprint(file_routes)

    # ✅ Auto-create tables in development only
    if os.getenv("FLASK_ENV") == "development":
        with app.app_context():
            db.create_all()

    return app
