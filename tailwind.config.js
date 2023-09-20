/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#333',
        secondary:{
          100: '#fff',
          200: '#ccc',
        }, 
        fontFamily: {
          body: ['poppins']
        }
      }
    },
  },
  plugins: [],
}