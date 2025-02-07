module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#1c73af",
    },
    extend: {
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        slideIn: "slideIn 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
