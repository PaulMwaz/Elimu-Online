export function Login() {
  const section = document.createElement("section");
  section.className = "container py-16 mt-24 text-center px-4";

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = user && user.full_name;

  const API_BASE_URL = "https://elimu-online.onrender.com"; // ✅ Render backend

  section.innerHTML = `
    <h1 class="text-3xl font-bold text-secondary mb-4">Login to Elimu-Online</h1>
    <p class="text-gray-700 dark:text-gray-300 mb-6">
      ${
        isLoggedIn
          ? `✅ You are already logged in as <strong>${user.full_name}</strong>.`
          : "Access premium resources by logging in."
      }
    </p>

    <div class="max-w-sm mx-auto">
      ${
        !isLoggedIn
          ? `
        <input id="loginEmail" type="email" placeholder="Email" class="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400" />
        <input id="loginPassword" type="password" placeholder="Password" class="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400" />
        <button id="loginBtn" class="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">Login</button>
      `
          : `
        <button id="logoutBtn" class="w-full py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition">Logout</button>
      `
      }
      <div id="loginMessage" class="mt-4 text-sm"></div>
    </div>
  `;

  setTimeout(() => {
    const msgBox = document.getElementById("loginMessage");

    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
      loginBtn.addEventListener("click", async () => {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        msgBox.innerHTML = "Logging in...";

        try {
          const res = await fetch(`${API_BASE_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // ✅ Include cookies
            body: JSON.stringify({ email, password }),
          });

          const result = await res.json();

          if (res.ok) {
            localStorage.setItem("user", JSON.stringify(result));
            msgBox.innerHTML = `<span class='text-green-600'>✅ Welcome, ${result.full_name}!</span>`;
            history.pushState({}, "", "/resources");
            window.dispatchEvent(new Event("popstate"));
          } else {
            msgBox.innerHTML = `<span class='text-red-600'>❌ ${result.error}</span>`;
          }
        } catch (err) {
          msgBox.innerHTML = `<span class='text-red-600'>❌ Network error: ${err.message}</span>`;
        }
      });
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        try {
          await fetch(`${API_BASE_URL}/api/logout`, {
            method: "POST",
            credentials: "include",
          });
          localStorage.removeItem("user");
          history.pushState({}, "", "/login");
          window.dispatchEvent(new Event("popstate"));
        } catch (err) {
          console.error("Logout failed:", err.message);
        }
      });
    }
  }, 100);

  return section;
}
