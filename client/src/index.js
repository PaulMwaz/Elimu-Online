// 📁 src/index.js
import { Navbar } from "./components/Navbar.js";
import { Footer } from "./components/Footer.js";
import { Sidebar } from "./components/Sidebar.js";
import { Home } from "./pages/Home.js";
import { About } from "./pages/About.js";
import { Login } from "./pages/Login.js";
import { Register } from "./pages/Register.js";
import { Dashboard } from "./pages/Dashboard.js";
import { AdminPanel } from "./pages/AdminPanel.js";
import { LevelDetailPage } from "./pages/LevelDetailPage.js";
import { ResourceCategoryPage } from "./pages/ResourceCategoryPage.js";
import { GuestResourcePage } from "./pages/GuestResourcePage.js";
import { DashboardLayout } from "./layouts/DashboardLayout.js";

window.addEventListener("DOMContentLoaded", () => {
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

  handleRouting();
  window.addEventListener("popstate", handleRouting);
});

// 🔁 SPA Routing Handler
function handleRouting() {
  const app = document.getElementById("app");
  const path = window.location.pathname;
  const user = JSON.parse(localStorage.getItem("user"));
  const loggedIn = !!user;
  const isAdmin = loggedIn && user.is_admin;
  const isAdminRoute = path === "/admin";

  app.innerHTML = "";

  // Remove old layout elements
  document.querySelector("nav")?.remove();
  document.querySelector("aside")?.remove();
  document.querySelector("footer")?.remove();

  // ✅ Show Sidebar only if not on Admin page
  if (loggedIn && !isAdminRoute) {
    const sidebar = Sidebar();
    document.body.insertBefore(sidebar, app);
  }

  // ✅ Show Navbar only if not on Admin page
  if (!isAdminRoute) {
    const navbar = Navbar();
    document.body.insertBefore(navbar, app);
  }

  // ✅ Route logic
  switch (path) {
    case "/":
    case "/home":
      app.appendChild(Home());
      break;

    case "/about":
      app.appendChild(About());
      break;

    case "/login":
      app.appendChild(
        Login({
          onSuccess: () => {
            history.pushState({}, "", "/resources");
            window.dispatchEvent(new Event("popstate"));
          },
        })
      );
      break;

    case "/register":
      app.appendChild(Register());
      break;

    case "/dashboard":
      app.appendChild(DashboardLayout(() => Dashboard()));
      break;

    case "/admin":
      // ✅ Admin Panel is standalone — no layout, sidebar, footer, or user navbar
      app.appendChild(AdminPanel());
      break;

    case "/resources":
      if (loggedIn) {
        app.appendChild(DashboardLayout(() => ResourceCategoryPage()));
      } else {
        app.appendChild(GuestResourcePage());
      }
      break;

    case "/resources/primary":
      app.appendChild(DashboardLayout(() => LevelDetailPage("primary")));
      break;

    case "/resources/highschool":
      app.appendChild(DashboardLayout(() => LevelDetailPage("highschool")));
      break;

    default:
      const match = path.match(
        /^\/resources\/(primary|highschool)\/(notes|exams|ebooks|tutorials|schemes|lessons)$/
      );

      if (match) {
        const [, level, category] = match;
        app.appendChild(
          DashboardLayout(() => ResourceCategoryPage(level, category))
        );
      } else {
        app.innerHTML = `<div class="text-center py-20 text-red-600 text-xl">404 - Page Not Found</div>`;
      }
  }

  // ✅ Show footer only if NOT on admin panel
  if (!isAdminRoute) {
    const footer = Footer();
    document.body.appendChild(footer);
    setupDarkModeToggle();
    animateFooterOnScroll();
  }
}

// 🌙 Dark mode toggle
function setupDarkModeToggle() {
  const toggle = document.getElementById("darkToggle");
  const root = document.documentElement;
  if (toggle) {
    toggle.addEventListener("change", () => {
      root.classList.toggle("dark", toggle.checked);
    });
  }
}

// 🧾 Animate footer appearance
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
