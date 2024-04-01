/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/**/*.{js,vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/app.vue",
    "./src/error.vue",
  ],
  theme: {
    extend: {
      screens: {
        "1xl": "1320px",
        xs: "576px",
        "2md": "895px",
      },

      colors: {
        cwhite: "#FFF",
        cblack: "#000",
      },

      zIndex: {
        overlay: "999",
        modal: "1000",
        navigationDrawer: "1100",
      },
    },
  },
  plugins: [],
};
