/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FAAC01",
        'primary-hover': "#fab41a",
        secondary: "#875933",
        'secondary-hover': "#6F4A2D",
        'font-color': "#333333",
        'font-color-light': "#645F5F",
        'input-color': "#F9F9F9",
        'ingredient-background': "#F2EEE9",
      },
      screens: {
        '3xl': '2560px',
        'xs': '400px'
      }
    },
  },
  plugins: [],
}