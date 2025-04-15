export function Dashboard() {
  const section = document.createElement("section");
  section.className = "container py-12 text-center";

  section.innerHTML = `
      <h1 class="text-3xl font-bold text-secondary mb-4">Student Dashboard</h1>
      <p class="text-gray-700 dark:text-gray-300">
        Welcome back! Access your resources, progress, and updates from here.
      </p>
    `;

  return section;
}
