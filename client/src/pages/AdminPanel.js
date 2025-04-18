// ✅ Full Updated AdminPanel.js
// Includes: Upload, Spinner, List Files, Preview Modal, Rename + Delete

export function AdminPanel() {
  const section = document.createElement("section");
  section.className = "container py-12 text-center";

  section.innerHTML = `
    <h1 class="text-3xl font-bold text-secondary mb-6">Admin Panel</h1>

    <div class="max-w-md mx-auto bg-white p-6 rounded shadow">
      <form id="admin-upload-form" enctype="multipart/form-data">
        <label class="block mb-2 text-sm font-medium text-gray-700">Select Category</label>
        <select id="categorySelect" class="block w-full mb-4 p-2 border rounded">
          <option value="primary">Primary</option>
          <option value="highschool">High School</option>
        </select>

        <label class="block mb-2 text-sm font-medium text-gray-700">Select File to Upload</label>
        <input type="file" id="uploadInput" name="file" class="block w-full p-2 border rounded" required />

        <button type="submit" class="btn mt-4 w-full">Upload File</button>
        <div id="uploadProgress" class="mt-2 text-sm text-blue-600 hidden">Uploading...</div>
      </form>

      <div id="uploadResponse" class="mt-4 text-sm text-center"></div>
    </div>

    <div id="fileSections" class="mt-10 text-left"></div>
  `;

  setTimeout(() => {
    const form = document.getElementById("admin-upload-form");
    const progress = document.getElementById("uploadProgress");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fileInput = document.getElementById("uploadInput");
      const category = document.getElementById("categorySelect").value;
      const responseBox = document.getElementById("uploadResponse");

      if (!fileInput.files.length) {
        responseBox.innerHTML = `<span class="text-red-600">❌ Please select a file to upload.</span>`;
        return;
      }

      const formData = new FormData();
      formData.append("file", fileInput.files[0]);
      formData.append("category", category);

      progress.classList.remove("hidden");

      try {
        const res = await fetch("http://localhost:5555/api/test-upload", {
          method: "POST",
          body: formData,
        });

        const result = await res.json();
        progress.classList.add("hidden");

        if (res.ok && result.file_url) {
          responseBox.innerHTML = `
            <div class="text-green-600">
              ✅ Upload Successful to <strong>${category}/</strong><br>
              <a href="${result.file_url}" target="_blank" class="underline text-blue-600 hover:text-blue-800">${result.file_url}</a>
            </div>
          `;
          fileInput.value = "";
          loadFilesByCategory();
        } else {
          responseBox.innerHTML = `<span class="text-red-600">❌ Upload failed: ${result.error}</span>`;
        }
      } catch (err) {
        progress.classList.add("hidden");
        responseBox.innerHTML = `<span class="text-red-600">❌ Error: ${err.message}</span>`;
      }
    });

    loadFilesByCategory();

    async function loadFilesByCategory() {
      const fileSections = document.getElementById("fileSections");
      fileSections.innerHTML = "";

      for (let category of ["primary", "highschool"]) {
        const res = await fetch(`http://localhost:5555/api/files/${category}`);
        const files = await res.json();

        if (files.length > 0) {
          const categoryTitle =
            category === "primary"
              ? "Primary Resources"
              : "High School Resources";
          const container = document.createElement("div");
          container.className = "mb-6";
          container.innerHTML = `<h2 class="text-xl font-semibold mb-3">${categoryTitle}</h2>`;

          files.forEach((file) => {
            const fileRow = document.createElement("div");
            fileRow.className =
              "flex justify-between items-center bg-white border p-3 rounded mb-2";

            fileRow.innerHTML = `
              <a href="${file.url}" target="_blank" class="text-blue-600 underline max-w-xs truncate">${file.name}</a>
              <div class="flex gap-2">
                <button class="btn-preview text-sm text-green-600 underline" data-url="${file.url}">Preview</button>
                <button class="btn-rename text-sm text-yellow-600 underline" data-name="${file.name}" data-category="${category}">Rename</button>
                <button class="delete-btn text-sm text-red-600 underline">Delete</button>
              </div>
            `;

            fileRow
              .querySelector(".delete-btn")
              .addEventListener("click", async () => {
                const confirmDelete = confirm(`Delete ${file.name}?`);
                if (confirmDelete) {
                  const del = await fetch(
                    `http://localhost:5555/api/files/${category}/${encodeURIComponent(
                      file.name
                    )}`,
                    {
                      method: "DELETE",
                    }
                  );
                  const msg = await del.json();
                  alert(msg.message || msg.error);
                  loadFilesByCategory();
                }
              });

            container.appendChild(fileRow);
          });

          fileSections.appendChild(container);

          // Attach preview & rename actions after render
          document.querySelectorAll(".btn-preview").forEach((btn) => {
            btn.addEventListener("click", () => {
              showPreviewModal(btn.dataset.url);
            });
          });

          document.querySelectorAll(".btn-rename").forEach((btn) => {
            btn.addEventListener("click", async () => {
              const filename = btn.dataset.name;
              const category = btn.dataset.category;
              const newName = prompt(`Rename \"${filename}\" to:`, filename);
              if (!newName || newName === filename) return;

              const res = await fetch(
                `http://localhost:5555/api/files/${category}/${encodeURIComponent(
                  filename
                )}`,
                {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ new_name: newName }),
                }
              );

              const result = await res.json();
              if (res.ok) {
                alert("✅ Renamed successfully.");
                loadFilesByCategory();
              } else {
                alert(`❌ Rename failed: ${result.error}`);
              }
            });
          });
        }
      }
    }
  }, 100);

  return section;
}

// 🔍 Preview PDF modal
export function showPreviewModal(fileUrl) {
  let modal = document.getElementById("previewModal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "previewModal";
    modal.className =
      "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50";
    modal.innerHTML = `
      <div class="bg-white p-6 rounded max-w-4xl w-full relative">
        <button id="closePreviewBtn" class="absolute top-2 right-2 text-red-600 text-lg font-bold">✖</button>
        <iframe src="${fileUrl}" class="w-full h-[500px] border rounded"></iframe>
      </div>
    `;
    document.body.appendChild(modal);
  } else {
    modal.querySelector("iframe").src = fileUrl;
    modal.style.display = "flex";
  }

  document.getElementById("closePreviewBtn").onclick = () => {
    modal.style.display = "none";
    modal.querySelector("iframe").src = "";
  };
}
