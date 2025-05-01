export function ResetPassword(token) {
  const section = document.createElement("section");
  section.className =
    "min-h-screen bg-gray-50 flex items-center justify-center px-4 py-24";

  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const API_BASE_URL = isLocal
    ? "http://localhost:5555"
    : "https://elimu-online.onrender.com";

  section.innerHTML = `
    <div class="bg-white shadow-xl p-6 md:p-8 rounded-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-blue-600 mb-4">
        Reset Your Password
      </h2>
      <p class="text-sm text-center text-gray-600 mb-6">
        Enter and confirm your new password below.
      </p>

      <input
        id="newPassword"
        type="password"
        placeholder="New Password"
        class="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        id="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        class="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        id="resetBtn"
        class="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
      >
        Reset Password
      </button>

      <div id="resetMessage" class="mt-4 text-sm text-center"></div>
    </div>
  `;

  setTimeout(() => {
    const resetBtn = document.getElementById("resetBtn");
    const msgBox = document.getElementById("resetMessage");

    resetBtn.addEventListener("click", async () => {
      const newPassword = document.getElementById("newPassword").value.trim();
      const confirmPassword = document
        .getElementById("confirmPassword")
        .value.trim();

      msgBox.innerHTML = "";

      if (!newPassword || !confirmPassword) {
        msgBox.innerHTML = `<span class='text-red-600'>❌ Please fill in both password fields.</span>`;
        return;
      }

      if (newPassword !== confirmPassword) {
        msgBox.innerHTML = `<span class='text-red-600'>❌ Passwords do not match.</span>`;
        return;
      }

      msgBox.textContent = "Resetting password...";

      try {
        const res = await fetch(`${API_BASE_URL}/api/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, new_password: newPassword }),
        });

        const result = await res.json();

        if (res.ok) {
          msgBox.innerHTML = `<span class="text-green-600">✅ Password updated successfully! Redirecting to login...</span>`;

          // ✅ Redirect to login page after 3 seconds
          setTimeout(() => {
            history.pushState({}, "", "/login");
            window.dispatchEvent(new Event("popstate"));
          }, 3000);
        } else {
          msgBox.innerHTML = `<span class="text-red-600">❌ ${
            result.error || "Something went wrong."
          }</span>`;
        }
      } catch (err) {
        msgBox.innerHTML = `<span class="text-red-600">❌ Network error: ${err.message}</span>`;
      }
    });

    // Enable internal routing for links with data-link
    document.querySelectorAll("[data-link]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        history.pushState({}, "", link.getAttribute("href"));
        window.dispatchEvent(new Event("popstate"));
      });
    });
  }, 100);

  return section;
}
