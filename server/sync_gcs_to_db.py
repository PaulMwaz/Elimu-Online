# 📁 sync_gcs_to_db.py

from google.cloud import storage
from app import create_app, db
from app.models.resource import Resource

# Initialize Flask app context
app = create_app()
BUCKET_NAME = "elimu-online-resources"

print("\n🚀 Starting Sync from GCS to Database...")

with app.app_context():
    try:
        client = storage.Client()
        bucket = client.bucket(BUCKET_NAME)
        blobs = bucket.list_blobs()

        synced_count = 0
        skipped_count = 0

        for blob in blobs:
            path = blob.name
            parts = path.split("/")
            
            if len(parts) != 6:
                print(f"⚠️ Skipping invalid path: {path}")
                continue

            category, level, form_class, subject, term, filename = parts

            # Check if already exists in DB
            existing = Resource.query.filter_by(filename=filename).first()
            if existing:
                print(f"🔵 Already exists in DB: {filename}")
                skipped_count += 1
                continue

            file_url = f"https://storage.googleapis.com/{BUCKET_NAME}/{path}"

            new_resource = Resource(
                filename=filename,
                subject=subject,
                class_form=form_class,
                level=level,
                category_id=1,  # 💬 (Optional) Improve later to fetch real category_id if needed
                term=term,
                price=0,
                file_url=file_url
            )
            db.session.add(new_resource)
            synced_count += 1

            print(f"✅ Synced file: {filename}")

        db.session.commit()
        print(f"\n🎯 Sync Completed: {synced_count} files added, {skipped_count} files skipped.\n")

    except Exception as e:
        print(f"❌ Sync Failed:", e)
