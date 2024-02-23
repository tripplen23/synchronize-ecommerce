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
        kaushan: ["KaushanScript", "cursive"],
        sirin: ["SirinStencil", "san"],
      },
    },
    colors: {
      dark: "#1b1b1b",
      light: "#f5f5f5",
      primary: "#B63E96", // 240,86,199
      primaryDark: "#58E6D9", // 80,230,217
    },
  },
  plugins: [],
});
