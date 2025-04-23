from flask import Blueprint, request, jsonify
from google.cloud import storage
import os
from urllib.parse import unquote
from werkzeug.utils import secure_filename
from ..utils.auth_utils import verify_token

file_routes = Blueprint("file_routes", __name__)

BUCKET_NAME = os.getenv("GCS_BUCKET_NAME")

# ✅ Initialize GCS client and bucket
def get_bucket():
    try:
        client = storage.Client()
        print("✅ GCS client initialized.")
        return client.bucket(BUCKET_NAME)
    except Exception as e:
        print("❌ GCS initialization failed:", e)
        raise

# ✅ Upload file (Admin only)
@file_routes.route("/api/files/upload", methods=["POST"])
def upload_file():
    print("📥 Upload request received")

    token = request.headers.get("Authorization", "").replace("Bearer ", "")
    user = verify_token(token)
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    if not user.get("is_admin"):
        return jsonify({"error": "Admin access required"}), 403

    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    category = request.form.get("category", "").lower()
    level = request.form.get("level", "").lower().replace(" ", "_")
    form_class = request.form.get("class", "").lower().replace(" ", "_")
    subject = request.form.get("subject", "").lower().replace(" ", "_")

    print(f"📌 Metadata — Category: {category}, Level: {level}, Class: {form_class}, Subject: {subject}")

    if not all([category, level, form_class, subject]):
        return jsonify({"error": "Missing metadata"}), 400

    filename = secure_filename(file.filename)
    blob_path = f"{category}/{level}/{form_class}/{subject}/{filename}"

    try:
        bucket = get_bucket()
        blob = bucket.blob(blob_path)
        blob.upload_from_file(file, content_type=file.content_type)

        file_url = f"https://storage.googleapis.com/{BUCKET_NAME}/{blob_path}"
        print(f"✅ File uploaded: {file_url}")

        return jsonify({
            "message": "✅ File uploaded successfully",
            "file_url": file_url
        }), 201

    except Exception as e:
        print("❌ Upload error:", e)
        return jsonify({"error": "Upload failed", "details": str(e)}), 500

# ✅ List files by path
@file_routes.route("/api/files/list", methods=["GET"])
def list_files_by_path():
    path = request.args.get("path")
    if not path:
        return jsonify({"error": "Missing path parameter"}), 400

    try:
        bucket = get_bucket()
        blobs = bucket.list_blobs(prefix=path)
        files = [
            {"name": blob.name.split("/")[-1], "url": f"https://storage.googleapis.com/{BUCKET_NAME}/{blob.name}"}
            for blob in blobs if not blob.name.endswith("/")
        ]
        return jsonify({"files": files}), 200
    except Exception as e:
        print("❌ List error:", e)
        return jsonify({"error": "Could not list files", "details": str(e)}), 500

# ✅ Grouped file listing for admin panel display
@file_routes.route("/api/files/grouped", methods=["GET"])
def grouped_files():
    try:
        bucket = get_bucket()
        blobs = bucket.list_blobs()
        grouped = {}

        for blob in blobs:
            if blob.name.endswith("/"):
                continue
            parts = blob.name.split("/")
            group_path = "/".join(parts[:-1])
            grouped.setdefault(group_path, []).append({
                "name": parts[-1],
                "url": f"https://storage.googleapis.com/{BUCKET_NAME}/{blob.name}"
            })

        return jsonify(grouped), 200

    except Exception as e:
        print("❌ Grouped fetch failed:", e)
        return jsonify({"error": "Could not fetch grouped files", "details": str(e)}), 500