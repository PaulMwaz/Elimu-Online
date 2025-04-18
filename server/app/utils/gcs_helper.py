from google.cloud import storage

def upload_to_gcs(bucket_name, file_obj, destination_blob_name):
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    # Upload large files with increased timeout
    blob.upload_from_file(
        file_obj.stream,
        content_type=file_obj.content_type,
        timeout=600,
        rewind=True
    )

    # ❌ Don't use blob.make_public() — your bucket is already public
    # ✅ Return public URL directly
    return f"https://storage.googleapis.com/{bucket_name}/{destination_blob_name}"
