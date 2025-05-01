// 📁 src/pages/ForgotPassword.js
export function ForgotPassword() {
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
      <div class="bg-white shadow-lg p-6 md:p-8 rounded w-full max-w-md">
        <h2 class="text-2xl font-bold text-center text-blue-600 mb-4">Forgot Password</h2>
        <p class="text-sm text-gray-600 text-center mb-6">Enter your email to receive a password reset link.</p>
        <input id="emailInput" type="email" placeholder="Enter your email" class="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <button id="submitBtn" class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Send Reset Link</button>
        <div id="messageBox" class="mt-4 text-center text-sm"></div>
      </div>
    `;

  setTimeout(() => {
    const emailInput = document.getElementById("emailInput");
    const submitBtn = document.getElementById("submitBtn");
    const msgBox = document.getElementById("messageBox");

    submitBtn.addEventListener("click", async () => {
      const email = emailInput.value.trim();
      msgBox.textContent = "Sending...";

      if (!email) {
        msgBox.innerHTML = `<span class='text-red-600'>❌ Please enter your email.</span>`;
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/forgot-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const result = await res.json();

        if (res.ok) {
          msgBox.innerHTML = `<span class='text-green-600'>✅ ${result.message}</span>`;
        } else {
          msgBox.innerHTML = `<span class='text-red-600'>❌ ${result.error}</span>`;
        }
      } catch (err) {
        msgBox.innerHTML = `<span class='text-red-600'>❌ Network error: ${err.message}</span>`;
      }
    });
  }, 100);

  return section;
}
