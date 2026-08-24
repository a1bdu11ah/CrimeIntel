/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Rajdhani'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        navy: {
          950: "#020B18",
          900: "#041526",
          800: "#072038",
          700: "#0C3057",
          600: "#124A84",
        },
        steel: {
          400: "#94A9C4",
          300: "#B8CCDE",
          200: "#D6E4F0",
          100: "#EBF3FA",
        },
        crimson: {
          600: "#C0152A",
          500: "#E01A32",
          400: "#F03049",
        },
      },
    },
  },
  plugins: [],
};

