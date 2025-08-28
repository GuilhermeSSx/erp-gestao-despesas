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
        selecaoLinha: 'rgba(0, 150, 255, 0.4)',
        jpnrPink: '#F94B85',
        jpnrVerde: '#8ED155',
        jpnrAzul: '#24C5E8',
      },
      screens: {
        'lg-1920': '1920px',
        'md-1190': '1190px',
        'md-web': '470px',
        'sm-mobile': '360px',
        '720p': { 'max': '1280px' }, // Breakpoint para telas até 1280px
      },
      scale: {
        '80': '0.8', // Adiciona a escala de 80%
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
      fontSize: {
        responsive: 'clamp(0.650rem, 0.8vw, 0.875rem)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
