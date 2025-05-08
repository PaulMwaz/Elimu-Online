// 📁 src/components/UploadForm.js

export function UploadForm(subject, form, term, category, level, onSuccess) {
  const formWrapper = document.createElement("div");
  formWrapper.className =
    "bg-gray-100 p-4 rounded mt-4 shadow w-full max-w-md mx-auto";

  const heading = document.createElement("h5");
  heading.className = "text-md font-semibold mb-2 text-blue-700";
  heading.textContent = `Upload New File for ${subject}`;

  const uploadForm = document.createElement("form");
  uploadForm.className = "flex flex-col space-y-4 text-sm sm:text-base";

  // 📂 File input
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.required = true;
  fileInput.className = "border rounded p-2 bg-white w-full";

  // 💵 Price input
  const priceInput = document.createElement("input");
  priceInput.type = "number";
  priceInput.placeholder = "Price (0 = Free)";
  priceInput.className = "border rounded p-2 bg-white w-full";

  // 🚀 Upload button
  const uploadBtn = document.createElement("button");
  uploadBtn.type = "submit";
  uploadBtn.textContent = "Upload File";
  uploadBtn.className =
    "bg-green-600 text-white rounded p-2 hover:bg-green-700 w-full";

  // ⛓️ Append all inputs to form
  uploadForm.appendChild(fileInput);
  uploadForm.appendChild(priceInput);
  uploadForm.appendChild(uploadBtn);

  formWrapper.appendChild(heading);
  formWrapper.appendChild(uploadForm);

  // 🔁 Upload Handler
  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!fileInput.files.length) {
      alert("❌ Please select a file to upload.");
      return;
    }

    const isLocal =
      location.hostname === "localhost" || location.hostname === "127.0.0.1";
    const API_BASE_URL = isLocal
      ? "http://localhost:5555"
      : "https://elimu-online.onrender.com";

    const token = localStorage.getItem("adminToken");
    const file = fileInput.files[0];
    const price = priceInput.value || 0;

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("formClass", form);
    formData.append("category", category.toLowerCase());
    formData.append("level", level.toLowerCase());
    formData.append("price", price);
    formData.append("file", file);

    // ✅ Only include term if it's not for Notes or E-Books
    const normalizedCategory = category.toLowerCase();
    if (
      term &&
      normalizedCategory !== "notes" &&
      normalizedCategory !== "e-books" &&
      normalizedCategory !== "ebooks"
    ) {
      formData.append("term", term);
    }

    uploadBtn.disabled = true;
    uploadBtn.textContent = "Uploading...";

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ File uploaded successfully!");
        if (typeof onSuccess === "function") onSuccess();
      } else {
        alert(`❌ Upload failed: ${result.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("🔥 Upload error:", err);
      alert("❌ Server error while uploading.");
    } finally {
      uploadBtn.disabled = false;
      uploadBtn.textContent = "Upload File";
    }
  });

  return formWrapper;
}
