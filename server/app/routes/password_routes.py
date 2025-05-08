# 📁 server/app/routes/password_routes.py

from flask import Blueprint, request, jsonify
from itsdangerous import URLSafeTimedSerializer
from ..models.user import User
from .. import db
from ..utils.email_utils import send_reset_email
import os

password_routes = Blueprint("password_routes", __name__)

# 🔐 Serializer for secure reset tokens
serializer = URLSafeTimedSerializer(os.getenv("SECRET_KEY", "default-secret"))

# ✅ Forgot Password Endpoint
@password_routes.route("/api/forgot-password", methods=["POST"])
def forgot_password():
    print("📨 Received forgot password request...")

    data = request.get_json()
    email = data.get("email")
    print("📧 Email received:", email)

    if not email:
        print("❌ No email provided.")
        return jsonify({"error": "Email is required."}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        print("⚠️ User not found. Sending generic success response.")
        return jsonify({"message": "If the email exists, a reset link will be sent."}), 200

    print("✅ User found:", user.email)

    # Generate token and save it
    token = serializer.dumps(email, salt="password-reset-salt")
    user.reset_token = token
    db.session.commit()
    print("🔑 Token generated and saved:", token)

    # Construct reset link
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
    reset_url = f"{frontend_url}/reset-password?token={token}"
    print("🔗 Reset URL:", reset_url)

    try:
        print("📤 Sending reset email...")
        send_reset_email(email, reset_url)
        print("✅ Reset email sent successfully.")
        return jsonify({"message": "Reset email sent."}), 200
    except Exception as e:
        print("❌ Error sending reset email:", str(e))
        return jsonify({"error": f"Failed to send email: {str(e)}"}), 500

# ✅ Reset Password Endpoint
@password_routes.route("/api/reset-password", methods=["POST"])
def reset_password():
    print("🔐 Received reset password request...")

    data = request.get_json()
    token = data.get("token")
    new_password = data.get("new_password")

    print("📥 Token:", token)
    print("🔒 New password received.")

    if not token or not new_password:
        print("❌ Missing token or password.")
        return jsonify({"error": "Token and new password are required."}), 400

    try:
        email = serializer.loads(token, salt="password-reset-salt", max_age=3600)
        print("✅ Token valid. Email from token:", email)
    except Exception as e:
        print("❌ Invalid or expired token:", str(e))
        return jsonify({"error": "Invalid or expired token."}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        print("❌ No user found for email in token.")
        return jsonify({"error": "Invalid reset attempt."}), 400

    if user.reset_token != token:
        print("❌ Token mismatch.")
        return jsonify({"error": "Invalid reset attempt."}), 400

    # Set new password
    user.set_password(new_password)
    user.reset_token = None
    db.session.commit()
    print("✅ Password updated for:", user.email)

    return jsonify({"message": "Password reset successfully."}), 200
