// 📁 src/components/FileCard.js

export function FileCard(resource) {
  const card = document.createElement("div");
  card.className = "bg-white p-4 shadow rounded hover:shadow-md transition";

  card.innerHTML = `
      <h3 class="font-semibold text-lg mb-2">${resource.title}</h3>
      <a href="${resource.url}" class="text-blue-500 hover:underline">Download</a>
    `;

  return card;
}
