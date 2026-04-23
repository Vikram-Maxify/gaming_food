/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#A3D9A5",   // main green
          light: "#C7EAC9",
          dark: "#7BC47F",
        },
        secondary: {
          DEFAULT: "#F5F5F5",   // background
          dark: "#EAEAEA",
        },
        accent: {
          yellow: "#FFE58F",
          blue: "#A0C4FF",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "",
        },
        card: "#FFFFFF",
      },
      borderRadius: {
        xl2: "20px",
      },
    },
  },
  plugins: [],
};