# 📁 server/app/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize db and migrate globally
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(
        __name__,
        instance_path=os.path.join(os.path.abspath(os.path.dirname(__file__)), '..', 'instance'),
        instance_relative_config=True,
    )

    # ✅ Correct global CORS setup
    CORS(app,
         resources={r"/api/*": {"origins": ["http://localhost:5173"]}},
         supports_credentials=True)

    print("✅ Flask CORS configured: localhost:5173 + credentials support enabled")

    # ✅ Load Configurations
    from .config import Config
    app.config.from_object(Config)

    # ✅ Initialize Database and Migrations
    db.init_app(app)
    migrate.init_app(app, db)

    # ✅ Import and Register Blueprints
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

    # ✅ Global error handler
    @app.errorhandler(Exception)
    def handle_error(e):
        print(f"🔥 SERVER ERROR: {str(e)}")
        return {"error": str(e)}, 500

    # ❌ REMOVE after_request - NOT NEEDED!

    # ✅ Auto-create tables during development
    if app.config.get("ENV") == "development":
        with app.app_context():
            db.create_all()
            print("✅ Database tables created (if not exist)")

    return app
