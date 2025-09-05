/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220 15% 98%)',
        error: 'hsl(0 80% 50%)',
        accent: 'hsl(160 100% 40%)',
        primary: 'hsl(220 100% 50%)',
        success: 'hsl(120 60% 50%)',
        surface: 'hsl(220 15% 90%)',
        'text-primary': 'hsl(220 15% 10%)',
        'text-secondary': 'hsl(220 15% 30%)',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0px 4px 16px rgba(0, 0, 0, 0.1)',
        'modal': '0px 8px 32px rgba(0, 0, 0, 0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in-out',
        'slide-up': 'slideUp 300ms ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
