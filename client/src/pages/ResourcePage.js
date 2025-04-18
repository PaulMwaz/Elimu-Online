export function ResourcePage() {
  const section = document.createElement("section");
  section.className = "container py-12";

  section.innerHTML = `
    <h1 class="text-3xl font-bold text-center text-secondary mb-6">Browse Resources</h1>

    <div class="flex justify-center mb-6">
      <select id="categorySelect" class="p-2 border rounded">
        <option value="primary">Primary</option>
        <option value="highschool">High School</option>
      </select>
    </div>

    <div id="fileCards" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
      <p class="col-span-full text-center text-gray-500">Loading files...</p>
    </div>
  `;

  const fileCards = section.querySelector("#fileCards");
  const categorySelect = section.querySelector("#categorySelect");

  async function loadFiles(category) {
    fileCards.innerHTML = `<p class="col-span-full text-center text-gray-500">Loading ${category} resources...</p>`;

    try {
      const res = await fetch(`http://localhost:5555/api/files/${category}`);
      const files = await res.json();

      if (!res.ok || files.error) {
        fileCards.innerHTML = `<p class="text-red-600 col-span-full text-center">❌ ${
          files.error || "Failed to fetch resources."
        }</p>`;
        return;
      }

      if (files.length === 0) {
        fileCards.innerHTML = `<p class="col-span-full text-center text-gray-500">No resources available in ${category} yet.</p>`;
        return;
      }

      fileCards.innerHTML = files
        .map(
          (file) => `
        <div class="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col justify-between">
          <div class="mb-2">
            <h4 class="text-base font-semibold text-gray-800 dark:text-white truncate">${file.name}</h4>
          </div>
          <div class="flex items-center gap-3">
            <img src="/images/file-icon.png" alt="File icon" class="h-8 w-8" />
            <a href="${file.url}" download class="btn px-3 py-1 text-sm">Download</a>
          </div>
        </div>
      `
        )
        .join("");
    } catch (error) {
      fileCards.innerHTML = `<p class="text-red-600 col-span-full text-center">❌ Error: ${error.message}</p>`;
    }
  }

  // Initial load
  loadFiles(categorySelect.value);

  categorySelect.addEventListener("change", () => {
    loadFiles(categorySelect.value);
  });

  return section;
}
