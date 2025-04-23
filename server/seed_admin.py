from app import create_app, db
from app.models.user import User
import requests

# Initialize Flask app context
app = create_app()

with app.app_context():
    email = "paulmwaz@gmail.com"
    password = "1234567"

    # ✅ Check if the user already exists
    user = User.query.filter_by(email=email).first()

    if user:
        print("⚠️ User already exists. Updating password and admin status...")
        user.set_password(password)
        user.is_admin = True
    else:
        print("✅ Creating new admin user...")
        user = User(full_name="Paul Mwaz", email=email)
        user.set_password(password)
        user.is_admin = True
        db.session.add(user)

    db.session.commit()
    print("✅ Admin user ready:", email)
    print("👤 is_admin:", user.is_admin)
    print("🔐 Can login with password:", user.check_password(password))

    # ✅ Optional: List uploaded files grouped by level/subject/category
    print("\n📦 Current File Listings (grouped):")
    BASE_URL = "http://localhost:5555/api/files/grouped"  # 🔄 Adjust if deployed

    try:
        response = requests.get(BASE_URL)
        if response.status_code == 200:
            data = response.json()
            for path, files in data.items():
                print(f"\n🗂️ {path}:")
                for f in files:
                    print(" -", f["name"])
        else:
            print("❌ Could not fetch grouped files. Status code:", response.status_code)
    except Exception as e:
        print("❌ Error fetching grouped files:", str(e))
