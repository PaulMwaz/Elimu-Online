import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export function WhyChooseUs() {
  const section = document.createElement("section");
  section.className = "py-12 bg-white";

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Elimu-Online</h2>
      <div class="swiper mySwiper">
        <div class="swiper-wrapper">
          ${[
            {
              title: "Curriculum-Aligned Resources",
              text: "All content is reviewed and structured in line with the Kenyan CBC and 8-4-4 curriculum.",
              icon: "/icons/whychoose/curriculum.png",
            },
            {
              title: "Free & Premium Downloads",
              text: "Access a wide range of free and affordable Notes, Exams, Schemes, and Lesson Plans.",
              icon: "/icons/whychoose/download.png",
            },
            {
              title: "For Teachers & Students",
              text: "Designed for both teachers creating content and students preparing for exams.",
              icon: "/icons/whychoose/teacher.png",
            },
            {
              title: "Primary & High School Resources",
              text: "Comprehensive content tailored to each education level.",
              icon: "/icons/whychoose/school.png",
            },
            {
              title: "Device-Friendly Platform",
              text: "Access Elimu-Online anytime on mobile, tablet, or desktop.",
              icon: "/icons/whychoose/mobile.png",
            },
            {
              title: "Quality You Can Trust",
              text: "Every upload is vetted for quality, relevance and clarity.",
              icon: "/icons/whychoose/shield.png",
            },
          ]
            .map(
              (card) => `
            <div class="swiper-slide">
              <div class="bg-white p-6 rounded-lg shadow-md text-center max-w-sm mx-auto h-full flex flex-col items-center justify-center">
                <img src="${card.icon}" alt="${card.title}" class="w-16 h-16 mb-4 object-contain" />
                <h4 class="text-lg font-semibold text-gray-800 mb-2">${card.title}</h4>
                <p class="text-sm text-gray-700">${card.text}</p>
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Pagination and Navigation -->
        <div class="swiper-pagination mt-4"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>
  `;

  // Initialize Swiper
  setTimeout(() => {
    new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
  }, 0);

  return section;
}
