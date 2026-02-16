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
        // Improved contrast palette - better readability
        bg: { DEFAULT: "#F9FAFB", light: "#F3F4F6", warm: "#F5F5F5" },
        surface: { DEFAULT: "#E5E7EB", light: "#F3F4F6", hover: "#D1D5DB" },
        card: { DEFAULT: "#FFFFFF", hover: "#F9FAFB", border: "#E5E7EB" },
        // Accent — warm sage/teal green
        accent: {
          DEFAULT: "#5CB8A4",
          50: "#0F2922",
          100: "#15372E",
          200: "#1D5046",
          300: "#28725F",
          400: "#3A9C85",
          500: "#5CB8A4",
          600: "#7CCBB8",
          700: "#A3DDD0",
          800: "#C8ECE4",
          900: "#E8F7F3",
        },
        // Text layers - high contrast for readability
        text: {
          primary: "#111827",
          secondary: "#4B5563",
          muted: "#9CA3AF",
          inverse: "#FFFFFF",
        },
        // Semantic
        border: { DEFAULT: "#E5E7EB", light: "#F3F4F6" },
        // Pet categories
        dog: { bg: "#251E14", text: "#E8A44A", accent: "#D4933A" },
        cat: { bg: "#1C1826", text: "#B48AE8", accent: "#9B6FD9" },
      },
      fontFamily: {
        sans: ["Assistant", "Inter", "sans-serif"],
      },
      fontSize: {
        "heading-hero": ["2.75rem", { lineHeight: "1.15", fontWeight: "800" }],
        "heading-xl": ["2rem", { lineHeight: "1.2", fontWeight: "800" }],
        "heading-lg": ["1.5rem", { lineHeight: "1.25", fontWeight: "700" }],
        "heading-md": ["1.25rem", { lineHeight: "1.3", fontWeight: "700" }],
        "body-lg": ["1.125rem", { lineHeight: "1.65" }],
        "body": ["1rem", { lineHeight: "1.65" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
