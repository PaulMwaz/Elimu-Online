// 📁 src/components/RenameModal.js

export function RenameModal(file, API_BASE_URL, token, onRenameSuccess) {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

  modal.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-lg font-semibold mb-4">Rename File</h2>
      <input id="newFileName" class="w-full border p-2 rounded mb-4" type="text" placeholder="New filename (e.g., notes.pdf)" value="${file.filename}"/>
      <div class="flex justify-end gap-4">
        <button id="cancelRename" class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Cancel</button>
        <button id="confirmRename" class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded">Rename</button>
      </div>
    </div>
  `;

  setTimeout(() => {
    document.getElementById("cancelRename").onclick = () => modal.remove();

    document.getElementById("confirmRename").onclick = async () => {
      const newName = document.getElementById("newFileName").value.trim();
      if (!newName) {
        alert("❌ Please enter a new file name.");
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/rename`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: file.id, newName }),
        });
        const result = await res.json();
        console.log("✏️ Rename result:", result);
        if (res.ok) {
          onRenameSuccess();
          modal.remove();
        } else {
          alert(`❌ Rename failed: ${result.error}`);
        }
      } catch (err) {
        console.error("🔥 Rename error:", err);
        alert("❌ Rename failed: Unexpected error.");
      }
    };
  }, 50);

  return modal;
}
