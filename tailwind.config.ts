import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ember: "#ffb36b",
        rosefilm: "#ff8f92",
        honey: "#ffd9a1",
        night: "#100c10",
        plum: "#2a1725"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 70px rgba(255, 179, 107, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
