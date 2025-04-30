/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable dark mode via class strategy
  content: [
    "./index.html",
    "./src/**/*.{js,html}", // Scan all JS/HTML inside src folder
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F2937", // Navbar, sidebar backgrounds
        secondary: "#2563EB", // Blue accents (buttons, highlights)
        accent: "#3B82F6", // CTA and hover accents
        light: "#F9FAFB", // General background
        surface: "#FFFFFF", // Card and container backgrounds
        textMain: "#111827", // Default text
        darkbg: "#111827", // Deep footer/nav areas
        muted: "#6B7280", // Secondary/subtext color
      },
    },
  },
  plugins: [],
};
