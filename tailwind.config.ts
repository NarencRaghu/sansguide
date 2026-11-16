import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f4f9",
          100: "#d9e2ef",
          200: "#b3c5df",
          300: "#8099c2",
          400: "#4d6ca3",
          500: "#2f4f82",
          600: "#1e3a6a",
          700: "#152b52",
          800: "#0f1f3d",
          900: "#0a1529",
        },
        teal: {
          50: "#edfafa",
          100: "#d2f3f2",
          200: "#a8e6e6",
          300: "#73d4d4",
          400: "#3bb8ba",
          500: "#1f9a9d",
          600: "#187b80",
          700: "#176267",
          800: "#184e53",
          900: "#164145",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      spacing: {
        "4.5": "1.125rem",
        "5.5": "1.375rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(15, 31, 61, 0.06), 0 1px 2px rgba(15, 31, 61, 0.04)",
        "card-hover": "0 10px 30px -12px rgba(15, 31, 61, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
