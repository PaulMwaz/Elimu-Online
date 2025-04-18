from flask import Blueprint, request, jsonify
from google.cloud import storage
import os
from urllib.parse import unquote

file_routes = Blueprint("file_routes", __name__)
BUCKET_NAME = os.getenv("GCS_BUCKET_NAME")

# ✅ Helper: Initialize GCS client and bucket
def get_bucket():
    client = storage.Client()
    return client.bucket(BUCKET_NAME)

# ✅ List files by category (e.g., primary/ or highschool/)
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

# ✅ Delete a file by filename
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

# ✅ Rename a file in the bucket
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

    # Perform copy-rename-delete
    new_blob = bucket.rename_blob(source_blob, f"{category}/{new_name}")
    return jsonify({
        "message": "✅ File renamed successfully",
        "new_url": f"https://storage.googleapis.com/{BUCKET_NAME}/{new_blob.name}"
    }), 200
