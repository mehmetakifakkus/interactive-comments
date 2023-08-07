/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        /* primary */
        moderateblue: "#5457b6",
        softred: "#ed6468",
        lightgrayishblue: "#c3c4ef",
        palered: "#ffb8bb",

        /* Neutral */
        darkblue: "#324152",
        grayishBlue: "#66717d",
        lightgray: "#eaecf1",
        verylightgray: "#f5f6fa",
      }
    },


  },
  plugins: [],
}
