/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'sedna-bright-yellow': '#f3ba40',
        'sedna-dark-slate-blue': '#39424d',
        'sedna-muted-gold': '#c29a3b',
        'sedna-pale-blue-grey': '#d5dde3',
        'sedna-steel-blue-tint': '#9ba9b4',
        // For convenience, map to Tailwind's default names
        primary: '#f3ba40',
        accent: '#c29a3b',
        background: '#39424d',
        border: '#d5dde3',
        text: '#9ba9b4',
      },
      fontFamily: {
        'sedna': ['Inter', 'Arial', 'sans-serif'],
        'sedna-bold': ['Inter', 'Arial Black', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 4s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'flip': 'flip 0.6s ease-in-out',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0ea5e9' },
          '100%': { boxShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0ea5e9' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
      },
      backgroundImage: {
        'retro-gradient': 'linear-gradient(45deg, #1e3a8a, #7c3aed, #ec4899)',
        'retro-gradient-2': 'linear-gradient(135deg, #059669, #0ea5e9, #f59e0b)',
        'retro-gradient-3': 'linear-gradient(225deg, #dc2626, #ea580c, #d97706)',
      },
    },
  },
  plugins: [],
} 