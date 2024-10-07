/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Istok Web', 'Itim', 'Inconsolata', 'Inria Sans']
      },
      gridTemplateColumns: {
        '70/30': '70% 28%', 
      }, 
      
    },
  },
  plugins: [],
}