const flowbite = require("flowbite-react/tailwind");
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      container:{
        center:true,
        padding:"10"
      },
    },
  },
  darkMode: "class",
  plugins: [
    flowbite.plugin(),
    nextui()
  ],
}

