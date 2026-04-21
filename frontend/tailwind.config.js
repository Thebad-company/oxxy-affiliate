/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981', // Emerald 500 for Oxxy Green
          dark: '#059669',
        },
        secondary: {
          DEFAULT: '#ffffff',
        },
        accent: {
          DEFAULT: '#ff5a5f',
        },
        'teal-custom': '#047857',
        'background-light': '#f8fafc',
        'surface-light': '#ffffff',
        'text-light': '#0f172a',
        'text-muted': '#64748b'
      },
      fontFamily: {
        display: ['Outfit', 'Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
