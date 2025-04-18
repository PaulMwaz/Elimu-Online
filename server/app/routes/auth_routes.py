from flask import Blueprint, request, jsonify, session
from app.models.user import User
from app import db

auth_routes = Blueprint("auth_routes", __name__)

# ✅ Register a new user
@auth_routes.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    print("📝 Register request received:", data)

    if not all(k in data for k in ("full_name", "email", "password")):
        return jsonify({"error": "Missing fields"}), 400

    # Check if user exists
    if User.query.filter_by(email=data["email"]).first():
        print("❌ Email already registered:", data["email"])
        return jsonify({"error": "Email already registered"}), 409

    # Create user
    user = User(full_name=data["full_name"], email=data["email"])
    user.set_password(data["password"])
    db.session.add(user)
    db.session.commit()

    print(f"✅ User {user.email} registered successfully")
    return jsonify({"message": "User registered successfully!"}), 201


# ✅ Login a user
@auth_routes.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    print("🔐 Login request received:", data)

    user = User.query.filter_by(email=data["email"]).first()

    if user and user.check_password(data["password"]):
        print(f"✅ User {user.email} authenticated")
        session["user_id"] = user.id
        session["is_admin"] = user.is_admin
        return jsonify({
            "message": "Login successful",
            "user_id": user.id,
            "full_name": user.full_name,
            "is_admin": user.is_admin
        })

    print("❌ Invalid login attempt")
    return jsonify({"error": "Invalid credentials"}), 401


# ✅ Logout user
@auth_routes.route("/api/logout", methods=["POST"])
def logout():
    session.clear()
    print("👋 User logged out")
    return jsonify({"message": "Logged out successfully"})
