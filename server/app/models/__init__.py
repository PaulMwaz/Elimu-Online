# 📁 server/app/models/__init__.py

from .. import db

# ✅ Import all models here
from .user import User, user_resources
from .resource import Resource
from .category import Category
from .purchase import Purchase
from .feedback import Feedback

# ✅ Export all models for Flask-Migrate discovery
__all__ = [
    "User",
    "Resource",
    "Category",
    "Purchase",
    "Feedback",
    "user_resources"
]
