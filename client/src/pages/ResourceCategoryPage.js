import { FileModal } from "../components/FileModal.js";

export function ResourceCategoryPage(level = "", category = "") {
  const section = document.createElement("section");
  section.className = "container py-12 px-4 mx-auto";

  if (!level || !category) {
    section.innerHTML = `
      <h2 class="text-3xl font-bold text-center text-blue-800 mb-10">Resources</h2>
      <div class="text-center text-red-500 text-lg mt-6">
        ❌ Invalid resource category. Please use the sidebar to navigate.
      </div>`;
    return section;
  }

  const title = `${capitalize(level)} ${capitalize(category)}`;
  const heading = document.createElement("h2");
  heading.className = "text-3xl font-bold text-center text-blue-800 mb-10";
  heading.textContent = title;
  section.appendChild(heading);

  if (level === "highschool") {
    renderHighSchoolContent(section, category);
  } else if (level === "primary") {
    renderPrimaryContent(section, category);
  }

  return section;
}

function capitalize(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function renderHighSchoolContent(section, category) {
  const forms = ["form2", "form3", "form4"];
  const subjects = [
    "English",
    "Kiswahili",
    "Mathematics",
    "Chemistry",
    "Biology",
    "Physics",
    "History",
    "Geography",
    "CRE",
    "Computer Studies",
    "Home Science",
    "Agriculture",
    "Business Studies",
  ];

  forms.forEach((form) => {
    renderSubjectGrid(section, form, subjects, "highschool", category);
  });
}

function renderPrimaryContent(section, category) {
  const levels = {
    pp1_pp2: [
      "Environmental Activities",
      "Language Activities",
      "Psychomotor and Creative Activities",
      "Mathematical Activities",
      "Religious Education Activities",
    ],
    grade1: [
      "Mathematical Activities",
      "Literacy",
      "English Language Activities",
      "Hygiene and Nutrition Activities",
      "ICT",
      "Religious Education Activities",
      "Environmental Activities",
      "Movement and Creative Activities",
    ],
    grade2: [
      "Mathematical Activities",
      "Literacy",
      "English Language Activities",
      "Hygiene and Nutrition Activities",
      "ICT",
      "Religious Education Activities",
      "Environmental Activities",
      "Movement and Creative Activities",
    ],
    grade3: [
      "Mathematical Activities",
      "Literacy",
      "English Language Activities",
      "Hygiene and Nutrition Activities",
      "ICT",
      "Religious Education Activities",
      "Environmental Activities",
      "Movement and Creative Activities",
    ],
    grade4: [
      "English",
      "Mathematics",
      "Agriculture",
      "Social Studies",
      "Kiswahili",
      "Home Science",
      "Science and Technology",
      "Physical and Health Education",
      "CRE",
      "Creative Arts",
    ],
    grade5: [
      "English",
      "Mathematics",
      "Agriculture",
      "Social Studies",
      "Kiswahili",
      "Home Science",
      "Science and Technology",
      "Physical and Health Education",
      "CRE",
      "Creative Arts",
    ],
    grade6: [
      "English",
      "Mathematics",
      "Agriculture",
      "Social Studies",
      "Kiswahili",
      "Home Science",
      "Science and Technology",
      "Physical and Health Education",
      "CRE",
      "Creative Arts",
    ],
    grade7: [
      "Mathematics",
      "English",
      "Kiswahili",
      "Integrated Science",
      "Social Studies",
      "Agriculture",
      "CRE",
      "Health Education",
      "Life Skills Education",
      "Sports and Physical Education",
      "Business Studies",
    ],
    grade8: [
      "Mathematics",
      "English",
      "Kiswahili",
      "Integrated Science",
      "Social Studies",
      "Agriculture",
      "CRE",
      "Health Education",
      "Life Skills Education",
      "Sports and Physical Education",
      "Business Studies",
    ],
    grade9: [
      "Mathematics",
      "English",
      "Kiswahili",
      "Integrated Science",
      "Social Studies",
      "Agriculture",
      "CRE",
      "Health Education",
      "Life Skills Education",
      "Sports and Physical Education",
      "Business Studies",
    ],
  };

  Object.entries(levels).forEach(([grade, subjects]) => {
    renderSubjectGrid(section, grade, subjects, "primary", category);
  });
}

function renderSubjectGrid(section, groupTitle, subjects, level, category) {
  const title = document.createElement("h3");
  title.className = "text-xl font-semibold mb-4 mt-8";
  title.textContent = `${capitalize(groupTitle)} ${capitalize(category)}`;
  section.appendChild(title);

  const grid = document.createElement("div");
  grid.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6";

  subjects.forEach((subject) => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow hover:shadow-md transition";

    const viewBtn = document.createElement("a");
    viewBtn.href = "#";
    viewBtn.className = "text-blue-600 hover:underline mt-2 block";
    viewBtn.textContent = "View Files";
    viewBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!localStorage.getItem("user")) {
        alert("Please log in to access files.");
      } else {
        FileModal(subject, groupTitle.toLowerCase(), category, () => {});
      }
    });

    card.innerHTML = `<h4 class="font-semibold text-lg mb-2">${subject}</h4>`;
    card.appendChild(viewBtn);
    grid.appendChild(card);
  });

  section.appendChild(grid);
}
