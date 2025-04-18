from flask import Blueprint, request, jsonify
from app import db
from app.models.resource import Resource
from app.models.category import Category
from app.utils.auth_utils import admin_required
from app.utils.gcs_helper import upload_to_gcs

admin_routes = Blueprint("admin_routes", __name__)

@admin_routes.route("/api/admin/upload", methods=["POST"])
@admin_required
def upload_resource():
    title = request.form.get("title")
    description = request.form.get("description")
    category_id = request.form.get("category_id")
    file = request.files.get("file")

    if not all([title, description, category_id, file]):
        return jsonify({"error": "Missing fields"}), 400

    try:
        file_url = upload_to_gcs("your-gcs-bucket-name", file, f"resources/{file.filename}")
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    resource = Resource(title=title, description=description, file_url=file_url, category_id=category_id)
    db.session.add(resource)
    db.session.commit()

    return jsonify({"message": "Resource uploaded successfully", "file_url": file_url})


@admin_routes.route("/api/admin/delete/<int:id>", methods=["DELETE"])
@admin_required
def delete_resource(id):
    resource = Resource.query.get(id)
    if not resource:
        return jsonify({"error": "Resource not found"}), 404

    db.session.delete(resource)
    db.session.commit()

    return jsonify({"message": f"Resource '{resource.title}' deleted"})
