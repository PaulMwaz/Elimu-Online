export async function FileModal(
  subject = "",
  form = "form2", // default Form
  category = "exams",
  onClose = () => {}
) {
  const isLoggedIn = !!localStorage.getItem("user");
  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const API_BASE_URL = isLocal
    ? "http://localhost:5555"
    : "https://elimu-online.onrender.com";

  console.log("🟦 Opening FileModal...");
  console.log("📂 Subject:", subject);
  console.log("📚 Form:", form);
  console.log("📁 Category:", category);

  let files = [];

  if (isLoggedIn && subject) {
    try {
      const folderPath = `${category}/highschool/${form}/${subject.toLowerCase()}`;
      console.log("📡 Fetching files from:", folderPath);

      const res = await fetch(
        `${API_BASE_URL}/api/files/list?path=${encodeURIComponent(folderPath)}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();
      console.log("✅ Response Data:", data);

      files = data.files || [];
    } catch (err) {
      console.error("❌ Fetch failed:", err);
    }
  }

  // Create modal overlay
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
                  const title = file.name || "Unnamed File";
                  const url = file.url || "#";
                  return `
                    <li class="flex justify-between items-center border-b pb-2">
                      <span class="text-gray-800 dark:text-white truncate max-w-[60%]">${title}</span>
                      <a href="${url}" target="_blank" class="text-blue-600 hover:underline font-medium" onclick="trackRecentView('${title}', '${url}')">Download</a>
                    </li>`;
                })
                .join("")}</ul>`
            : `<p class="text-gray-600 dark:text-gray-300">No files available for this subject yet.</p>`
          : `<p class="text-red-500">Please <a href="/login" data-link class="underline text-blue-600">Login</a> or <a href="/register" data-link class="underline text-blue-600">Register</a> to access files.</p>`
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

// ✅ View Tracker (Optional)
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
