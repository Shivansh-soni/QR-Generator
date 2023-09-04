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
          primary: "#323232",
          secondary: "#222831",
          accent: "#14FFEC",
          neutral: "#e0b1cb",
          "base-100": "#323232",
        },
      },
    ],
  },
};
