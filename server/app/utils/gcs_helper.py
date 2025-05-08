import os
from google.cloud import storage
from google.auth.exceptions import DefaultCredentialsError

def upload_to_gcs(bucket_name, file_obj, destination_blob_name):
    """
    Uploads a file object to Google Cloud Storage.

    Args:
        bucket_name (str): The GCS bucket name.
        file_obj: werkzeug FileStorage object.
        destination_blob_name (str): Path in GCS bucket.

    Returns:
        str: Public file URL.
    """
    try:
        credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
        if not credentials_path or not os.path.exists(credentials_path):
            raise FileNotFoundError(f"❌ JSON key file not found at: {credentials_path}")

        print(f"🔑 Using credentials from: {credentials_path}")
        print(f"📁 Uploading to bucket: {bucket_name}, path: {destination_blob_name}")

        client = storage.Client.from_service_account_json(credentials_path)
        bucket = client.bucket(bucket_name)
        blob = bucket.blob(destination_blob_name)

        blob.upload_from_file(
            file_obj.stream,
            content_type=file_obj.content_type,
            rewind=True,
            timeout=600
        )

        print("✅ Upload successful.")
        return f"https://storage.googleapis.com/{bucket_name}/{destination_blob_name}"

    except FileNotFoundError as fnf:
        print(f"🔥 Credentials error: {fnf}")
        raise
    except DefaultCredentialsError as cred_err:
        print(f"🔒 GCS credentials issue: {cred_err}")
        raise
    except Exception as e:
        print(f"🔥 GCS Upload failed: {e}")
        raise
