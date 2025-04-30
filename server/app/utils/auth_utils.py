# 📁 server/app/utils/auth_utils.py

import os
import jwt
from functools import wraps
from flask import request, jsonify, g

# ✅ Secret Key fallback for development
SECRET_KEY = os.getenv("SECRET_KEY", "elimu-secret-dev-key")

# ✅ Verify and decode a JWT token
def verify_token(token):
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded
    except jwt.ExpiredSignatureError:
        print("⚠️ Token expired")
        return None
    except jwt.InvalidTokenError:
        print("⚠️ Invalid token")
        return None

# ✅ Protect routes requiring User Login
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        if not token:
            return jsonify({"error": "Authentication token missing."}), 401

        user = verify_token(token)
        if not user:
            return jsonify({"error": "Invalid or expired token. Please login again."}), 401

        g.current_user = user
        return f(*args, **kwargs)
    return decorated_function

# ✅ Protect routes requiring Admin Access
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        if not token:
            return jsonify({"error": "Authentication token missing."}), 401

        user = verify_token(token)
        if not user or not user.get("is_admin"):
            return jsonify({"error": "Admin privileges required."}), 403

        g.current_user = user
        return f(*args, **kwargs)
    return decorated_function
