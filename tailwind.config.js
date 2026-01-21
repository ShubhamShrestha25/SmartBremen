/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "100px",
        sm: "550px",
        md: "750px",
        lg: "1000px",
        xl: "1350px",
        "2xl": "1500px",
        "3xl": "1800px",
        "4xl": "2500px",
        "5xl": "2900px",
      },
    },
  },
  plugins: [],
};
