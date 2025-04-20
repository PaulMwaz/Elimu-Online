export function DashboardLayout(contentFn, titleText = "") {
  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-col md:flex-row min-h-screen";

  // 🔥 DO NOT render sidebar here — already handled in index.js

  // Content area (adjusted for sidebar)
  const content = document.createElement("div");
  content.className = "flex-grow p-4 md:ml-64";

  // Optional dynamic title
  if (titleText) {
    const title = document.createElement("h1");
    title.className = "text-2xl font-bold text-secondary mb-4";
    title.textContent = titleText;
    content.appendChild(title);
  }

  // Inject page content
  content.appendChild(contentFn());

  // No toggle button or duplicate sidebar added here
  wrapper.appendChild(content);

  return wrapper;
}
