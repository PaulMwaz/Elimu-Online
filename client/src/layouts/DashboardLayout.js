export function DashboardLayout(contentFn, titleText = "") {
  const layout = document.createElement("div");
  layout.className = "flex flex-col md:flex-row min-h-screen";

  // Main content wrapper
  const main = document.createElement("main");
  main.className = "flex-grow p-4 md:ml-64";

  // Optional dynamic title
  if (titleText) {
    const title = document.createElement("h1");
    title.className = "text-2xl font-bold text-secondary mb-4";
    title.textContent = titleText;
    main.appendChild(title);
  }

  // Render content
  const content = contentFn();
  if (content instanceof HTMLElement) {
    main.appendChild(content);
  } else {
    console.error("❌ contentFn() did not return an HTMLElement.");
  }

  layout.appendChild(main);
  return layout;
}
