// 📁 src/pages/ResourceCategoryPage.js

export function ResourceCategoryPage(level = "", category = "") {
  const section = document.createElement("section");
  section.className = "container py-10 px-4 mx-auto";

  if (!level || !category) {
    // Show resource levels selection (default landing page)
    section.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto mt-12">
        <div class="resource-card h-32 bg-white rounded-lg shadow cursor-pointer flex items-center justify-center text-xl font-semibold text-blue-700" data-level="primary">
          Primary School Resources
        </div>
        <div class="resource-card h-32 bg-white rounded-lg shadow cursor-pointer flex items-center justify-center text-xl font-semibold text-green-700" data-level="highschool">
          High School Resources
        </div>
      </div>
    `;

    setTimeout(() => {
      section.querySelectorAll(".resource-card").forEach((card) => {
        card.addEventListener("click", () => {
          const level = card.getAttribute("data-level");
          history.pushState({}, "", `/resources/${level}`);
          window.dispatchEvent(new Event("popstate"));
        });
      });
    }, 50);

    return section;
  }

  // If level & category are provided, show the title and dummy resources
  const title = `${
    level === "primary" ? "Primary School" : "High School"
  } ${capitalize(category)}`;

  const heading = document.createElement("h2");
  heading.className = "text-center text-2xl font-bold text-blue-700 mb-8";
  heading.textContent = title;
  section.appendChild(heading);

  const grid = document.createElement("div");
  grid.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";

  // TODO: Replace with real backend fetch
  const dummyResources = [
    { title: "Math Notes - Term 1", url: "#" },
    { title: "English Revision", url: "#" },
    { title: "Science - Grade 6", url: "#" },
  ];

  dummyResources.forEach((res) => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 shadow rounded hover:shadow-md transition";

    card.innerHTML = `
      <h3 class="font-semibold text-lg mb-2">${res.title}</h3>
      <a href="${res.url}" class="text-blue-500 hover:underline">Download</a>
    `;

    grid.appendChild(card);
  });

  section.appendChild(grid);
  return section;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
