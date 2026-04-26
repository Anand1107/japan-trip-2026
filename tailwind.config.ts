import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "washi": "#F5EFE6",
        "osaka": "#C41E3A",
        "kyoto": "#8B9D6F",
        "tokyo": "#2A3F6F",
        "sakura": "#FFB7C5",
        "matcha": "#8B9D6F",
        "indigo-jp": "#2A3F6F"
      },
      fontFamily: {
        serif: ["DM Serif Display", "serif"],
        sans: ["Noto Sans", "sans-serif"]
      }
    }
  },
  plugins: []
};
export default config;
