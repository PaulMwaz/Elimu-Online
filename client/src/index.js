import { Navbar } from "./components/Navbar.js";
import { Footer } from "./components/Footer.js";
import { Home } from "./pages/Home.js";
import { About } from "./pages/About.js";
import { Login } from "./pages/Login.js";
import { Register } from "./pages/Register.js";
import { Dashboard } from "./pages/Dashboard.js";
import { AdminPanel } from "./pages/AdminPanel.js";
import { ResourcePage } from "./pages/ResourcePage.js";

// ✅ Wait for DOM content to load
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

  // Insert Navbar only once
  const navbar = Navbar();
  document.body.insertBefore(navbar, app);

  // 🔁 SPA Routing Function
  function handleRouting() {
    const path = window.location.pathname;
    app.innerHTML = ""; // Clear existing content

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

    // ❌ Remove any existing footer before adding a new one
    const oldFooter = document.querySelector("footer");
    if (oldFooter) oldFooter.remove();

    // ✅ Inject fresh Footer
    const footer = Footer();
    document.body.appendChild(footer);

    // Enable Dark Mode toggle and Footer Animation
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

  // 🚀 Run router on first load & on browser navigation
  handleRouting();
  window.addEventListener("popstate", handleRouting);
});
