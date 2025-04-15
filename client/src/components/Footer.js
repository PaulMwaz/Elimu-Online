export function Footer() {
  const footer = document.createElement("footer");
  footer.className = "bg-gray-900 text-white mt-16";

  footer.innerHTML = `
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
  `;

  return footer;
}
