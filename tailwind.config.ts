import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F0F0F",
        surface: "#1A1A1A",
        card: "#1E1E1E",
        "card-hover": "#252525",
        border: "#2A2A2A",
        "border-light": "#333333",
        textPrimary: "#F5F5F5",
        textSecondary: "#A0A0A0",
        textMuted: "#707070",
        accent: {
          DEFAULT: "#2ABAA0",
          50: "#0D2E29",
          100: "#133D36",
          200: "#1A5550",
          300: "#1E7A72",
          400: "#24A393",
          500: "#2ABAA0",
          600: "#3DD4B9",
          700: "#6BE0CC",
          800: "#A0ECDF",
          900: "#D5F7F1",
        },
        dog: { 50: "#1F1508", 100: "#2D1F0C", 500: "#F97316", 600: "#FB923C" },
        cat: { 50: "#1A1528", 100: "#241E38", 500: "#8B5CF6", 600: "#A78BFA" },
      },
      fontFamily: {
        sans: ["Assistant", "Inter", "sans-serif"],
      },
      fontSize: {
        "heading-xl": ["2rem", { lineHeight: "1.2", fontWeight: "800" }],
        "heading-lg": ["1.75rem", { lineHeight: "1.25", fontWeight: "700" }],
        "heading-md": ["1.5rem", { lineHeight: "1.3", fontWeight: "700" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body": ["1rem", { lineHeight: "1.6" }],
      },
    },
  },
  plugins: [],
};
export default config;
