from app import create_app, db
from app.models.user import User

app = create_app()

with app.app_context():
    email = "paulmwaz@gmail.com"
    password = "1234567"

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
    print(f"✅ Admin user ready: {email}")
