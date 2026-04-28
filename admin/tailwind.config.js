/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        // 🎯 Base Colors
        background: "#0D0D0D",
        surface: "#111111",
        card: "#151515",

        // 🎨 Brand Colors
        primary: "#FF7A18",
        primarySoft: "#FFB347",

        // 📝 Text Colors
        textPrimary: "#FFFFFF",
        textSecondary: "#A1A1AA",

        // 🚦 Status Colors
        success: "#22C55E",
        warning: "#3B82F6",
        danger: "#EF4444",

        // 🔲 Borders
        borderSubtle: "rgba(255,255,255,0.05)",
      },

      backgroundImage: {
        // 🔥 Main Card Gradient
        cardGradient: "linear-gradient(145deg, #1A1A1A, #0F0F0F)",

        // ✨ Orange Glow Gradient
        primaryGradient: "linear-gradient(135deg, #FF7A18, #FFB347)",

        // Sidebar Active
        sidebarActive: "linear-gradient(90deg, rgba(255,122,24,0.2), transparent)",
      },

      boxShadow: {
        // 🔥 Glow Effects
        glow: "0 0 20px rgba(255, 122, 24, 0.15)",
        glowHover: "0 10px 30px rgba(255, 122, 24, 0.25)",

        // 🧊 Soft Card Shadow
        soft: "0 4px 20px rgba(0,0,0,0.5)",
      },

      borderRadius: {
        xl2: "16px",
      },

      backdropBlur: {
        glass: "10px",
      },

      transitionProperty: {
        smooth: "all",
      }

    },
  },
  plugins: [],
}