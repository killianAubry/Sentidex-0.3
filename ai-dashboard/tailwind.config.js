/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        card: '#141414',
        border: '#262626',
        accent: {
          green: '#22c55e',
          red: '#ef4444',
          blue: '#3b82f6',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a1a1aa',
        }
      },
      borderRadius: {
        'xl': '12px',
      }
    },
  },
  plugins: [],
}
