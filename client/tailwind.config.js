/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable dark mode via class strategy
  content: ["./index.html", "./src/**/*.{js,html}"],
  theme: {
    extend: {
      colors: {
        primary: "#1F2937", // Dark gray
        secondary: "#2563EB", // Blue accent
        light: "#F9FAFB", // Light background
        textMain: "#111827", // Primary text color
        darkbg: "#111827", // Optional darker background for footer/nav
      },
    },
  },
  plugins: [],
};
