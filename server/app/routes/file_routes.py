# 📁 server/app/routes/file_routes.py

from flask import Blueprint, request, jsonify
from ..utils.auth_utils import verify_token
from ..models.resource import Resource
from .. import db
import os
from urllib.parse import unquote
from werkzeug.utils import secure_filename
from google.cloud import storage

file_routes = Blueprint("file_routes", __name__)
BUCKET_NAME = os.getenv("GCS_BUCKET_NAME")
print("📦 GCS Bucket:", BUCKET_NAME)

def get_bucket():
    try:
        client = storage.Client()
        print("✅ GCS client initialized")
        return client.bucket(BUCKET_NAME)
    except Exception as e:
        print("🔥 GCS Client Init Error:", e)
        raise

# -------------------------------
# 📂 List Grouped Uploaded Files
# -------------------------------
@file_routes.route("/api/files/grouped", methods=["GET"])
def list_grouped_files():
    try:
        resources = Resource.query.all()
        grouped = {}
        for res in resources:
            path = f"{res.category.name}/{res.level}/{res.form}/{res.subject}/{res.term}"
            if path not in grouped:
                grouped[path] = []
            grouped[path].append({
                "id": res.id,
                "name": res.name,
                "url": res.url,
                "price": res.price
            })
        print(f"✅ Grouped and returning {len(grouped)} folders")
        return jsonify(grouped), 200
    except Exception as e:
        print("🔥 Failed to group files:", e)
        return jsonify({"error": "Failed to list files", "details": str(e)}), 500

# -------------------------------
# 🗑️ Delete File (Safe Delete)
# -------------------------------
@file_routes.route("/api/files/delete", methods=["POST"])
def delete_file():
    try:
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        user = verify_token(token)
        if not user or not user.get("is_admin"):
            return jsonify({"error": "Admin access required"}), 403

        data = request.get_json()
        file_id = data.get("id")
        if not file_id:
            return jsonify({"error": "Missing file ID"}), 400

        resource = Resource.query.get(file_id)
        if not resource:
            return jsonify({"error": "File not found in DB"}), 404

        blob_path = unquote(resource.url.split(f"/{BUCKET_NAME}/")[-1])
        bucket = get_bucket()
        blob = bucket.blob(blob_path)

        if blob.exists():
            blob.delete()
            print(f"✅ Deleted GCS file: {blob_path}")
        else:
            print(f"⚠️ File not found in GCS, skipping blob delete: {blob_path}")

        db.session.delete(resource)
        db.session.commit()
        print(f"✅ Deleted database record: {resource.name}")
        return jsonify({"message": "✅ File deleted successfully"}), 200

    except Exception as e:
        print("🔥 Delete failed:", e)
        return jsonify({"error": "Failed to delete file", "details": str(e)}), 500

# -------------------------------
# ✏️ Rename File (GCS + Database)
# -------------------------------
@file_routes.route("/api/files/rename", methods=["POST"])
def rename_file():
    try:
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        user = verify_token(token)
        if not user or not user.get("is_admin"):
            return jsonify({"error": "Admin access required"}), 403

        data = request.get_json()
        file_id = data.get("id")
        new_name = data.get("new_name")
        if not file_id or not new_name:
            return jsonify({"error": "Missing file ID or new name"}), 400

        resource = Resource.query.get(file_id)
        if not resource:
            return jsonify({"error": "File not found"}), 404

        old_blob_path = unquote(resource.url.split(f"/{BUCKET_NAME}/")[-1])
        new_filename = secure_filename(new_name)
        new_blob_path = "/".join(old_blob_path.split("/")[:-1]) + f"/{new_filename}"

        bucket = get_bucket()
        old_blob = bucket.blob(old_blob_path)
        new_blob = bucket.blob(new_blob_path)

        if not old_blob.exists():
            print(f"⚠️ Old blob does not exist: {old_blob_path}")
            return jsonify({"error": "Original file not found in GCS"}), 404

        bucket.copy_blob(old_blob, bucket, new_blob_path)
        old_blob.delete()
        new_blob.make_public()

        resource.name = new_filename
        resource.url = f"https://storage.googleapis.com/{BUCKET_NAME}/{new_blob_path}"
        db.session.commit()

        print(f"✅ Renamed file to {new_filename} and updated DB")
        return jsonify({
            "message": "✅ File renamed successfully",
            "new_url": resource.url
        }), 200

    except Exception as e:
        print("🔥 Rename failed:", e)
        return jsonify({"error": "Failed to rename file", "details": str(e)}), 500