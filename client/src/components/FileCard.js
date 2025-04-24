// components/FileCard.js
export function FileCard(file, onView, onDownload, onPay) {
  const card = document.createElement("div");
  card.className =
    "bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between border hover:shadow-lg transition p-4";

  const fileName = file.name || "Untitled";
  const filePages = file.pages || "13";
  const fileTerm = file.term?.toUpperCase() || "TERM1";
  const isPaid = parseFloat(file.price) > 0;
  const filePrice = isPaid ? `Ksh ${file.price}` : "Free";

  card.innerHTML = `
    <div class="flex items-center gap-3 mb-3">
      <img src="/assets/pdf-icon.png" alt="PDF" class="w-8 h-8" />
      <div>
        <h4 class="font-semibold text-base text-gray-800 truncate">${fileName}</h4>
        <p class="text-sm text-gray-500">${filePages} pages • PDF</p>
      </div>
    </div>

    <div class="text-sm text-gray-600 mt-2">
      Term: <strong class="text-gray-800">${fileTerm}</strong><br/>
      Price: <strong class="${
        isPaid ? "text-yellow-600" : "text-blue-700"
      }">${filePrice}</strong>
    </div>

    <div class="flex justify-between items-center gap-2 mt-4">
      <button class="bg-gray-200 hover:bg-gray-300 px-3 py-1 text-sm rounded" id="view-${fileName}">View</button>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm rounded" id="download-${fileName}">Download</button>
      ${
        isPaid
          ? `<button class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 text-sm rounded" id="pay-${fileName}">Pay Ksh ${file.price}</button>`
          : ""
      }
    </div>
  `;

  setTimeout(() => {
    document
      .getElementById(`view-${fileName}`)
      ?.addEventListener("click", () => onView(file));
    document
      .getElementById(`download-${fileName}`)
      ?.addEventListener("click", () => onDownload(file));
    if (isPaid) {
      document
        .getElementById(`pay-${fileName}`)
        ?.addEventListener("click", () => onPay(file));
    }
  }, 10);

  return card;
}
