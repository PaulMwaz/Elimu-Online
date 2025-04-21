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

// Routing + layout handler
function handleRouting() {
  const app = document.getElementById("app");
  const path = window.location.pathname;
  const loggedIn = !!localStorage.getItem("user");

  app.innerHTML = "";

  // Remove old navbar/sidebar/footer
  document.querySelector("nav")?.remove();
  document.querySelector("aside")?.remove();
  document.querySelector("footer")?.remove();

  // Append sidebar if logged in
  if (loggedIn) {
    const sidebar = Sidebar();
    document.body.insertBefore(sidebar, app);
  }

  // Insert Navbar (after Sidebar)
  const navbar = Navbar();
  document.body.insertBefore(navbar, app);

  // Page routing
  switch (path) {
    case "/":
    case "/home":
      app.appendChild(Home());
      document.body.appendChild(Footer()); // ✅ ensure footer on homepage
      return;
    case "/about":
      app.appendChild(About());
      document.body.appendChild(Footer());
      return;
    case "/login":
      app.appendChild(
        Login({
          onSuccess: () => {
            // ✅ Login success now re-renders layout correctly
            history.pushState({}, "", "/resources");
            window.dispatchEvent(new Event("popstate"));
          },
        })
      );
      document.body.appendChild(Footer());
      return;
    case "/register":
      app.appendChild(Register());
      document.body.appendChild(Footer());
      return;
    case "/dashboard":
      app.appendChild(DashboardLayout(() => Dashboard()));
      document.body.appendChild(Footer());
      return;
    case "/admin":
      app.appendChild(DashboardLayout(() => AdminPanel()));
      document.body.appendChild(Footer());
      return;
    case "/resources":
      app.appendChild(DashboardLayout(() => ResourceCategoryPage()));
      document.body.appendChild(Footer());
      return;
    case "/resources/primary":
      app.appendChild(DashboardLayout(() => LevelDetailPage("primary")));
      document.body.appendChild(Footer());
      return;
    case "/resources/highschool":
      app.appendChild(DashboardLayout(() => LevelDetailPage("highschool")));
      document.body.appendChild(Footer());
      return;
  }

  const match = path.match(
    /^\/resources\/(primary|highschool)\/(notes|exams|ebooks|tutorials|schemes|lessons)$/
  );
  if (match) {
    const [, level, category] = match;
    app.appendChild(
      DashboardLayout(() => ResourceCategoryPage(level, category))
    );
    document.body.appendChild(Footer()); // ✅ ensure footer on resource category pages
  } else {
    app.innerHTML = `<div class="text-center py-20 text-red-600 text-xl">404 - Page Not Found</div>`;
    document.body.appendChild(Footer());
  }

  setupDarkModeToggle();
  animateFooterOnScroll();
}

// Theme toggle
function setupDarkModeToggle() {
  const toggle = document.getElementById("darkToggle");
  const root = document.documentElement;
  if (toggle) {
    toggle.addEventListener("change", () => {
      root.classList.toggle("dark", toggle.checked);
    });
  }
}

// Animate footer
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
