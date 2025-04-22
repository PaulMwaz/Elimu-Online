// 📁 Create this as: src/pages/Dashboard.js

export function Dashboard() {
  const section = document.createElement("section");
  section.className = "container py-20 px-4 text-center mt-24";

  const user = JSON.parse(localStorage.getItem("user"));
  const firstName = user?.full_name?.split(" ")[0] || "User";
  const recent = JSON.parse(localStorage.getItem("recent_views")) || [];

  section.innerHTML = `
    <h1 class="text-4xl font-bold text-blue-700 mb-6">Welcome, ${firstName} 👋</h1>
    <p class="text-gray-700 dark:text-gray-300 text-lg mb-10">Explore and access learning resources tailored for your level.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
        <h2 class="text-2xl font-semibold mb-3">Primary School Resources</h2>
        <p class="text-gray-600 mb-4">Access notes, exams, tutorials, and more for CBC levels.</p>
        <a href="/resources/primary/notes" data-link class="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">Go to Primary</a>
      </div>

      <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
        <h2 class="text-2xl font-semibold mb-3">High School Resources</h2>
        <p class="text-gray-600 mb-4">Browse subject-specific notes, past papers, and e-books.</p>
        <a href="/resources/highschool/notes" data-link class="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">Go to High School</a>
      </div>
    </div>

    <div class="mt-12">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">📣 Announcements</h3>
      <div class="bg-yellow-100 text-yellow-800 p-4 rounded shadow">
        <p>New Form 2 Notes have been uploaded! Check them out in the High School section.</p>
      </div>
    </div>

    <div class="mt-12">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">🕘 Recently Accessed Resources</h3>
      ${
        recent.length === 0
          ? '<p class="text-gray-500">No recent activity yet.</p>'
          : `<ul class="text-left max-w-2xl mx-auto space-y-2">
            ${recent
              .map(
                (
                  item
                ) => `<li class="bg-white shadow p-3 rounded flex justify-between">
              <span>${item.title}</span>
              <a href="${item.url}" target="_blank" class="text-blue-600 underline">View</a>
            </li>`
              )
              .join("")}
          </ul>`
      }
    </div>

    <div id="toast" class="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow hidden z-50">🎉 Logged in successfully!</div>
  `;

  setTimeout(() => {
    section.querySelectorAll("[data-link]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        history.pushState({}, "", href);
        window.dispatchEvent(new Event("popstate"));
      });
    });

    const toast = document.getElementById("toast");
    if (toast && sessionStorage.getItem("showToast")) {
      toast.classList.remove("hidden");
      setTimeout(() => toast.classList.add("hidden"), 3000);
      sessionStorage.removeItem("showToast");
    }
  }, 50);

  return section;
}
