export function Navbar() {
  const nav = document.createElement("nav");
  nav.className =
    "bg-secondary text-white px-6 py-4 flex justify-between items-center shadow relative z-50";

  function renderNavbarContent() {
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = user && user.full_name;

    return `
      <div class="text-lg font-bold">Elimu-Online</div>

      <!-- Desktop Nav -->
      <ul class="hidden md:flex gap-6 items-center text-sm font-medium">
        <li><a href="/" data-link class="hover:text-blue-200 transition">Home</a></li>
        <li><a href="/about" data-link class="hover:text-blue-200 transition">About</a></li>
        <li><a href="/resources" data-link class="hover:text-blue-200 transition">Resources</a></li>
        ${
          isLoggedIn
            ? `
          <li class="text-yellow-200 font-semibold">👋 Welcome, ${
            user.full_name.split(" ")[0]
          }</li>
          <li><button id="logoutBtn" class="text-red-300 hover:text-red-500 transition">Logout</button></li>
        `
            : `
          <li><a href="/login" data-link class="hover:text-blue-200 transition">Login</a></li>
          <li>
            <a href="/register" data-link class="bg-white text-secondary font-semibold px-4 py-1.5 rounded hover:bg-blue-200 transition">
              Register
            </a>
          </li>
        `
        }
      </ul>
    `;
  }

  // Initial render
  nav.innerHTML = renderNavbarContent();

  setTimeout(() => {
    // Handle SPA links
    const links = nav.querySelectorAll("[data-link]");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        history.pushState({}, "", href);
        window.dispatchEvent(new Event("popstate"));
      });
    });

    // Logout event
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        await fetch("http://localhost:5555/api/logout", {
          method: "POST",
          credentials: "include",
        });
        localStorage.removeItem("user");
        history.pushState({}, "", "/login");
        window.dispatchEvent(new Event("popstate"));
      });
    }
  }, 50);

  return nav;
}
