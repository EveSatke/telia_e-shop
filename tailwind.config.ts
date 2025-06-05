import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#4E0174",
        secondary: "#F5F5FA",
        purple: "#6D02A3",
        "black-form": "#1E1E20",
        "black-form-label": "#222222",
        "focus-purple": "#E4B6FB",
        "dark-purple": "#29003E",
        "black-80": "#000000CC",
        "black-62": "#0000009E",
        "black-33": "#00000054",
        "black-16": "##00000029",
        "red-alert": "#980233",
        "red-error": "#BE0040",
        "red-table": "#E4175C",
        "green-table": "#018842",
        "green-success": "#02562B",
        "input-gray": "#7A7A7A",
      },
      width: {
        card: "343px",
        "lg-card": "318px",
      },
    },
  },
  plugins: [],
};
export default config;
