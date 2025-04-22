export function Register() {
  const section = document.createElement("section");
  section.className = "container pt-28 pb-16 px-4 text-center";

  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const API_BASE_URL = isLocal
    ? "http://localhost:5555"
    : "https://elimu-online.onrender.com";

  section.innerHTML = `
    <h1 class="text-3xl font-bold text-secondary mb-4">Create Your Account</h1>
    <p class="text-gray-700 dark:text-gray-300 mb-6">Join Elimu-Online to access learning materials.</p>

    <div class="max-w-md mx-auto text-left bg-white p-6 rounded shadow">
      <label class="block text-sm font-medium mb-1">Full Name</label>
      <div class="relative mb-4">
        <span class="absolute top-2.5 left-3 text-gray-400">🧑🎓</span>
        <input id="registerName" type="text" placeholder="Full Name" class="w-full pl-10 pr-3 py-2 border rounded focus:outline-blue-500" autofocus />
      </div>

      <label class="block text-sm font-medium mb-1">Email</label>
      <div class="relative mb-4">
        <span class="absolute top-2.5 left-3 text-gray-400">📧</span>
        <input id="registerEmail" type="email" placeholder="Email" class="w-full pl-10 pr-3 py-2 border rounded focus:outline-blue-500" />
      </div>

      <label class="block text-sm font-medium mb-1">Password</label>
      <div class="relative mb-4">
        <span class="absolute top-2.5 left-3 text-gray-400">🔒</span>
        <input id="registerPassword" type="password" placeholder="Password" class="w-full pl-10 pr-10 py-2 border rounded focus:outline-blue-500" />
        <button type="button" id="togglePassword" class="absolute top-2.5 right-3 text-sm text-blue-600">Show</button>
      </div>

      <label class="block text-sm font-medium mb-1">Confirm Password</label>
      <div class="relative mb-4">
        <span class="absolute top-2.5 left-3 text-gray-400">🔒</span>
        <input id="confirmPassword" type="password" placeholder="Confirm Password" class="w-full pl-10 py-2 border rounded focus:outline-blue-500" />
      </div>

      <div class="flex items-center mb-4">
        <input type="checkbox" id="rememberMe" class="mr-2" />
        <label for="rememberMe" class="text-sm">Remember me</label>
      </div>

      <button id="registerBtn" class="btn w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition">
        Register
      </button>

      <p class="text-sm mt-4 text-center">
        Already have an account?
        <a href="/login" data-link class="text-blue-600 hover:underline">Login here</a>
      </p>

      <div id="registerMessage" class="mt-4 text-sm text-center"></div>
    </div>
  `;

  // 💡 Attach JS logic after DOM is inserted
  setTimeout(() => {
    const toggleBtn = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("registerPassword");
    const confirmInput = document.getElementById("confirmPassword");
    const msgBox = document.getElementById("registerMessage");

    // 👁 Show/hide password
    toggleBtn.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      confirmInput.type = isHidden ? "text" : "password";
      toggleBtn.textContent = isHidden ? "Hide" : "Show";
    });

    // 🌐 SPA Navigation
    document.querySelectorAll("[data-link]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        history.pushState({}, "", link.getAttribute("href"));
        window.dispatchEvent(new Event("popstate"));
      });
    });

    // ✅ Registration Logic
    document
      .getElementById("registerBtn")
      .addEventListener("click", async () => {
        const full_name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmInput.value;
        const remember = document.getElementById("rememberMe").checked;

        msgBox.innerHTML = "";

        if (!full_name || !email || !password || !confirmPassword) {
          msgBox.innerHTML = `<span class="text-red-600">❌ Please fill all fields.</span>`;
          return;
        }

        if (password !== confirmPassword) {
          msgBox.innerHTML = `<span class="text-red-600">❌ Passwords do not match.</span>`;
          return;
        }

        msgBox.innerHTML = "Registering...";

        try {
          const res = await fetch(`${API_BASE_URL}/api/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ full_name, email, password, remember }),
          });

          const result = await res.json();

          if (res.ok) {
            msgBox.innerHTML = `<span class='text-green-600'>🎉 Successfully registered! You can now <a href="/login" data-link class="underline text-blue-600">login here</a>.</span>`;

            // ✅ Clear form
            document.getElementById("registerName").value = "";
            document.getElementById("registerEmail").value = "";
            passwordInput.value = "";
            confirmInput.value = "";
            document.getElementById("rememberMe").checked = false;
          } else {
            msgBox.innerHTML = `<span class='text-red-600'>❌ ${result.error}</span>`;
          }
        } catch (err) {
          msgBox.innerHTML = `<span class='text-red-600'>❌ Error: ${err.message}</span>`;
        }
      });
  }, 100);

  return section;
}
