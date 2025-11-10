/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // Use class-based dark mode instead of media query
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            code: {
              backgroundColor: '#f3f4f6',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#f3f4f6',
              color: '#111827',
            },
          },
        },
        dark: {
          css: {
            code: {
              backgroundColor: '#1f2937',
              color: '#f0f9ff',
              fontWeight: '500',
            },
            pre: {
              backgroundColor: '#111827',
              color: '#f0f9ff',
              border: '1px solid #374151',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: '#f0f9ff',
              fontWeight: '500',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}