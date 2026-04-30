/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    colors: {
      surface: "#0F172A",
      card: "#1E293B",
      borderSubtle: "#334155",
      textPrimary: "#E2E8F0",
      textSecondary: "#94A3B8",
      primary: "#3B82F6",
      danger: "#EF4444",
    },
  },
  },
  plugins: [],
}