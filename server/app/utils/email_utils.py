# 📁 server/app/utils/email_utils.py

import os
import smtplib
from email.message import EmailMessage

# ✅ Load sender credentials from environment variables
EMAIL_ADDRESS = os.getenv("MAIL_USERNAME")
EMAIL_PASSWORD = os.getenv("MAIL_PASSWORD")

def send_reset_email(recipient_email, reset_url):
    """
    Sends a password reset email with a unique link.
    Args:
        recipient_email (str): The user's email address.
        reset_url (str): The unique reset link with token.
    """
    try:
        msg = EmailMessage()
        msg["Subject"] = "Elimu-Online Password Reset"
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = recipient_email

        # ✅ Plain text fallback
        msg.set_content(f"""\
Hello,

We received a request to reset your Elimu-Online password.
Click the link below to set a new password:

{reset_url}

If you did not request this change, please ignore this message.

Thanks,  
Elimu-Online Team
""")

        # ✅ HTML content for modern email clients
        msg.add_alternative(f"""\
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6;">
    <p>Hello,</p>
    <p>We received a request to reset your <strong>Elimu-Online</strong> password.</p>
    <p>
      Click the button below to set a new password:
    </p>
    <p>
      <a href="{reset_url}" target="_blank" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #2563eb;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      ">Reset Password</a>
    </p>
    <p>If you did not request this change, please ignore this message.</p>
    <p>Thanks,<br />Elimu-Online Team</p>
  </body>
</html>
""", subtype="html")

        # ✅ Connect securely to Gmail SMTP with SSL
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
            print("✅ Reset email sent to:", recipient_email)

    except Exception as e:
        print("❌ Error sending reset email:", e)
        raise
