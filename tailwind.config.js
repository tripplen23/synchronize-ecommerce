// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  plugins: [require("flowbite/plugin")],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "nf"],
      },
    },
    colors: {
      dark: "#1b1b1b",
      light: "#f5f5f5",
      primary: "#11AD99",
      primaryLight: "#58E6D9", // 80,230,217
    },
    screens: {
      smPhone: { max: "479px" },
      ipadPro: { max: "1024px" },
      xlDevice: { max: "1290px" },
      ipadMini: { max: "820px" },
      surfaceDuo: { max: "540px" },
      surfacePro: { min: "853px" },
    },
  },

  plugins: [],
});
