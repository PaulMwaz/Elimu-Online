// ✅ Fixed ResourceCategoryPage.js with FileModal async call handled
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
  const forms = ["Form 2", "Form 3", "Form 4"];
  const terms = ["Term 1", "Term 2", "Term 3"];
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
    terms.forEach((term) => {
      renderSubjectGrid(section, form, term, subjects, "highschool", category);
    });
  });
}

function renderPrimaryContent(section, category) {
  const levels = {
    "Grade 1": ["Mathematics", "English", "Kiswahili", "Science", "CRE"],
    "Grade 2": ["Mathematics", "English", "Kiswahili", "Science", "CRE"],
    "Grade 3": ["Mathematics", "English", "Kiswahili", "Science", "CRE"],
    "Grade 4": ["Mathematics", "English", "Kiswahili", "Science", "CRE"],
    "Grade 5": ["Mathematics", "English", "Kiswahili", "Science", "CRE"],
    "Grade 6": ["Mathematics", "English", "Kiswahili", "Science", "CRE"],
    "Grade 7": ["Mathematics", "English", "Kiswahili", "Science", "CRE"],
    "Grade 8": ["Mathematics", "English", "Kiswahili", "Science", "CRE"],
    "Grade 9": ["Mathematics", "English", "Kiswahili", "Science", "CRE"],
  };

  Object.entries(levels).forEach(([grade, subjects]) => {
    ["Term 1", "Term 2", "Term 3"].forEach((term) => {
      renderSubjectGrid(section, grade, term, subjects, "primary", category);
    });
  });
}

function renderSubjectGrid(section, form, term, subjects, level, category) {
  const title = document.createElement("h3");
  title.className = "text-xl font-semibold mb-4 mt-8";
  title.textContent = `${form} ${capitalize(category)} - ${term}`;
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
        // ✅ Correct async call without appendChild
        FileModal(
          subject,
          form.toLowerCase().replace(" ", ""),
          category,
          term.toLowerCase().replace(/\s+/g, ""),
          () => {}
        );
      }
    });

    card.innerHTML = `<h4 class="font-semibold text-lg mb-2">${subject}</h4>`;
    card.appendChild(viewBtn);
    grid.appendChild(card);
  });

  section.appendChild(grid);
}
