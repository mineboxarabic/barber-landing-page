/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#161616',
          charcoal: '#272729',
          burgundy: '#672f25',
          green: '#708472',
          brown: '#a16a38',
          light: '#e2e1df',
          gray: '#afa99f',
          cream: '#f4e4de',
          'cream-alt': '#f3e5df',
          footer: '#0d0d0d',
        },
      },
      fontFamily: {
        script: ['Great Vibes', 'cursive'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Montserrat', 'Helvetica Neue', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.3em',
      },
    },
  },
  plugins: [],
};
