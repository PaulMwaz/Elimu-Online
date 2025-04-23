from flask import Blueprint, request, jsonify
from google.cloud import storage
import os
from urllib.parse import unquote
from werkzeug.utils import secure_filename
from ..utils.auth_utils import verify_token

file_routes = Blueprint("file_routes", __name__)
BUCKET_NAME = os.getenv("GCS_BUCKET_NAME")

# ✅ Initialize GCS
def get_bucket():
    try:
        client = storage.Client()
        print("✅ GCS client initialized.")
        return client.bucket(BUCKET_NAME)
    except Exception as e:
        print("❌ GCS initialization failed:", e)
        raise

# ✅ Upload file
@file_routes.route("/api/files/upload", methods=["POST"])
def upload_file():
    print("📥 Upload request received")

    token = request.headers.get("Authorization", "").replace("Bearer ", "")
    print("🔐 Token received:", token[:10] + "...")

    user = verify_token(token)
    if not user:
        print("❌ Unauthorized - invalid token")
        return jsonify({"error": "Unauthorized"}), 401
    if not user.get("is_admin"):
        print("❌ Forbidden - not admin")
        return jsonify({"error": "Admin access required"}), 403

    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    # 🔍 Form metadata
    category = request.form.get("category", "").lower()
    level = request.form.get("level", "").replace(" ", "_")
    subject = request.form.get("subject", "").replace(" ", "_")

    if not all([category, level, subject]):
        return jsonify({"error": "Missing metadata"}), 400

    filename = secure_filename(file.filename)
    blob_path = f"{category}/{level}/{subject}/{filename}"

    try:
        print("⬆️ Uploading to:", blob_path)
        bucket = get_bucket()
        blob = bucket.blob(blob_path)
        blob.upload_from_file(file, content_type=file.content_type)

        file_url = f"https://storage.googleapis.com/{BUCKET_NAME}/{blob_path}"
        return jsonify({"message": "✅ File uploaded successfully", "file_url": file_url}), 201
    except Exception as e:
        print("❌ Upload failed:", e)
        return jsonify({"error": "Upload failed", "details": str(e)}), 500

# ✅ Grouped file listing for AdminPanel preview
@file_routes.route("/api/files/grouped", methods=["GET"])
def list_grouped_files():
    bucket = get_bucket()
    blobs = bucket.list_blobs()

    grouped = {}
    for blob in blobs:
        if blob.name.endswith("/"):
            continue  # Skip folders

        parts = blob.name.split("/")
        if len(parts) != 4:
            continue  # Expect: category/level/subject/filename

        category, level, subject, filename = parts
        key = f"{category.capitalize()} / {level.replace('_', ' ')} / {subject.replace('_', ' ')}"

        if key not in grouped:
            grouped[key] = []

        grouped[key].append({
            "name": filename,
            "url": f"https://storage.googleapis.com/{BUCKET_NAME}/{blob.name}"
        })

    return jsonify(grouped), 200

# ✅ Basic category listing
@file_routes.route("/api/files/<category>", methods=["GET"])
def list_files(category):
    if category not in ["primary", "highschool"]:
        return jsonify({"error": "Invalid category"}), 400

    bucket = get_bucket()
    blobs = bucket.list_blobs(prefix=f"{category}/")

    files = [{
        "name": blob.name.replace(f"{category}/", ""),
        "url": f"https://storage.googleapis.com/{BUCKET_NAME}/{blob.name}"
    } for blob in blobs if blob.name != f"{category}/" and not blob.name.endswith("/")]

    return jsonify(files), 200

# ✅ Delete file
@file_routes.route("/api/files/<category>/<filename>", methods=["DELETE"])
def delete_file(category, filename):
    decoded_filename = unquote(filename)
    blob_name = f"{category}/{decoded_filename}"
    bucket = get_bucket()
    blob = bucket.blob(blob_name)

    if not blob.exists():
        return jsonify({"error": "File not found"}), 404

    blob.delete()
    return jsonify({"message": "✅ File deleted successfully"}), 200

# ✅ Rename file
@file_routes.route("/api/files/<category>/<filename>", methods=["PATCH"])
def rename_file(category, filename):
    decoded_filename = unquote(filename)
    data = request.get_json()
    new_name = data.get("new_name")

    if not new_name:
        return jsonify({"error": "Missing new file name"}), 400

    bucket = get_bucket()
    source_blob = bucket.blob(f"{category}/{decoded_filename}")

    if not source_blob.exists():
        return jsonify({"error": "Original file not found"}), 404

    new_blob = bucket.rename_blob(source_blob, f"{category}/{new_name}")
    return jsonify({
        "message": "✅ File renamed successfully",
        "new_url": f"https://storage.googleapis.com/{BUCKET_NAME}/{new_blob.name}"
    }), 200
