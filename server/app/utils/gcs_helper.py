# 📁 server/app/utils/gcs_helper.py

from google.cloud import storage

def upload_to_gcs(bucket_name, file_obj, destination_blob_name):
    """
    Uploads a file object to Google Cloud Storage.

    Args:
        bucket_name (str): The name of the GCS bucket.
        file_obj (werkzeug.datastructures.FileStorage): File uploaded via Flask's request.files.
        destination_blob_name (str): The full GCS path inside the bucket (e.g., highschool/Form_2/Maths/file.pdf).

    Returns:
        str: The public URL of the uploaded file.
    """
    try:
        # ✅ Initialize GCS client
        client = storage.Client()
        bucket = client.bucket(bucket_name)
        blob = bucket.blob(destination_blob_name)

        # ✅ Upload the file
        blob.upload_from_file(
            file_obj.stream,
            content_type=file_obj.content_type,
            rewind=True,
            timeout=600  # Allows large files or slow networks
        )

        # ✅ Make public if needed (optional)
        # blob.make_public()

        # ✅ Return public file URL
        return f"https://storage.googleapis.com/{bucket_name}/{destination_blob_name}"

    except Exception as e:
        print(f"🔥 GCS Upload failed: {e}")
        raise
