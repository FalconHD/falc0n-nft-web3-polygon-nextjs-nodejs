module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#DA18A3",
        secondary: "#FFCD00",
        Dark: "#24252D",
        Black: {
          1: "#2D2E36",
          2: "#1B1A21",
          3: "#2A2D3A",
          4: "#24252D",
        },
        grayLight: "#E3E1E3",
        grayDark: "#888888",
        grayDarker: "#4F4F4F",
      },
    },
  },
  plugins: [],
}