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
        brand: {
          50: "#FFF8F0",
          100: "#FFEFD6",
          200: "#FFDBA8",
          300: "#FFC270",
          400: "#FFA53A",
          500: "#FF8C0A",
          600: "#E07000",
          700: "#B85400",
          800: "#8F4100",
          900: "#6B3100",
        },
        dog: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          500: "#F97316",
          600: "#EA580C",
        },
        cat: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          500: "#8B5CF6",
          600: "#7C3AED",
        },
        surface: "#FAFAF8",
        muted: "#6B7280",
        "muted-dark": "#374151",
        border: "#E5E7EB",
      },
      fontFamily: {
        sans: ["Assistant", "Inter", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
