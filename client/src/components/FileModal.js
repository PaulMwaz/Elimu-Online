// ✅ Updated FileModal.js with uniform "Ksh 30" buttons and responsive layout
export async function FileModal(
  subject = "",
  form = "form2",
  category = "exams",
  term = "term1",
  onClose = () => {}
) {
  const isLoggedIn = !!localStorage.getItem("user");
  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const API_BASE_URL = isLocal
    ? "http://localhost:5555"
    : "https://elimu-online.onrender.com";

  let files = [];
  let loading = true;

  if (isLoggedIn && subject) {
    try {
      const folderPath = `${category}/highschool/${form}/${subject.toLowerCase()}/${term}`;
      const res = await fetch(
        `${API_BASE_URL}/api/files/list?path=${encodeURIComponent(folderPath)}`
      );
      const data = await res.json();
      files = data.files || [];
    } catch (err) {
      console.error("❌ Failed to fetch files:", err);
    } finally {
      loading = false;
    }
  }

  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

  const modal = document.createElement("div");
  modal.className =
    "bg-white dark:bg-gray-800 max-w-2xl w-full rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[90vh]";

  modal.innerHTML = `
    <h3 class="text-xl font-bold mb-4 text-blue-700">${subject} Files</h3>
    <button class="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-600" id="closeModal">&times;</button>
    <div id="fileListContent">
      ${
        loading
          ? '<p class="text-gray-600 dark:text-gray-300">Loading files...</p>'
          : files.length > 0
          ? `<ul class="space-y-4">${files
              .map((file) => {
                const title = file.name;
                const url = file.url;
                const price = parseFloat(file.price || 0);
                const isFree = price <= 0;
                return `
                <li class="p-4 border rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div class="w-full sm:w-3/4">
                    <span class="block font-medium text-gray-800 dark:text-white">${title}</span>
                    <span class="text-xs text-gray-500">${
                      isFree ? "Free" : `Ksh ${price}`
                    }</span>
                  </div>
                  <div class="flex flex-row flex-wrap justify-end items-center gap-2 w-full sm:w-auto">
                    <button class="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">View</button>
                    ${
                      isFree
                        ? `<a href="${url}" target="_blank" class="px-4 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700">Download</a>`
                        : `<button class="px-4 py-1.5 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">Ksh ${price}</button>`
                    }
                  </div>
                </li>`;
              })
              .join("")}</ul>`
          : `<p class="text-gray-600 dark:text-gray-300">No files available for this subject yet.</p>`
      }
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  setTimeout(() => {
    document.getElementById("closeModal").addEventListener("click", () => {
      overlay.remove();
      onClose();
    });

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

// ✅ Optional: Track recently viewed files
window.trackRecentView = function (title, url) {
  try {
    const maxItems = 10;
    const current = JSON.parse(localStorage.getItem("recent_views")) || [];
    const updated = current.filter((item) => item.url !== url);
    updated.unshift({ title, url });
    localStorage.setItem(
      "recent_views",
      JSON.stringify(updated.slice(0, maxItems))
    );
  } catch (err) {
    console.error("⚠️ Error tracking recent view:", err);
  }
};
