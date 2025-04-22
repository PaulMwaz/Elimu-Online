from flask import Blueprint, request, jsonify
from .. import db
from ..models.resource import Resource
from ..models.category import Category
from ..utils.auth_utils import admin_required
from ..utils.gcs_helper import upload_to_gcs

admin_routes = Blueprint("admin_routes", __name__)

@admin_routes.route("/api/admin/upload", methods=["POST"])
@admin_required
def upload_resource():
    title = request.form.get("title") or request.files.get("file").filename
    level = request.form.get("level")
    form_class = request.form.get("class")
    category = request.form.get("category")
    subject = request.form.get("subject")
    file = request.files.get("file")

    if not all([level, form_class, category, subject, file]):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        # Upload to GCS under a unique filename path
        file_url = upload_to_gcs("your-gcs-bucket-name", file, f"resources/{category}/{file.filename}")
    except Exception as e:
        return jsonify({"error": f"Upload failed: {str(e)}"}), 500

    resource = Resource(
        title=title,
        filename=file.filename,
        url=file_url,
        level=level,
        class_name=form_class,
        category=category,
        subject=subject
    )

    db.session.add(resource)
    db.session.commit()

    return jsonify({
        "message": "✅ Resource uploaded successfully",
        "file_url": file_url
    }), 201


@admin_routes.route("/api/admin/delete/<int:id>", methods=["DELETE"])
@admin_required
def delete_resource(id):
    resource = Resource.query.get(id)
    if not resource:
        return jsonify({"error": "❌ Resource not found"}), 404

    db.session.delete(resource)
    db.session.commit()

    return jsonify({
        "message": f"✅ Resource '{resource.title}' deleted"
    }), 200
