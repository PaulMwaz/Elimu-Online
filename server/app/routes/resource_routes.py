# 📁 server/app/routes/resource_routes.py

from flask import Blueprint, request, jsonify
from ..models.resource import Resource
from ..models.category import Category  # ✅ Move import to top for consistency
from .. import db

resource_routes = Blueprint("resource_routes", __name__)

@resource_routes.route("/api/resources", methods=["GET"])
def get_filtered_resources():
    # ✅ Get filtering parameters from query
    subject = request.args.get("subject")
    form_class = request.args.get("formClass")
    level = request.args.get("level")
    term = request.args.get("term")
    category = request.args.get("category")

    query = Resource.query

    # ✅ Dynamically apply filters if provided
    if subject:
        query = query.filter(Resource.subject == subject)
    if form_class:
        query = query.filter(Resource.class_form == form_class)
    if level:
        query = query.filter(Resource.level == level)
    if term:
        query = query.filter(Resource.term == term)
    if category:
        category_obj = Category.query.filter_by(name=category).first()
        if category_obj:
            query = query.filter(Resource.category_id == category_obj.id)
        else:
            # ✅ If category not found, return empty immediately
            return jsonify([]), 200

    resources = query.all()

    data = [{
        "id": r.id,
        "filename": r.filename,
        "file_url": r.file_url,
        "subject": r.subject,
        "level": r.level,
        "class_form": r.class_form,
        "term": r.term,
        "category": r.category.name if r.category else None,
        "price": r.price or 0,
    } for r in resources]

    return jsonify({
        "resources": data,
        "count": len(data)  # ✅ Add count for frontend if you want
    }), 200
