export function ResourcePage() {
  const section = document.createElement("section");
  section.className = "container py-12";

  section.innerHTML = `
      <h1 class="text-3xl font-bold text-secondary mb-6 text-center">Browse Resources</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[1, 2, 3, 4, 5, 6]
          .map(
            (i) => `
          <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h4 class="text-lg font-semibold mb-2">Resource ${i}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">Sample description of resource ${i}.</p>
            <button class="btn mt-3 w-full">Download</button>
          </div>
        `
          )
          .join("")}
      </div>
    `;

  return section;
}
