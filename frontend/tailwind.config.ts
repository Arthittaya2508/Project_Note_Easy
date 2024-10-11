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
        background: "var(--background)",
        foreground: "var(--foreground)",

        "gable-green": {
          "50": "#f3faf9",
          "100": "#d6f1ed",
          "200": "#ade2dc",
          "300": "#7cccc5",
          "400": "#50b1ab",
          "500": "#379591",
          "600": "#2a7775",
          "700": "#256060",
          "800": "#214e4e",
          "900": "#1a3636",
          "950": "#0d2526",
        },
        nandor: {
          "50": "#f5f8f6",
          "100": "#e0e7e4",
          "200": "#c0cfc8",
          "300": "#98b0a5",
          "400": "#738e83",
          "500": "#587469",
          "600": "#455c53",
          "700": "#40534c",
          "800": "#313e39",
          "900": "#2c3532",
          "950": "#161d1b",
        },
        brandy: {
          "50": "#faf7f2",
          "100": "#f3ede1",
          "200": "#e7d8c1",
          "300": "#d6bd98",
          "400": "#c69e71",
          "500": "#ba8755",
          "600": "#ac734a",
          "700": "#8f5d3f",
          "800": "#744c38",
          "900": "#5e3f30",
          "950": "#321f18",
        },
        "willow-grove": {
          "50": "#f4f5f4",
          "100": "#e4e8e3",
          "200": "#c9d1c9",
          "300": "#a4b1a5",
          "400": "#7a8d7c",
          "500": "#677d6a",
          "600": "#455648",
          "700": "#37453a",
          "800": "#2d382f",
          "900": "#262e28",
          "950": "#151916",
        },
      },
    },
  },
  plugins: [],
};
export default config;
