/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      inter: ['Inter-Regular'],
      'inter-medium': ['Inter-Medium'],
      'inter-bold': ['Inter-Bold'],
      'inter-black': ['Inter-Black'],
    },
    extend: {
      colors: {
        primary: '#1e3a8a', // blue-800
        'primary-contrast': '#3b82f6', // blue-500
        secondary: '#ffffff', // white
        tertiary: '#fbbf24', // amber-400
        'dark-orange': '#ea580c', // orange-600
      },
      spacing: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        140: '140px',
        300: '300px',
      },
    },
  },
  plugins: [],
}
