export function RenameModal(file, API_BASE_URL, token, onRenameSuccess) {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

  modal.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md animate-fade-in">
      <h2 class="text-lg font-semibold mb-4 text-gray-800">Rename File</h2>
      <input id="newFileName" 
             class="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring focus:border-blue-400" 
             type="text" 
             placeholder="New filename (e.g., notes.pdf)" 
             value="${file.filename}" />

      <div class="flex justify-end gap-4">
        <button id="cancelRename" 
                class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded transition">
          Cancel
        </button>
        <button id="confirmRename" 
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition">
          Rename
        </button>
      </div>
    </div>
  `;

  setTimeout(() => {
    const cancelBtn = document.getElementById("cancelRename");
    const confirmBtn = document.getElementById("confirmRename");
    const input = document.getElementById("newFileName");

    cancelBtn.onclick = () => {
      console.log("🛑 Rename cancelled by user.");
      modal.remove();
    };

    confirmBtn.onclick = async () => {
      const newName = input.value.trim();

      if (!newName || newName.length < 3 || !newName.includes(".")) {
        alert("❌ Please enter a valid new file name (e.g., exam_term2.pdf)");
        console.warn("⚠️ Invalid rename input:", newName);
        input.focus();
        return;
      }

      confirmBtn.disabled = true;
      confirmBtn.textContent = "Renaming...";

      try {
        console.log("🚀 Sending rename request to API:", {
          id: file.id,
          newName,
        });

        const response = await fetch(`${API_BASE_URL}/api/admin/rename`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: file.id, newName }),
        });

        const result = await response.json();

        console.log("✅ Rename response received:", result);

        if (response.ok) {
          alert("✅ File renamed successfully!");
          if (typeof onRenameSuccess === "function") onRenameSuccess();
          modal.remove();
        } else {
          alert(`❌ Rename failed: ${result.error || "Unknown server error."}`);
          console.error("❌ Rename failed response:", result);
        }
      } catch (err) {
        console.error("🔥 Rename request error:", err);
        alert("❌ Rename failed: Unexpected network/server error.");
      } finally {
        confirmBtn.disabled = false;
        confirmBtn.textContent = "Rename";
      }
    };
  }, 50);

  return modal;
}
