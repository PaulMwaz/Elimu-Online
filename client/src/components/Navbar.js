export function Navbar() {
  const nav = document.createElement("nav");
  nav.className =
    "bg-blue-600 p-4 text-white flex justify-between items-center";

  nav.innerHTML = `
    <div class="font-bold text-lg">Elimu-Online</div>
    <ul class="flex gap-4 text-sm">
      <li><a href="/" data-link>Home</a></li>
      <li><a href="/about" data-link>About</a></li>
      <li><a href="/resources" data-link>Resources</a></li>
      <li><a href="/login" data-link>Login</a></li>
    </ul>
  `;

  // Add JS-based navigation for SPA
  setTimeout(() => {
    const links = nav.querySelectorAll("[data-link]");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");

        history.pushState({}, "", href);
        window.dispatchEvent(new Event("popstate")); // trigger router
      });
    });
  }, 0);

  return nav;
}
