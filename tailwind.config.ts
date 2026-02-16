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
        background: "#F5F5F5",
        card: "#FFFFFF",
        textPrimary: "#111111",
        textSecondary: "#555555",
        textMuted: "#666666",
        accent: {
          DEFAULT: "#2ABAA0",
          50: "#EEFBF8",
          100: "#D5F5EF",
          200: "#AAE9DD",
          300: "#6ED9C8",
          400: "#3DCBB5",
          500: "#2ABAA0",
          600: "#209585",
          700: "#1D776C",
          800: "#1B5E57",
          900: "#194E48",
        },
        dog: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          500: "#F97316",
          600: "#EA580C",
        },
        cat: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          500: "#8B5CF6",
          600: "#7C3AED",
        },
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
