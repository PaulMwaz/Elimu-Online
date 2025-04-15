export function AdminPanel() {
  const section = document.createElement("section");
  section.className = "container py-12";

  section.innerHTML = `
      <h1 class="text-3xl font-bold text-secondary mb-6 text-center">Admin Panel</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
          <h3 class="font-semibold mb-2">Upload Resources</h3>
          <p class="text-sm text-gray-500 dark:text-gray-300">Add notes, exams, and other files.</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
          <h3 class="font-semibold mb-2">Manage Users</h3>
          <p class="text-sm text-gray-500 dark:text-gray-300">View and edit user accounts.</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
          <h3 class="font-semibold mb-2">View Statistics</h3>
          <p class="text-sm text-gray-500 dark:text-gray-300">Monitor resource downloads and usage.</p>
        </div>
      </div>
    `;

  return section;
}
