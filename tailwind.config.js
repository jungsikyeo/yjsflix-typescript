module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        base: "repeat(auto-fill, 125px)",
      },
      boxShadow: {
        header: "0 10px 15px 2px rgba(0, 0, 0, 0.8)",
      },
    },
    fontFamily: {
      sans: ["Do Hyeon", "sans-serif"],
      serif: ["Do Hyeon", "serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
