(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const t of a)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(a){const t={};return a.integrity&&(t.integrity=a.integrity),a.referrerPolicy&&(t.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?t.credentials="include":a.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(a){if(a.ep)return;a.ep=!0;const t=i(a);fetch(a.href,t)}})();function u(){const e=document.createElement("nav");return e.className="bg-secondary text-white px-6 py-4 flex justify-between items-center shadow",e.innerHTML=`
    <div class="text-lg font-bold">Elimu-Online</div>

    <ul class="hidden md:flex gap-6 items-center text-sm font-medium">
      <li><a href="/" data-link class="hover:text-blue-200 transition">Home</a></li>
      <li><a href="/about" data-link class="hover:text-blue-200 transition">About</a></li>
      <li><a href="/resources" data-link class="hover:text-blue-200 transition">Resources</a></li>
      <li><a href="/login" data-link class="hover:text-blue-200 transition">Login</a></li>
      <li>
        <a href="/register" data-link class="bg-white text-secondary font-semibold px-4 py-1.5 rounded hover:bg-blue-200 transition">
          Register
        </a>
      </li>
    </ul>

    <!-- Mobile menu toggle (optional for future upgrade) -->
    <div class="md:hidden">
      <button id="menuToggle" class="focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-white" viewBox="0 0 24 24">
          <path d="M4 5h16M4 12h16M4 19h16" />
        </svg>
      </button>
    </div>
  `,setTimeout(()=>{e.querySelectorAll("[data-link]").forEach(i=>{i.addEventListener("click",o=>{o.preventDefault();const a=i.getAttribute("href");history.pushState({},"",a),window.dispatchEvent(new Event("popstate"))})})},0),e}function g(){const e=document.createElement("footer");return e.className="bg-gray-900 text-white mt-16",e.innerHTML=`
    <div class="max-w-7xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
      <div class="md:col-span-2">
        <h4 class="font-bold text-lg mb-2">Elimu-Online</h4>
        <p class="text-sm">Empowering students and teachers with quality, curriculum-aligned resources.</p>
        <div class="flex gap-4 mt-4">
          <a href="https://facebook.com" target="_blank" class="hover:text-blue-400 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M22,12A10,10 0 1,0 12,22A10,10 0 0,0 22,12M12.5,19V13.5H15L15.5,11H12.5V9.5C12.5,8.67 12.83,8 14,8H15.5V6.13C15.22,6.09 14.23,6 13.09,6C10.91,6 9.5,7.17 9.5,9.36V11H7.5V13.5H9.5V19H12.5Z"/>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" class="hover:text-blue-300 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.25 4.25 0 001.88-2.34c-.83.5-1.75.85-2.72 1.05a4.25 4.25 0 00-7.29 3.88A12.06 12.06 0 013 4.67a4.25 4.25 0 001.31 5.67 4.24 4.24 0 01-1.93-.53v.05a4.25 4.25 0 003.41 4.17 4.29 4.29 0 01-1.92.07 4.25 4.25 0 003.96 2.94A8.53 8.53 0 012 18.58a12.05 12.05 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2v-.56A8.64 8.64 0 0022.46 6z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" class="hover:text-blue-500 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.3 17.1V10.6H5.9V17.1H8.3M7.1 9.5A1.3 1.3 0 1 0 7.1 6.9A1.3 1.3 0 0 0 7.1 9.5M18.1 17.1V13.2C18.1 11.5 17.5 10.5 16 10.5C15.1 10.5 14.5 11.1 14.2 11.6H14.2V10.6H11.9C11.9 11.4 11.9 17.1 11.9 17.1H14.3V13.3C14.3 12.7 14.4 12.1 15.2 12.1C15.9 12.1 16 12.7 16 13.4V17.1H18.1Z"/>
            </svg>
          </a>
        </div>
      </div>

      <div>
        <h4 class="font-semibold mb-2">Reach Us</h4>
        <div class="flex gap-4 mt-2">
          <a href="https://wa.me/254700000000" target="_blank" class="hover:text-green-400 transition">
            <img src="/images/whatsapp.svg" alt="WhatsApp" class="h-5 w-5" />
          </a>
          <a href="https://t.me/yourtelegram" target="_blank" class="hover:text-blue-400 transition">
            <img src="/images/telegram.svg" alt="Telegram" class="h-5 w-5" />
          </a>
        </div>
      </div>

      <div>
        <h4 class="font-semibold mb-2">Quick Links</h4>
        <ul class="space-y-1 text-sm">
          <li><a href="/" class="hover:underline transition">Home</a></li>
          <li><a href="/about" class="hover:underline transition">About</a></li>
          <li><a href="/resources" class="hover:underline transition">Resources</a></li>
          <li><a href="/login" class="hover:underline transition">Login</a></li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold mb-2">Get Involved</h4>
        <ul class="space-y-1 text-sm">
          <li><a href="#" class="hover:underline transition">Become a Partner</a></li>
          <li><a href="#" class="hover:underline transition">Contribute Content</a></li>
          <li><a href="#" class="hover:underline transition">Volunteer</a></li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold mb-2">Contact</h4>
        <p class="text-sm">Email: info@elimu-online.org</p>
        <p class="text-sm">Phone: +254 700 000 000</p>
      </div>
    </div>

    <div class="bg-gray-800 text-center text-sm py-3">
      © 2025 Elimu-Online. All rights reserved.
    </div>
  `,e}function h(){const e=document.createElement("section");return e.className="relative w-full h-[300px] md:h-[500px] overflow-hidden",e.innerHTML=`
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
  `,e}function p(){const e=document.createElement("section");return e.className="py-12 bg-white dark:bg-gray-900",e.innerHTML=`
    <div class="max-w-7xl mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-8">Meet the Team</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        ${[{img:"team1.jpg",name:"Kevin Ochieng",role:"Lead Frontend Developer"},{img:"team2.jpg",name:"Anita Njeri",role:"Head of Design"},{img:"team3.jpg",name:"Collins Mutua",role:"Backend & DevOps Engineer"}].map(s=>`
              <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow text-center transition duration-300">
                <img src="/images/${s.img}" alt="${s.name}" class="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-2 border-secondary" />
                <h4 class="text-lg font-semibold text-gray-800 dark:text-white">${s.name}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">${s.role}</p>
              </div>
            `).join("")}
      </div>
    </div>
  `,e}function x(){const e=document.createElement("section");return e.className="bg-gray-50 py-10",e.innerHTML=`
    <div class="max-w-7xl mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-8 text-gray-800">What Our Users Say</h2>
      <div class="flex overflow-x-auto gap-4 px-2 sm:px-4 snap-x snap-mandatory justify-center">
        ${[{name:"Liam Otieno",img:"/images/test1.jpg",text:"As a young learner, I love how simple and colorful this platform is. Learning is now fun!"},{name:"Grace Mwikali",img:"/images/test2.jpg",text:"As a teacher, Elimu-Online makes it easy to share and access curriculum-aligned content."},{name:"Brian Muthomi",img:"/images/test3.jpg",text:"Elimu-Online gave me the confidence to revise for exams with the best digital resources."}].map(s=>`
          <div class="flex-none w-80 bg-white p-6 rounded-lg shadow snap-center transition duration-300 text-center">
            <img src="${s.img}" alt="${s.name}" class="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-secondary">
            <h4 class="font-semibold text-lg">${s.name}</h4>
            <p class="text-sm text-gray-600 mt-2">"${s.text}"</p>
          </div>
        `).join("")}
      </div>
    </div>
  `,e}function f(){const e=document.createElement("section");return e.className="bg-white dark:bg-gray-900 py-12",e.innerHTML=`
      <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 class="text-3xl font-bold text-secondary mb-4">About Us</h2>
          <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Empowering Learners Everywhere
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            Elimu-Online provides curriculum-aligned digital content for students and educators. 
            We believe access to quality education is a right, not a privilege. Our goal is to bridge 
            the gap with free and premium learning resources tailored for Kenya's Primary and Secondary learners.
          </p>
          <a href="/about" class="inline-block bg-secondary text-white px-6 py-2 rounded hover:bg-blue-700 transition">Learn More</a>
        </div>
        <div>
          <img src="/images/about.jpg" alt="About Elimu-Online" class="rounded-lg shadow-md w-full h-auto object-cover" />
        </div>
      </div>
    `,e}function b(){const e=document.createElement("section");return e.className="py-12 bg-white",e.innerHTML=`
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
    `,e}function v(){const e=document.createElement("section");return e.className="relative bg-light py-20 text-center bg-cover bg-center",e.style.backgroundImage="url('/images/impact-bg.jpg')",e.innerHTML=`
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-gray-900 mb-12">Our Impact</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <div class="flex flex-col items-center">
          <div class="relative w-24 h-24">
            <svg class="w-full h-full transform rotate-[-90deg]">
              <circle cx="48" cy="48" r="40" stroke="#e5e7eb" stroke-width="10" fill="none" />
              <circle class="progress-ring" cx="48" cy="48" r="40" stroke="#2563eb" stroke-width="10" fill="none" stroke-dasharray="251.2" stroke-dashoffset="251.2" />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center text-blue-600 text-xl font-bold count" data-target="10000">0</div>
          </div>
          <div class="text-3xl mt-2">👨‍🎓</div>
          <p class="text-gray-700 font-medium mt-2">Students Served</p>
        </div>

        <div class="flex flex-col items-center">
          <div class="relative w-24 h-24">
            <svg class="w-full h-full transform rotate-[-90deg]">
              <circle cx="48" cy="48" r="40" stroke="#e5e7eb" stroke-width="10" fill="none" />
              <circle class="progress-ring" cx="48" cy="48" r="40" stroke="#2563eb" stroke-width="10" fill="none" stroke-dasharray="251.2" stroke-dashoffset="251.2" />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center text-blue-600 text-xl font-bold count" data-target="500">0</div>
          </div>
          <div class="text-3xl mt-2">🧑‍🏫</div>
          <p class="text-gray-700 font-medium mt-2">Teachers Supported</p>
        </div>

        <div class="flex flex-col items-center">
          <div class="relative w-24 h-24">
            <svg class="w-full h-full transform rotate-[-90deg]">
              <circle cx="48" cy="48" r="40" stroke="#e5e7eb" stroke-width="10" fill="none" />
              <circle class="progress-ring" cx="48" cy="48" r="40" stroke="#2563eb" stroke-width="10" fill="none" stroke-dasharray="251.2" stroke-dashoffset="251.2" />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center text-blue-600 text-xl font-bold count" data-target="2000">0</div>
          </div>
          <div class="text-3xl mt-2">📚</div>
          <p class="text-gray-700 font-medium mt-2">Resources Available</p>
        </div>
      </div>

      <div class="mt-12">
        <h3 class="text-lg font-semibold text-gray-800">Join our growing community today!</h3>
        <a href="/register" class="mt-3 inline-block bg-secondary text-white px-6 py-2 rounded hover:bg-blue-700 transition">Get Started</a>
      </div>
    </div>
  `,setTimeout(()=>{const s=e.querySelectorAll(".count"),i=e.querySelectorAll(".progress-ring");s.forEach((o,a)=>{const t=+o.getAttribute("data-target"),n=i[a];let r=0;const l=Math.ceil(t/80),c=251.2,d=()=>{r+=l,r>=t&&(r=t),o.innerText=r.toLocaleString();const m=c-r/t*c;n.setAttribute("stroke-dashoffset",m),r<t&&setTimeout(d,30)};d()})},300),e}function y(){const e=document.createElement("div");return e.appendChild(h()),e.appendChild(b()),e.appendChild(v()),e.appendChild(f()),e.appendChild(x()),e.appendChild(p()),e}function w(){const e=document.createElement("section");return e.className="container py-12 text-center",e.innerHTML=`
      <h1 class="text-3xl font-bold mb-4 text-secondary">About Elimu-Online</h1>
      <p class="text-lg max-w-xl mx-auto text-gray-700 dark:text-gray-300">
        Elimu-Online is a digital learning platform designed to empower students and teachers
        by offering accessible, curriculum-aligned resources. We believe in the power of technology
        to make education inclusive, engaging, and effective.
      </p>
    `,e}function k(){const e=document.createElement("section");return e.className="container py-12 text-center",e.innerHTML=`
    <h1 class="text-3xl font-bold text-secondary mb-4">Login to Elimu-Online</h1>
    <p class="text-gray-700 dark:text-gray-300 mb-6">Access premium resources by logging in.</p>
    <div class="max-w-sm mx-auto">
      <input type="email" placeholder="Email" class="w-full mb-4 p-2 border rounded" />
      <input type="password" placeholder="Password" class="w-full mb-4 p-2 border rounded" />
      <button class="btn w-full">Login</button>
    </div>
  `,e}function E(){const e=document.createElement("section");return e.className="container py-12 text-center",e.innerHTML=`
      <h1 class="text-3xl font-bold text-secondary mb-4">Create Your Account</h1>
      <p class="text-gray-700 dark:text-gray-300 mb-6">Join Elimu-Online to access learning materials.</p>
      <div class="max-w-sm mx-auto">
        <input type="text" placeholder="Full Name" class="w-full mb-4 p-2 border rounded" />
        <input type="email" placeholder="Email" class="w-full mb-4 p-2 border rounded" />
        <input type="password" placeholder="Password" class="w-full mb-4 p-2 border rounded" />
        <button class="btn w-full">Register</button>
      </div>
    `,e}function L(){const e=document.createElement("section");return e.className="container py-12 text-center",e.innerHTML=`
      <h1 class="text-3xl font-bold text-secondary mb-4">Student Dashboard</h1>
      <p class="text-gray-700 dark:text-gray-300">
        Welcome back! Access your resources, progress, and updates from here.
      </p>
    `,e}function M(){const e=document.createElement("section");return e.className="container py-12",e.innerHTML=`
      <h1 class="text-3xl font-bold text-secondary mb-6 text-center">Admin Panel</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
          <h3 class="font-semibold mb-2">Upload Resources</h3>
          <p class="text-sm text-gray-500 dark:text-gray-300">Add notes, exams, and other files.</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
          <h3 class="font-semibold mb-2">Manage Users</h3>
          <p class="text-sm text-gray-500 dark:text-gray-300">View and edit user accounts.</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
          <h3 class="font-semibold mb-2">View Statistics</h3>
          <p class="text-sm text-gray-500 dark:text-gray-300">Monitor resource downloads and usage.</p>
        </div>
      </div>
    `,e}function A(){const e=document.createElement("section");return e.className="container py-12",e.innerHTML=`
      <h1 class="text-3xl font-bold text-secondary mb-6 text-center">Browse Resources</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[1,2,3,4,5,6].map(s=>`
          <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h4 class="text-lg font-semibold mb-2">Resource ${s}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">Sample description of resource ${s}.</p>
            <button class="btn mt-3 w-full">Download</button>
          </div>
        `).join("")}
      </div>
    `,e}window.addEventListener("DOMContentLoaded",()=>{console.log("✅ DOM loaded. Initializing app...");const e=document.getElementById("app");if(!e){console.error("❌ #app container not found in index.html");return}document.body.classList.add("flex","flex-col","min-h-screen","bg-light","text-textMain"),e.classList.add("flex-grow");const s=u();document.body.insertBefore(s,e);function i(){const t=window.location.pathname;switch(e.innerHTML="",t){case"/":case"/home":e.appendChild(y());break;case"/about":e.appendChild(w());break;case"/login":e.appendChild(k());break;case"/register":e.appendChild(E());break;case"/dashboard":e.appendChild(L());break;case"/admin":e.appendChild(M());break;case"/resources":e.appendChild(A());break;default:e.innerHTML='<div class="text-center py-20 text-red-600 text-xl">404 - Page Not Found</div>'}const n=document.querySelector("footer");n&&n.remove();const r=g();document.body.appendChild(r),o(),a()}function o(){const t=document.getElementById("darkToggle"),n=document.documentElement;t&&t.addEventListener("change",()=>{n.classList.toggle("dark",t.checked)})}function a(){const t=document.getElementById("main-footer");if(!t)return;const n=new IntersectionObserver(r=>{r.forEach(l=>{l.isIntersecting&&(t.classList.add("visible"),n.unobserve(t))})},{threshold:.1});n.observe(t)}i(),window.addEventListener("popstate",i)});
