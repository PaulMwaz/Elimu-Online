from google.cloud import storage

def upload_to_gcs(bucket_name, file_obj, destination_blob_name):
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    # Upload the file with extended timeout for large files
    blob.upload_from_file(
        file_obj.stream,
        content_type=file_obj.content_type,
        timeout=600,
        rewind=True  # Ensures the stream is read from the beginning
    )

    # Public access is managed via GCS bucket permissions
    return f"https://storage.googleapis.com/{bucket_name}/{destination_blob_name}"
