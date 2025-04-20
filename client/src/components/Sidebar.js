export function Sidebar() {
  const aside = document.createElement("aside");
  aside.className = `
    fixed top-[64px] left-0 w-64 h-[calc(100vh-64px)]
    bg-blue-800 text-white flex flex-col justify-start z-40
    transition-transform duration-300 transform -translate-x-full md:translate-x-0
    shadow-lg overflow-y-auto
  `;
  aside.id = "mainSidebar";

  aside.innerHTML = `
    <div class="px-4 py-4">
      <button id="closeSidebar" class="text-white text-2xl mb-4 md:hidden">&times;</button>

      <nav class="space-y-2">
        <div>
          <h3 class="text-sm font-semibold uppercase mb-1 text-gray-300">Primary School</h3>
          <a href="/resources/primary/notes" data-link class="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <span>📘</span><span class="hidden md:inline">Notes</span>
          </a>
          <a href="/resources/primary/exams" data-link class="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <span>✅</span><span class="hidden md:inline">Exams</span>
          </a>
          <a href="/resources/primary/ebooks" data-link class="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <span>📚</span><span class="hidden md:inline">E-Books</span>
          </a>
          <a href="/resources/primary/tutorials" data-link class="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <span>🎓</span><span class="hidden md:inline">Tutorials</span>
          </a>
          <a href="/resources/primary/schemes" data-link class="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <span>🗂️</span><span class="hidden md:inline">Schemes</span>
          </a>
          <a href="/resources/primary/lessons" data-link class="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <span>🧠</span><span class="hidden md:inline">Lesson Plans</span>
          </a>
        </div>

        <div class="mt-4">
          <h3 class="text-sm font-semibold uppercase mb-1 text-gray-300">High School</h3>
          <a href="/resources/highschool/notes" data-link class="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <span>📘</span><span class="hidden md:inline">Notes</span>
          </a>
          <a href="/resources/highschool/exams" data-link class="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <span>✅</span><span class="hidden md:inline">Exams</span>
          </a>
          <a href="/resources/highschool/ebooks" data-link class="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <span>📚</span><span class="hidden md:inline">E-Books</span>
          </a>
          <a href="/resources/highschool/tutorials" data-link class="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <span>🎓</span><span class="hidden md:inline">Tutorials</span>
          </a>
          <a href="/resources/highschool/schemes" data-link class="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <span>🗂️</span><span class="hidden md:inline">Schemes</span>
          </a>
          <a href="/resources/highschool/lessons" data-link class="flex items-center gap-2 p-2 rounded hover:bg-blue-700">
            <span>🧠</span><span class="hidden md:inline">Lesson Plans</span>
          </a>
        </div>
      </nav>
    </div>
  `;

  // Functional Behavior
  setTimeout(() => {
    document.querySelectorAll("[data-link]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        history.pushState({}, "", href);
        window.dispatchEvent(new Event("popstate"));

        const sidebar = document.getElementById("mainSidebar");
        if (sidebar && window.innerWidth < 768) {
          sidebar.classList.add("-translate-x-full");
        }
      });
    });

    const closeBtn = document.getElementById("closeSidebar");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        const sidebar = document.getElementById("mainSidebar");
        sidebar.classList.add("-translate-x-full");
      });
    }

    const hamburger = document.getElementById("sidebarToggle");
    if (hamburger) {
      hamburger.addEventListener("click", () => {
        const sidebar = document.getElementById("mainSidebar");
        if (sidebar) {
          sidebar.classList.toggle("-translate-x-full");
        }
      });
    }
  }, 100);

  return aside;
}
