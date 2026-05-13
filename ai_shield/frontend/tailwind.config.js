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
          DEFAULT: "#0D47A1",
          light: "#1565C0",
        },
        surface: "#F0F4FF",
        card: "#FFFFFF",
        dark: "#0A2540",
        muted: "#546E7A",
        success: {
          bg: "#D4EDDA",
          text: "#1B5E20",
        },
        warning: {
          bg: "#FFF3E0",
          text: "#E65100",
        },
        danger: {
          bg: "#FFEBEE",
          text: "#B71C1C",
        },
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
        badge: "6px",
      },
      boxShadow: {
        card: "0 2px 16px rgba(13, 71, 161, 0.10)",
      },
    },
  },
  plugins: [],
}
