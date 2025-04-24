// ✅ Full Updated AdminPanel.js with Term & Price fields
export function AdminPanel() {
  const section = document.createElement("section");
  section.className = "container py-16 px-4";

  const token = localStorage.getItem("adminToken");
  const isLocal =
    location.hostname === "localhost" || location.hostname === "127.0.0.1";
  const API_BASE_URL = isLocal
    ? "http://localhost:5555"
    : "https://elimu-online.onrender.com";

  if (!token) {
    section.innerHTML = `
      <div class="max-w-md mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4 text-blue-700">🔐 Admin Login</h2>
        <div class="bg-white p-6 rounded shadow space-y-4">
          <input id="adminEmail" type="email" placeholder="Email" class="w-full p-2 border rounded" />
          <input id="adminPassword" type="password" placeholder="Password" class="w-full p-2 border rounded" />
          <button id="adminLoginBtn" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
          <div id="adminLoginMsg" class="text-sm text-red-600 mt-2"></div>
        </div>
      </div>
    `;

    setTimeout(() => {
      document
        .getElementById("adminLoginBtn")
        .addEventListener("click", async () => {
          const email = document.getElementById("adminEmail").value.trim();
          const password = document
            .getElementById("adminPassword")
            .value.trim();

          if (!email || !password) {
            document.getElementById("adminLoginMsg").textContent =
              "❌ Enter both email and password.";
            return;
          }

          try {
            const res = await fetch(`${API_BASE_URL}/api/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            });

            const result = await res.json();
            if (res.ok && result.user && result.user.is_admin) {
              localStorage.setItem("adminToken", result.token);
              history.pushState({}, "", "/admin");
              window.dispatchEvent(new Event("popstate"));
            } else {
              document.getElementById("adminLoginMsg").textContent =
                "❌ " +
                (result.error || "Invalid credentials or not an admin.");
            }
          } catch (err) {
            document.getElementById(
              "adminLoginMsg"
            ).textContent = `❌ Login error: ${err.message}`;
          }
        });
    }, 100);

    return section;
  }

  // ✅ Admin Upload Form UI
  section.innerHTML = `
    <div class="max-w-2xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-blue-700">Admin Upload Panel</h1>
        <button id="adminLogoutBtn" class="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">Logout</button>
      </div>

      <form id="admin-upload-form" enctype="multipart/form-data" class="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Level</label>
          <select id="levelSelect" class="w-full p-2 border rounded">
            <option value="highschool">High School</option>
            <option value="primary">Primary School</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Form/Class</label>
          <select id="classSelect" class="w-full p-2 border rounded">
            <option value="form2">Form 2</option>
            <option value="form3">Form 3</option>
            <option value="form4">Form 4</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Category</label>
          <select id="categorySelect" class="w-full p-2 border rounded">
            <option value="exams">Exams</option>
            <option value="notes">Notes</option>
            <option value="ebooks">E-Books</option>
            <option value="tutorials">Tutorials</option>
            <option value="schemes">Schemes of Work</option>
            <option value="lessons">Lesson Plans</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Subject</label>
          <input type="text" id="subjectInput" placeholder="e.g. Mathematics" class="w-full p-2 border rounded" required />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Term</label>
          <select id="termSelect" class="w-full p-2 border rounded">
            <option value="term1">Term 1</option>
            <option value="term2">Term 2</option>
            <option value="term3">Term 3</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Price (Ksh)</label>
          <input type="number" id="priceInput" class="w-full p-2 border rounded" value="0" min="0" step="1" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Select File</label>
          <input type="file" id="uploadInput" class="w-full p-2 border rounded" required />
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Upload File</button>
        <div id="uploadResponse" class="text-sm text-center mt-2"></div>
      </form>
    </div>
  `;

  setTimeout(() => {
    document.getElementById("adminLogoutBtn").addEventListener("click", () => {
      localStorage.removeItem("adminToken");
      history.pushState({}, "", "/admin");
      window.dispatchEvent(new Event("popstate"));
    });

    const form = document.getElementById("admin-upload-form");
    const responseBox = document.getElementById("uploadResponse");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const file = document.getElementById("uploadInput").files[0];
      const level = document.getElementById("levelSelect").value;
      const formClass = document.getElementById("classSelect").value;
      const category = document.getElementById("categorySelect").value;
      const subject = document.getElementById("subjectInput").value.trim();
      const term = document.getElementById("termSelect").value;
      const price = parseFloat(
        document.getElementById("priceInput").value || "0"
      ).toFixed(2);

      if (!file) {
        responseBox.innerHTML = `<div class="bg-red-100 text-red-800 p-3 rounded">❌ Please select a file.</div>`;
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("level", level);
      formData.append("class", formClass);
      formData.append("category", category);
      formData.append("subject", subject);
      formData.append("term", term);
      formData.append("price", price);

      try {
        const res = await fetch(`${API_BASE_URL}/api/files/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const result = await res.json();
        if (res.ok) {
          responseBox.innerHTML = `<div class="bg-green-100 text-green-800 p-3 rounded">✅ File uploaded: <a href="${result.file_url}" class="underline" target="_blank">${result.file_url}</a></div>`;
          form.reset();
        } else {
          responseBox.innerHTML = `<div class="bg-red-100 text-red-800 p-3 rounded">❌ Upload failed: ${
            result.error || "Try again."
          }</div>`;
        }
      } catch (err) {
        responseBox.innerHTML = `<div class="bg-red-100 text-red-800 p-3 rounded">❌ Network error: ${err.message}</div>`;
      }
    });
  }, 100);

  return section;
}
