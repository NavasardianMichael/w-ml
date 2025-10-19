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
      screens: {
        xs: '360px', // Small phones
        sm: '480px', // Regular phones
        md: '768px', // Tablets
        lg: '1024px', // Large tablets
        xl: '1280px', // Extra large tablets / laptops
        tv: '1920px', // TVs and external displays
      },
      colors: {
        primary: '#1e3a8a', // blue-800
        'primary-contrast': '#3b82f6', // blue-500
        secondary: '#ffffff', // white
        tertiary: '#fbbf24', // amber-400
        'dark-orange': '#a96e19', // orange-600
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        140: '140px',
        300: '300px',
      },
      fontSize: ['landscape', 'portrait'],
    },
  },
  plugins: [],
}
