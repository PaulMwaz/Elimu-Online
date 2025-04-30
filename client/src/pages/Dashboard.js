export function Dashboard() {
  const section = document.createElement("section");
  section.className = "container mx-auto py-12 px-6";

  section.innerHTML = `
      <h1 class="text-3xl font-bold text-center text-blue-700 mb-10">Admin Dashboard</h1>
  
      <!-- KPI Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        ${kpiCard("📁", "Files Uploaded", "128")}
        ${kpiCard("👥", "Users Registered", "42")}
        ${kpiCard("💵", "Revenue Earned", "Ksh 15,000")}
        ${kpiCard("📚", "Resources Available", "350")}
      </div>
  
      <!-- Recent Files -->
      <div class="bg-white shadow rounded-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-blue-600 mb-4">Recent Uploaded Files</h2>
        <ul class="space-y-2 text-gray-700">
          <li>Form 2 Chemistry Term 1 Notes.pdf <span class="text-xs text-gray-400">(Today)</span></li>
          <li>PP2 English Activities Term 2.pdf <span class="text-xs text-gray-400">(2 days ago)</span></li>
          <li>Grade 7 Mathematics Term 3 Test.pdf <span class="text-xs text-gray-400">(3 days ago)</span></li>
        </ul>
      </div>
  
      <!-- Quick Actions -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold text-blue-600 mb-4">Quick Actions</h2>
        <div class="flex flex-wrap gap-4">
          <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">➕ Upload New Resource</button>
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">👤 View Users</button>
        </div>
      </div>
    `;

  return section;
}

function kpiCard(icon, title, value) {
  return `
      <div class="bg-white shadow rounded-lg p-6 text-center">
        <div class="text-4xl mb-2">${icon}</div>
        <div class="text-lg font-semibold text-gray-700">${title}</div>
        <div class="text-2xl font-bold text-blue-700 mt-2">${value}</div>
      </div>
    `;
}
