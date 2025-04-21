// 📁 src/components/FileModal.js

export function FileModal(files = [], subject = "", onClose = () => {}) {
  const isLoggedIn = !!localStorage.getItem("user");

  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50";

  const modal = document.createElement("div");
  modal.className = "bg-white max-w-lg w-full rounded shadow p-6 relative";

  modal.innerHTML = `
    <h3 class="text-xl font-bold mb-4 text-blue-700">${subject} Files</h3>
    <button class="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-600" id="closeModal">&times;</button>
    ${
      isLoggedIn
        ? files.length > 0
          ? `<ul class="space-y-2">${files
              .map(
                (file) =>
                  `<li class="flex justify-between items-center border-b pb-1">
                    <span>${file.name}</span>
                    <a href="${file.url}" target="_blank" class="text-blue-500 hover:underline">Download</a>
                  </li>`
              )
              .join("")}</ul>`
          : `<p class="text-gray-600">No files available for this subject yet.</p>`
        : `<p class="text-red-500">Please <a href="/login" data-link class="underline text-blue-600">Login</a> or 
           <a href="/register" data-link class="underline text-blue-600">Register</a> to access files.</p>`
    }
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  setTimeout(() => {
    document.getElementById("closeModal").addEventListener("click", () => {
      overlay.remove();
      onClose();
    });

    // Enable routing for modal links
    document.querySelectorAll("[data-link]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        overlay.remove();
        const href = link.getAttribute("href");
        history.pushState({}, "", href);
        window.dispatchEvent(new Event("popstate"));
      });
    });
  }, 50);
}
