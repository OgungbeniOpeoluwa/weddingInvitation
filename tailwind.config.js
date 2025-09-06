// tailwind.config.js
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
              wine: {
                600: "#7b2c3f",
                700: "#5a1f2e",
              },
              "burnt-orange": {
                600: "#cc5500",
                700: "#a94400",
              },
              olive: {
                50: "#f6f8f2", // you used olive-50
                600: "#556B2F",
                700: "#3d4d1e",
              },
              peach: {
                100: "#ffe5d9",
                300: "#ffbfa3",
              },
            },
          },       
    },
    plugins: [],
  };
  