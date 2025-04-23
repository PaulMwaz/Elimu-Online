from google.cloud import storage

def upload_to_gcs(bucket_name, file_obj, destination_blob_name):
    """
    Uploads a file object to Google Cloud Storage.

    Args:
        bucket_name (str): The name of the GCS bucket.
        file_obj (werkzeug.FileStorage): The uploaded file from Flask request.files.
        destination_blob_name (str): The target path inside the bucket (e.g., highschool/Form_2/Maths/file.pdf).

    Returns:
        str: The public URL of the uploaded file.
    """
    # ✅ Initialize GCS client and select bucket
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    # ✅ Upload with extended timeout, support for rewindable streams
    blob.upload_from_file(
        file_obj.stream,
        content_type=file_obj.content_type,
        rewind=True,
        timeout=600  # Allows larger files or slower connections
    )

    # ✅ Return publicly accessible URL (if bucket is public)
    return f"https://storage.googleapis.com/{bucket_name}/{destination_blob_name}"
