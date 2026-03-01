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
        surface: '#111111',
        card: '#141414',
        'card-hover': '#1a1a1a',
        border: '#262626',
        accent: {
          green: '#22c55e',
          red: '#ef4444',
          blue: '#3b82f6',
          yellow: '#eab308',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a1a1aa',
          muted: '#52525b',
        }
      },
      borderRadius: {
        'xl': '12px',
      },
      fontSize: {
        'xxs': ['9px', { lineHeight: '1.4' }],
        'micro': ['8px', { lineHeight: '1.4' }],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        },
        '.dot-grid': {
          'background-image': 'radial-gradient(circle, #2a2a2a 1px, transparent 1px)',
          'background-size': '20px 20px',
        },
      });
    },
  ],
}
