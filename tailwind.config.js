/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        selecaoLinha: '#24C5E8', 
        jpnrPink: '#F94B85',
        jpnrVerde: '#8ED155',
        jpnrAzul: '#24C5E8',
      },
      screens: {
        'lg-1920': '1920px',
        'md-1190': '1190px',
        'md-web': '470px',
        'sm-mobile': '360px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
