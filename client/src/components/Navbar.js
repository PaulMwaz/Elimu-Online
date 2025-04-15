export function Navbar() {
  const nav = document.createElement("nav");
  nav.className =
    "bg-secondary text-white px-6 py-4 flex justify-between items-center shadow";

  nav.innerHTML = `
    <div class="text-lg font-bold">Elimu-Online</div>

    <ul class="hidden md:flex gap-6 items-center text-sm font-medium">
      <li><a href="/" data-link class="hover:text-blue-200 transition">Home</a></li>
      <li><a href="/about" data-link class="hover:text-blue-200 transition">About</a></li>
      <li><a href="/resources" data-link class="hover:text-blue-200 transition">Resources</a></li>
      <li><a href="/login" data-link class="hover:text-blue-200 transition">Login</a></li>
      <li>
        <a href="/register" data-link class="bg-white text-secondary font-semibold px-4 py-1.5 rounded hover:bg-blue-200 transition">
          Register
        </a>
      </li>
    </ul>

    <!-- Mobile menu toggle (optional for future upgrade) -->
    <div class="md:hidden">
      <button id="menuToggle" class="focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-white" viewBox="0 0 24 24">
          <path d="M4 5h16M4 12h16M4 19h16" />
        </svg>
      </button>
    </div>
  `;

  // JS-based SPA navigation
  setTimeout(() => {
    const links = nav.querySelectorAll("[data-link]");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        history.pushState({}, "", href);
        window.dispatchEvent(new Event("popstate"));
      });
    });
  }, 0);

  return nav;
}
