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
        background: "#FFFFFF",
        foreground: "#000000",
        muted: "#555555",
        "muted-dark": "#333333",
        border: "#E5E5E5",
        accent: "#000000",
      },
      fontFamily: {
        sans: ["Assistant", "Inter", "Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
