/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');
// const colors = require('tailwindcss/colors');
// const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = ({
  content: ['./src/**/*.{js,jsx,ts,tsx}',
  "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'false',
  daisyui: {
    themes: ["light", "cupcake"],
  },
  theme: {
    extend: {
      visibility: ['group-hover'],
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
      colors: {
        primary: {
          // Customize it on globals.css :root
          200: 'rgb(var(--tw-clr-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-clr-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-clr-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-clr-primary-500) / <alpha-value>)',
        },
        dark: '#fff',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(0.5deg)',
          },
          '75%': {
            transform: 'rotate(-0.5deg)',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        tilt: 'tilt 10s infinite linear',
      },
      typography: {
        DEFAULT: {
          // code: {
          //   color: '#86e1fc',
          //   '&::before': { content: `"" !important` },
          //   '&::after': { content: `"" !important` },
          //   fontWeight: 'normal',
          // },
          // '[data-rehype-pretty-code-fragment]:nth-of-type(2) pre': {
          //   '[data-line]::before': {
          //     content: 'counter(line)',
          //     counterIncrement: 'line',
          //     display: 'inline-block',
          //     width: '1rem',
          //     marginRight: '1rem',
          //     textAlign: 'right',
          //     color: colors.slate[600],
          //   },
          //   '[data-highlighted-line]::before': {
          //     color: colors.slate[400],
          //   },
          // },
        },
      },
    },
  },
  plugins: [ require('@tailwindcss/typography'), require("daisyui")],
});
