export function Register() {
  const section = document.createElement("section");
  section.className = "container py-12 text-center";

  section.innerHTML = `
    <h1 class="text-3xl font-bold text-secondary mb-4">Create Your Account</h1>
    <p class="text-gray-700 dark:text-gray-300 mb-6">Join Elimu-Online to access learning materials.</p>
    <div class="max-w-sm mx-auto text-left">
      <label class="block text-sm font-medium mb-1">Full Name</label>
      <input id="registerName" type="text" placeholder="Full Name" class="w-full mb-4 p-2 border rounded" />

      <label class="block text-sm font-medium mb-1">Email</label>
      <input id="registerEmail" type="email" placeholder="Email" class="w-full mb-4 p-2 border rounded" />

      <label class="block text-sm font-medium mb-1">Password</label>
      <div class="relative mb-4">
        <input id="registerPassword" type="password" placeholder="Password" class="w-full p-2 border rounded pr-10" />
        <button type="button" id="togglePassword" class="absolute top-2 right-2 text-sm text-blue-600">Show</button>
      </div>

      <button id="registerBtn" class="btn w-full">Register</button>
      <div id="registerMessage" class="mt-4 text-sm text-center"></div>
    </div>
  `;

  setTimeout(() => {
    const toggleBtn = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("registerPassword");
    const msgBox = document.getElementById("registerMessage");

    // Toggle password visibility
    toggleBtn.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      toggleBtn.textContent = isHidden ? "Hide" : "Show";
    });

    // Handle registration
    document
      .getElementById("registerBtn")
      .addEventListener("click", async () => {
        const full_name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = passwordInput.value;
        msgBox.innerHTML = "";

        if (!full_name || !email || !password) {
          msgBox.innerHTML = `<span class="text-red-600">❌ Please fill all fields.</span>`;
          return;
        }

        msgBox.innerHTML = "Registering...";

        try {
          const res = await fetch("http://localhost:5555/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ full_name, email, password }),
          });

          const result = await res.json();

          if (res.ok) {
            msgBox.innerHTML = `<span class='text-green-600'>🎉 Successfully registered! Redirecting to login...</span>`;
            setTimeout(() => {
              history.pushState({}, "", "/login");
              window.dispatchEvent(new Event("popstate"));
            }, 1500);
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
