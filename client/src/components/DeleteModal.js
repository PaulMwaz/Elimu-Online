export function DeleteModal(file, API_BASE_URL, token, onDeleteSuccess) {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

  modal.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md animate-fade-in">
      <h2 class="text-lg font-semibold mb-4 text-gray-800">Delete File</h2>
      <p class="mb-6 text-gray-700">Are you sure you want to delete <strong>${file.filename}</strong>?</p>
      <div class="flex justify-end gap-4">
        <button id="cancelDelete" 
                class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded transition">
          Cancel
        </button>
        <button id="confirmDelete" 
                class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition">
          Delete
        </button>
      </div>
    </div>
  `;

  setTimeout(() => {
    const cancelBtn = document.getElementById("cancelDelete");
    const confirmBtn = document.getElementById("confirmDelete");

    cancelBtn.onclick = () => {
      console.log("🚫 Delete cancelled by user.");
      modal.remove();
    };

    confirmBtn.onclick = async () => {
      confirmBtn.disabled = true;
      confirmBtn.textContent = "Deleting...";

      try {
        const deleteUrl = `${API_BASE_URL}/api/admin/delete/${file.id}`;
        console.log("🔗 Sending DELETE request to:", deleteUrl);

        const res = await fetch(deleteUrl, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        console.log("🗑️ Delete API response:", result);

        if (res.ok) {
          alert("✅ File deleted successfully!");
          if (typeof onDeleteSuccess === "function") onDeleteSuccess();
          modal.remove();
        } else {
          alert(`❌ Delete failed: ${result.error || "Unknown error."}`);
          console.error("❌ Delete error response:", result);
        }
      } catch (err) {
        console.error("🔥 Delete network/server error:", err);
        alert("❌ Delete failed: Unexpected network/server error.");
      } finally {
        confirmBtn.disabled = false;
        confirmBtn.textContent = "Delete";
      }
    };
  }, 50);

  return modal;
}
