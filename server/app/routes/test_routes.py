from flask import Blueprint, request, jsonify
from app.utils.gcs_helper import upload_to_gcs
import os

# ✅ Define the Blueprint
test_routes = Blueprint("test_routes", __name__)

# ✅ Home route for testing API status
@test_routes.route("/", methods=["GET"])
def index():
    return jsonify({"message": "🎉 Elimu-Online Flask API is running!"})

# ✅ Upload route
@test_routes.route("/api/test-upload", methods=["POST"])
def test_upload():
    bucket = os.getenv("GCS_BUCKET_NAME")
    file = request.files.get("file")
    category = request.form.get("category", "uncategorized")

    if not file:
        return jsonify({"error": "No file provided"}), 400

    try:
        destination_path = f"{category}/{file.filename}"
        file_url = upload_to_gcs(bucket, file, destination_path)
        return jsonify({"message": "✅ File uploaded successfully", "file_url": file_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
