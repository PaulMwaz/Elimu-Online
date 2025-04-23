# promote_user.py
from app import create_app, db
from app.models.user import User

app = create_app()

with app.app_context():
    email = "paulmwaz@gmail.com"
    user = User.query.filter_by(email=email).first()

    if user:
        if not user.is_admin:
            user.is_admin = True
            db.session.commit()
            print(f"✅ {email} has been promoted to admin.")
        else:
            print(f"ℹ️ {email} is already an admin.")
    else:
        print(f"❌ User with email '{email}' was not found.")
