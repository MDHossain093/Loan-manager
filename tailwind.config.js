/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        accent: "#22C55E",
        danger: "#EF4444",
        surface: "#0F172A",
      },
    },
  },
  plugins: [],
};
