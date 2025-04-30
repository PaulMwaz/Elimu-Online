# 📁 server/app/config.py

import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "default_fallback_key")
    
    # ✅ Updated: Save elimu.db inside the instance folder properly
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL", 
        "sqlite:///../instance/elimu.db"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # ✅ Google Cloud Storage settings
    GCS_BUCKET_NAME = os.getenv("GCS_BUCKET_NAME")
    GOOGLE_APPLICATION_CREDENTIALS = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
