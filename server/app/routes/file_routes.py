from flask import Blueprint, request, jsonify
from google.cloud import storage
import os
from urllib.parse import unquote

file_routes = Blueprint("file_routes", __name__)

BUCKET_NAME = os.getenv("GCS_BUCKET_NAME")

# ✅ List files by category (folder)
@file_routes.route("/api/files/<category>", methods=["GET"])
def list_files(category):
    client = storage.Client()
    bucket = client.bucket(BUCKET_NAME)
    blobs = bucket.list_blobs(prefix=f"{category}/")

    files = [{
        "name": blob.name.replace(f"{category}/", ""),
        "url": f"https://storage.googleapis.com/{BUCKET_NAME}/{blob.name}"
    } for blob in blobs if blob.name != f"{category}/"]

    return jsonify(files)

# ✅ Delete file by name
@file_routes.route("/api/files/<category>/<filename>", methods=["DELETE"])
def delete_file(category, filename):
    client = storage.Client()
    bucket = client.bucket(BUCKET_NAME)
    decoded_filename = unquote(filename)
    blob = bucket.blob(f"{category}/{decoded_filename}")

    if not blob.exists():
        return jsonify({"error": "File not found"}), 404

    blob.delete()
    return jsonify({"message": "✅ File deleted successfully"}), 200

# ✅ Rename file
@file_routes.route("/api/files/<category>/<filename>", methods=["PATCH"])
def rename_file(category, filename):
    data = request.get_json()
    new_name = data.get("new_name")
    if not new_name:
        return jsonify({"error": "Missing new file name"}), 400

    client = storage.Client()
    bucket = client.bucket(BUCKET_NAME)

    source_blob = bucket.blob(f"{category}/{unquote(filename)}")
    if not source_blob.exists():
        return jsonify({"error": "Original file not found"}), 404

    # Copy then delete
    new_blob = bucket.rename_blob(source_blob, f"{category}/{new_name}")
    return jsonify({
        "message": "✅ File renamed successfully",
        "new_url": f"https://storage.googleapis.com/{BUCKET_NAME}/{new_blob.name}"
    })
