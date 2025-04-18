import { Navbar } from "./components/Navbar.js";
import { Footer } from "./components/Footer.js";
import { Home } from "./pages/Home.js";
import { About } from "./pages/About.js";
import { Login } from "./pages/Login.js";
import { Register } from "./pages/Register.js";
import { Dashboard } from "./pages/Dashboard.js";
import { AdminPanel } from "./pages/AdminPanel.js";
import { ResourcePage } from "./pages/ResourcePage.js";

window.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM loaded. Initializing app...");

  const app = document.getElementById("app");

  if (!app) {
    console.error("❌ #app container not found in index.html");
    return;
  }

  document.body.classList.add(
    "flex",
    "flex-col",
    "min-h-screen",
    "bg-light",
    "text-textMain"
  );
  app.classList.add("flex-grow");

  // 🔁 SPA Routing Function
  function handleRouting() {
    const path = window.location.pathname;
    app.innerHTML = ""; // Clear main content

    // ❌ Remove existing Navbar & Footer
    const oldNav = document.querySelector("nav");
    const oldFooter = document.querySelector("footer");
    if (oldNav) oldNav.remove();
    if (oldFooter) oldFooter.remove();

    // ✅ Re-insert fresh Navbar
    const newNavbar = Navbar();
    document.body.insertBefore(newNavbar, app);

    // ✅ Page routing
    switch (path) {
      case "/":
      case "/home":
        app.appendChild(Home());
        break;
      case "/about":
        app.appendChild(About());
        break;
      case "/login":
        app.appendChild(Login());
        break;
      case "/register":
        app.appendChild(Register());
        break;
      case "/dashboard":
        app.appendChild(Dashboard());
        break;
      case "/admin":
        app.appendChild(AdminPanel());
        break;
      case "/resources":
        app.appendChild(ResourcePage());
        break;
      default:
        app.innerHTML = `<div class="text-center py-20 text-red-600 text-xl">404 - Page Not Found</div>`;
    }

    // ✅ Add new footer
    const footer = Footer();
    document.body.appendChild(footer);

    setupDarkModeToggle();
    animateFooterOnScroll();
  }

  // 🌙 Dark Mode Toggle Handler
  function setupDarkModeToggle() {
    const toggle = document.getElementById("darkToggle");
    const root = document.documentElement;

    if (toggle) {
      toggle.addEventListener("change", () => {
        root.classList.toggle("dark", toggle.checked);
      });
    }
  }

  // ✨ Footer Reveal on Scroll
  function animateFooterOnScroll() {
    const footer = document.getElementById("main-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            footer.classList.add("visible");
            observer.unobserve(footer);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
  }

  // 🚀 Load on first run & on browser history pop
  handleRouting();
  window.addEventListener("popstate", handleRouting);
});
