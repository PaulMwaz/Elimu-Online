from flask import Blueprint, jsonify
from app.models.resource import Resource
from app.utils.auth_utils import login_required

resource_routes = Blueprint("resource_routes", __name__)

@resource_routes.route("/api/resources", methods=["GET"])
@login_required
def get_resources():
    resources = Resource.query.all()
    resource_data = [{
        "id": r.id,
        "title": r.title,
        "description": r.description,
        "file_url": r.file_url,
        "category": r.category.name
    } for r in resources]

    return jsonify(resource_data)
