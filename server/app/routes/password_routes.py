from flask import Blueprint, request, jsonify
from itsdangerous import URLSafeTimedSerializer
from ..models.user import User
from .. import db
from ..utils.email_utils import send_reset_email
import os

password_routes = Blueprint("password_routes", __name__)

# Serializer for generating secure reset tokens
serializer = URLSafeTimedSerializer(os.getenv("SECRET_KEY", "default-secret"))

@password_routes.route("/api/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required."}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        # Return a generic message to avoid exposing user existence
        return jsonify({"message": "If the email exists, a reset link will be sent."}), 200

    # Generate token
    token = serializer.dumps(email, salt="password-reset-salt")
    user.reset_token = token
    db.session.commit()

    # Construct reset URL using FRONTEND_URL from env
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
    reset_url = f"{frontend_url}/reset-password?token={token}"

    try:
        send_reset_email(email, reset_url)
        return jsonify({"message": "Reset email sent."}), 200
    except Exception as e:
        print("❌ Error sending email:", e)
        return jsonify({"error": f"Failed to send email: {str(e)}"}), 500


@password_routes.route("/api/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json()
    token = data.get("token")
    new_password = data.get("new_password")

    if not token or not new_password:
        return jsonify({"error": "Token and new password are required."}), 400

    try:
        # Decode the token and verify it's not expired (max 1 hour)
        email = serializer.loads(token, salt="password-reset-salt", max_age=3600)
    except Exception:
        return jsonify({"error": "Invalid or expired token."}), 400

    user = User.query.filter_by(email=email).first()
    if not user or user.reset_token != token:
        return jsonify({"error": "Invalid reset attempt."}), 400

    # Update password and clear reset token
    user.set_password(new_password)
    user.reset_token = None
    db.session.commit()

    return jsonify({"message": "Password reset successfully."}), 200
