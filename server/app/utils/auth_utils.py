import os
import jwt
from functools import wraps
from flask import request, jsonify

SECRET_KEY = os.getenv("SECRET_KEY")

# ✅ Decode token and return user info
def verify_token(token):
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded  # e.g., { "user_id": 1, "email": "...", "is_admin": True }
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

# ✅ Protect route for logged-in users only
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        user = verify_token(token)
        if not user:
            return jsonify({"error": "Login required"}), 401
        request.user = user  # Optional: attach user info to request
        return f(*args, **kwargs)
    return decorated_function

# ✅ Protect route for admins only
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        user = verify_token(token)
        if not user or not user.get("is_admin"):
            return jsonify({"error": "Admin access required"}), 403
        request.user = user
        return f(*args, **kwargs)
    return decorated_function
