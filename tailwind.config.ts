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
        // NEW: Nature-inspired Green & Blue palette
        primary: {
          green: "#2E8B57",      // Deep sea green
          blue: "#4682B4",        // Steel blue
          white: "#FFFFFF",       // Clean white
        },
        secondary: {
          lightGreen: "#90EE90",  // Light green
          softBlue: "#87CEEB",    // Sky blue
          cream: "#F8F8FF",       // Soft cream white
        },
        accent: {
          DEFAULT: "#2E8B57",     // Primary green
          forest: "#228B22",      // Forest green
          navy: "#191970",        // Navy blue
          mint: "#98FB98",        // Mint green
          50: "#F0F9F4",
          100: "#D9F2E5",
          200: "#A8E6C8",
          300: "#76D9AB",
          400: "#45CC8E",
          500: "#2E8B57",
          600: "#257046",
          700: "#1C5435",
          800: "#133823",
          900: "#0A1C12",
        },
        // Improved contrast palette
        bg: { DEFAULT: "#F8F8FF", light: "#FFFFFF", warm: "#F5F5F5" },
        surface: { DEFAULT: "#90EE90", light: "#F3F4F6", hover: "#76D9AB" },
        card: { DEFAULT: "#FFFFFF", hover: "#F9FAFB", border: "#E5E7EB" },
        // Text layers
        text: {
          primary: "#2F4F4F",     // Dark gray-greenish
          secondary: "#708090",    // Medium gray
          muted: "#9CA3AF",
          light: "#F5F5F5",       // Light gray
          inverse: "#FFFFFF",
        },
        // Semantic colors
        success: "#32CD32",       // Success green
        info: "#1E90FF",          // Info blue
        warning: "#FF8C00",       // Warning orange
        error: "#DC143C",         // Error red
        // Semantic
        border: { DEFAULT: "#E5E7EB", light: "#F3F4F6" },
        // Pet categories
        dog: { bg: "#E8F5E9", text: "#2E8B57", accent: "#228B22" },
        cat: { bg: "#E1F5FE", text: "#4682B4", accent: "#1E90FF" },
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
