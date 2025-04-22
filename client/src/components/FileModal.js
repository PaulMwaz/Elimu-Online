export async function FileModal(files = [], subject = "", onClose = () => {}) {
  const isLoggedIn = !!localStorage.getItem("user");

  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const API_BASE_URL = isLocal
    ? "http://localhost:5555"
    : "https://elimu-online.onrender.com";

  // 🔄 Optional dynamic fetch from API if empty
  if (isLoggedIn && files.length === 0 && subject) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/resources`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      files = data.resources.filter((r) =>
        r.title.toLowerCase().includes(subject.toLowerCase())
      );
    } catch (err) {
      console.error("❌ Failed to load files:", err);
    }
  }

  // 🔲 Create modal container
  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

  const modal = document.createElement("div");
  modal.className =
    "bg-white dark:bg-gray-800 max-w-xl w-full rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[90vh]";

  modal.innerHTML = `
    <h3 class="text-xl font-bold mb-4 text-blue-700">${subject} Files</h3>
    <button class="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-600" id="closeModal">&times;</button>
    <div>
      ${
        isLoggedIn
          ? files.length > 0
            ? `<ul class="space-y-3">${files
                .map((file) => {
                  const title = file.title || file.name;
                  const url = file.file_url || file.url;
                  return `
                    <li class="flex justify-between items-center border-b pb-2">
                      <span class="text-gray-800 dark:text-white truncate max-w-[60%]">${title}</span>
                      <a href="${url}" target="_blank" class="text-blue-600 hover:underline font-medium" onclick="trackRecentView('${title}', '${url}')">Download</a>
                    </li>`;
                })
                .join("")}</ul>`
            : `<p class="text-gray-600 dark:text-gray-300">No files available for this subject yet.</p>`
          : `<p class="text-red-500">Please <a href="/login" data-link class="underline text-blue-600">Login</a> or 
             <a href="/register" data-link class="underline text-blue-600">Register</a> to access files.</p>`
      }
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  setTimeout(() => {
    // Close button
    document.getElementById("closeModal").addEventListener("click", () => {
      overlay.remove();
      onClose();
    });

    // Internal SPA routing
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

// 🔁 Global tracker function
window.trackRecentView = function (title, url) {
  try {
    const maxItems = 10;
    const current = JSON.parse(localStorage.getItem("recent_views")) || [];

    // Remove existing if duplicate
    const updated = current.filter((item) => item.url !== url);

    // Add to start
    updated.unshift({ title, url });

    // Limit to max 10
    localStorage.setItem(
      "recent_views",
      JSON.stringify(updated.slice(0, maxItems))
    );
  } catch (err) {
    console.error("⚠️ Error tracking recent view:", err);
  }
};
