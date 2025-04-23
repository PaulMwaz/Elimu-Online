from flask import Blueprint, request, jsonify
from ..models.user import User
from .. import db
import os
import jwt
from datetime import datetime, timedelta

auth_routes = Blueprint("auth_routes", __name__)
SECRET_KEY = os.getenv("SECRET_KEY")


# ✅ Register a new user
@auth_routes.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data or not all(k in data for k in ("full_name", "email", "password")):
        return jsonify({"error": "Missing fields"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already registered"}), 409

    try:
        user = User(full_name=data["full_name"], email=data["email"])
        user.set_password(data["password"])
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User registered successfully!"}), 201
    except Exception as e:
        print("❌ Error during registration:", e)
        return jsonify({"error": "Registration failed"}), 500


# ✅ Login a user (JWT-based)
@auth_routes.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data or not all(k in data for k in ("email", "password")):
        return jsonify({"error": "Missing fields"}), 400

    user = User.query.filter_by(email=data["email"]).first()

    if user and user.check_password(data["password"]):
        token = jwt.encode({
            "user_id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "is_admin": user.is_admin,
            "exp": datetime.utcnow() + timedelta(days=1)  # Token expires in 24h
        }, SECRET_KEY, algorithm="HS256")

        return jsonify({
            "message": "Login successful",
            "token": token,
            "user": {
                "user_id": user.id,
                "full_name": user.full_name,
                "is_admin": user.is_admin
            }
        }), 200

    return jsonify({"error": "Invalid credentials"}), 401


# ✅ Logout (just a dummy endpoint in JWT systems)
@auth_routes.route("/api/logout", methods=["POST"])
def logout():
    return jsonify({"message": "Logout successful (client-side token cleared)"}), 200
