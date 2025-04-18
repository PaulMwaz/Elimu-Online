from app import create_app, db
from app.models.user import User

app = create_app()

with app.app_context():
    if not User.query.filter_by(email="admin@elimu.org").first():
        admin = User(full_name="Paul", email="admin@elimu.org", is_admin=True)
        admin.set_password("1234")
        db.session.add(admin)
        db.session.commit()
        print("✅ Admin user created.")
    else:
        print("⚠️ Admin already exists.")
