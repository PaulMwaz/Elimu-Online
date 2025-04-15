export function HeroSlider() {
  const section = document.createElement("section");
  section.className = "relative w-full h-[300px] md:h-[500px] overflow-hidden";

  section.innerHTML = `
    <div class="absolute inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center text-center">
      <h1 class="text-white text-2xl md:text-4xl lg:text-5xl font-bold px-4">
        Welcome to Elimu-Online<br/> Empowering Learners with Digital Resources
      </h1>
    </div>
    <div class="relative h-full w-full slider">
      <img src="/images/slide1.jpg" class="absolute w-full h-full object-cover slide opacity-100" />
      <img src="/images/slide2.jpg" class="absolute w-full h-full object-cover slide opacity-0" />
      <img src="/images/slide3.jpg" class="absolute w-full h-full object-cover slide opacity-0" />
    </div>
  `;

  return section;
}
