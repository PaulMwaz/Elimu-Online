from flask import Blueprint, request, jsonify
from ..utils.gcs_helper import upload_to_gcs
import os

test_routes = Blueprint("test_routes", __name__)


# ✅ Health check endpoint
@test_routes.route("/", methods=["GET"])
def index():
    return jsonify({"message": "🎉 Elimu-Online Flask API is running!"}), 200

# ✅ File upload test endpoint
@test_routes.route("/api/test-upload", methods=["POST"])
def test_upload():
    bucket = os.getenv("GCS_BUCKET_NAME")
    file = request.files.get("file")
    category = request.form.get("category", "uncategorized")

    if not bucket:
        return jsonify({"error": "GCS_BUCKET_NAME not configured"}), 500

    if not file:
        return jsonify({"error": "No file provided"}), 400

    try:
        destination_path = f"{category}/{file.filename}"
        file_url = upload_to_gcs(bucket, file, destination_path)
        return jsonify({
            "message": "✅ File uploaded successfully",
            "file_url": file_url
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
