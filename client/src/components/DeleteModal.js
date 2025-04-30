// 📁 src/components/DeleteModal.js

export function DeleteModal(file, API_BASE_URL, token, onDeleteSuccess) {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

  modal.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-lg font-semibold mb-4">Delete File</h2>
      <p class="mb-6">Are you sure you want to delete <strong>${file.filename}</strong>?</p>
      <div class="flex justify-end gap-4">
        <button id="cancelDelete" class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Cancel</button>
        <button id="confirmDelete" class="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded">Delete</button>
      </div>
    </div>
  `;

  setTimeout(() => {
    document.getElementById("cancelDelete").onclick = () => modal.remove();

    document.getElementById("confirmDelete").onclick = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/delete/${file.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        console.log("🗑️ Delete result:", result);
        if (res.ok) {
          onDeleteSuccess();
          modal.remove();
        } else {
          alert(`❌ Delete failed: ${result.error}`);
        }
      } catch (err) {
        console.error("🔥 Delete error:", err);
        alert("❌ Delete failed: Unexpected error.");
      }
    };
  }, 50);

  return modal;
}
