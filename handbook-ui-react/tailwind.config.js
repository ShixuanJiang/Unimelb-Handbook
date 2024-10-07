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
      colors: {
        uomBlue100: '#000F46',
        uomBlue75: '#404B74',
        uomBlue50: '#8087A2',
        uomBlue25: '#BFC3D1',
        uombDarkBlue: '#000B34',
        uomLightGrey100: '#C8C8C8',
        uomLightGrey75: '#D6D6D6',
        uomLightGrey50: '#E4E4E4',
        uomLightGrey25: '#F1F1F1',
        uomLink: '#083973',
      },
      gridTemplateColumns: {
        '70/30': '70% 28%', 
      }, 
      
    },
  },
  plugins: [],
}