// 📁 src/components/WhyChooseUs.js
export function WhyChooseUs() {
  const section = document.createElement("section");
  section.className = "py-12 bg-white";

  section.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Why Choose Elimu-Online</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-gray-50 p-6 rounded shadow text-center">
            <div class="text-4xl mb-2">💸</div>
            <h4 class="font-semibold text-lg mb-1">Affordable Access</h4>
            <p class="text-sm text-gray-600">Free and low-cost resources accessible to all learners and schools.</p>
          </div>
          <div class="bg-gray-50 p-6 rounded shadow text-center">
            <div class="text-4xl mb-2">📘</div>
            <h4 class="font-semibold text-lg mb-1">Curriculum-Aligned</h4>
            <p class="text-sm text-gray-600">Content developed and reviewed with the Kenyan curriculum in mind.</p>
          </div>
          <div class="bg-gray-50 p-6 rounded shadow text-center">
            <div class="text-4xl mb-2">📱</div>
            <h4 class="font-semibold text-lg mb-1">Mobile Friendly</h4>
            <p class="text-sm text-gray-600">Learn anytime, anywhere—optimized for phones, tablets, and desktops.</p>
          </div>
        </div>
      </div>
    `;
  return section;
}
