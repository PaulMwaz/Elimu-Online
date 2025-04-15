export function About() {
  const section = document.createElement("section");
  section.className = "container py-12 text-center";

  section.innerHTML = `
      <h1 class="text-3xl font-bold mb-4 text-secondary">About Elimu-Online</h1>
      <p class="text-lg max-w-xl mx-auto text-gray-700 dark:text-gray-300">
        Elimu-Online is a digital learning platform designed to empower students and teachers
        by offering accessible, curriculum-aligned resources. We believe in the power of technology
        to make education inclusive, engaging, and effective.
      </p>
    `;

  return section;
}
