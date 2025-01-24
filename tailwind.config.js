/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
        logo: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
      colors: {
        condo: {
          dark: 'rgba(0,87,80,255)',
          med: 'rgba(0,200,145,255)',
          light: 'rgba(157,255,189,255)',
          orange: 'rgba(255,202,115,255)',
          yellow: 'rgba(255,235,180,255)'
        },
        base: {
          dark1: '#004740', //10% mørkere
          dark2: '#003830', //20% mørkere
          dark3: '#002820', //30%mørkere
          light1: '#00786A', // 10% lysere
          light2: '#00957F', //20% lysere
          light3: '#00B38C', //30% lysere
          light0: 'rgba(230, 255, 235, 255)', //nesten hvitt
          white: 'rgba(242, 251, 250, 1)' 
        }
      }
    },
  },
  plugins: [],
};