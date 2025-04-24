from flask import Blueprint, request, jsonify
from google.cloud import storage
import os
from urllib.parse import unquote
from werkzeug.utils import secure_filename
from ..utils.auth_utils import verify_token

file_routes = Blueprint("file_routes", __name__)
BUCKET_NAME = os.getenv("GCS_BUCKET_NAME")

# ✅ Helper: Initialize GCS client and bucket
def get_bucket():
    try:
        client = storage.Client()
        print("✅ GCS client initialized.")
        return client.bucket(BUCKET_NAME)
    except Exception as e:
        print("❌ GCS initialization failed:", e)
        raise

# ✅ Upload file to Google Cloud Storage (Admin Only)
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
    term = request.form.get("term", "").lower()
    price = request.form.get("price", "0")

    if not all([category, level, form_class, subject, term]):
        return jsonify({"error": "Missing metadata"}), 400

    filename = secure_filename(file.filename)
    
    # ✅ Corrected path structure to match frontend
    blob_path = f"{category}/{level}/{form_class}/{subject}/{term}/{filename}"

    try:
        bucket = get_bucket()
        blob = bucket.blob(blob_path)
        blob.upload_from_file(file, content_type=file.content_type)

        # Store price metadata
        blob.metadata = {"price": str(price)}
        blob.patch()

        file_url = f"https://storage.googleapis.com/{BUCKET_NAME}/{blob_path}"
        print(f"✅ File uploaded: {file_url}")

        return jsonify({
            "message": "✅ File uploaded successfully",
            "file_url": file_url,
            "price": price,
            "term": term
        }), 201
    except Exception as e:
        print("❌ Upload failed:", str(e))
        return jsonify({"error": "Failed to upload file", "details": str(e)}), 500

# ✅ List all files inside a specific GCS folder
@file_routes.route("/api/files/list", methods=["GET"])
def list_files():
    folder_path = request.args.get("path")
    if not folder_path:
        return jsonify({"error": "Missing path query parameter"}), 400

    try:
        bucket = get_bucket()
        blobs = bucket.list_blobs(prefix=folder_path)

        files = []
        for blob in blobs:
            if not blob.name.endswith("/"):
                files.append({
                    "name": os.path.basename(blob.name),
                    "url": f"https://storage.googleapis.com/{BUCKET_NAME}/{blob.name}",
                    "size": blob.size,
                    "updated": blob.updated.isoformat(),
                    "price": blob.metadata.get("price") if blob.metadata else "0"
                })

        return jsonify({"files": files}), 200
    except Exception as e:
        return jsonify({"error": "Failed to list files", "details": str(e)}), 500

# ✅ Group files for admin preview
@file_routes.route("/api/files/grouped", methods=["GET"])
def list_grouped_files():
    try:
        bucket = get_bucket()
        blobs = bucket.list_blobs()

        grouped = {}
        for blob in blobs:
            if blob.name.endswith("/"):
                continue

            path_parts = blob.name.split("/")
            key = "/".join(path_parts[:-1])  # group by folder path
            grouped.setdefault(key, []).append({
                "name": os.path.basename(blob.name),
                "url": f"https://storage.googleapis.com/{BUCKET_NAME}/{blob.name}",
                "price": blob.metadata.get("price") if blob.metadata else "0"
            })

        return jsonify(grouped), 200
    except Exception as e:
        return jsonify({"error": "Failed to group files", "details": str(e)}), 500
