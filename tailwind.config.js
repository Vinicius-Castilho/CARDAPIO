/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "home": "url('/assets/bg.png')",

        "altura": "max-height: 300px;"
      },

      boxShadow:{
        
      }
    },
  },
  plugins: [],
}

