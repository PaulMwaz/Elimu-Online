import { HeroSlider } from "../components/HeroSlider.js";
import { MeetTeam } from "../components/MeetTeam.js";
import { Testimonials } from "../components/Testimonials.js";
import { AboutPreview } from "../components/AboutPreview.js";

export function Home() {
  const container = document.createElement("div");

  container.appendChild(HeroSlider());
  container.appendChild(AboutPreview());
  container.appendChild(Testimonials());
  container.appendChild(MeetTeam());

  return container;
}
