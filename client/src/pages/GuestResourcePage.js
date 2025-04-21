// 📁 src/pages/GuestResourcePage.js
export function GuestResourcePage() {
  const div = document.createElement("div");
  div.className = "py-20 px-6 text-center bg-gray-50";

  div.innerHTML = `
    <section class="max-w-3xl mx-auto bg-white rounded shadow p-10">
      <h1 class="text-3xl font-bold text-blue-700 mb-4">Access Learning Resources</h1>
      <p class="text-lg text-gray-700 mb-6">
        Elimu-Online provides quality, curriculum-aligned resources for Primary and High School students.
        <br>To continue, please log in or create a free account.
      </p>

      <div class="flex justify-center gap-6 mt-6">
        <a href="/login" data-link class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Login
        </a>
        <a href="/register" data-link class="bg-gray-200 text-blue-700 px-6 py-2 rounded hover:bg-gray-300 transition">
          Register
        </a>
      </div>

      <div class="mt-10 text-sm text-gray-500">
        🔐 Files are protected. Viewing & downloading is only available to logged-in users.
      </div>
    </section>
  `;

  return div;
}
