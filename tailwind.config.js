/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#204144",

          secondary: "#A2FFFC",

          accent: "#FFD803",

          neutral: "#1D1E2B",

          "base-100": "#ffffff",

          info: "#dfceff",

          success: "#6ef283",

          warning: "#ff2d3d",

          error: "#FC5568",

          label: "#87898E",
        },
      },
    ],
  },
};
