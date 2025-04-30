# 📁 fix_gcs_paths.py

from google.cloud import storage
import os

BUCKET_NAME = os.getenv("GCS_BUCKET_NAME", "elimu-online-resources")

def fix_paths():
    print(f"📦 GCS Bucket: {BUCKET_NAME}")
    client = storage.Client()
    bucket = client.bucket(BUCKET_NAME)

    blobs = client.list_blobs(BUCKET_NAME, prefix="resources/")
    moved = 0

    for blob in blobs:
        if blob.name.startswith("resources/"):
            correct_path = blob.name.replace("resources/", "", 1)  # remove only first 'resources/'

            if correct_path == blob.name:
                continue  # no change needed

            print(f"🔄 Moving: {blob.name} ➡️ {correct_path}")
            new_blob = bucket.blob(correct_path)
            new_blob.rewrite(blob)
            blob.delete()
            print(f"✅ Moved and Deleted: {blob.name}")
            moved += 1

    print(f"\n🎯 Done! Total fixed files: {moved}")

if __name__ == "__main__":
    fix_paths()
