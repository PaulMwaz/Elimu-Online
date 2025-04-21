from flask import Blueprint, jsonify, request
from app.models.resource import Resource
from app.utils.auth_utils import login_required
from app import db

resource_routes = Blueprint("resource_routes", __name__)

@resource_routes.route("/api/resources", methods=["GET"])
@login_required
def get_resources():
    # Pagination query params
    page = request.args.get("page", 1, type=int)
    limit = request.args.get("limit", 10, type=int)
    
    query = Resource.query.paginate(page=page, per_page=limit, error_out=False)
    resources = query.items

    resource_data = [{
        "id": r.id,
        "title": r.title,
        "description": r.description,
        "file_url": r.file_url,
        "category": r.category.name,
        "upload_date": r.upload_date.isoformat() if hasattr(r, "upload_date") else None,
        "file_size": r.file_size if hasattr(r, "file_size") else None
    } for r in resources]

    return jsonify({
        "resources": resource_data,
        "total": query.total,
        "page": query.page,
        "pages": query.pages
    }), 200
