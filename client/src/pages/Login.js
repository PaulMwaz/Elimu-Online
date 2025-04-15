export function Login() {
  const section = document.createElement("section");
  section.className = "container py-12 text-center";

  section.innerHTML = `
    <h1 class="text-3xl font-bold text-secondary mb-4">Login to Elimu-Online</h1>
    <p class="text-gray-700 dark:text-gray-300 mb-6">Access premium resources by logging in.</p>
    <div class="max-w-sm mx-auto">
      <input type="email" placeholder="Email" class="w-full mb-4 p-2 border rounded" />
      <input type="password" placeholder="Password" class="w-full mb-4 p-2 border rounded" />
      <button class="btn w-full">Login</button>
    </div>
  `;

  return section;
}
