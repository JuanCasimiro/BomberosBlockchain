// filepath: /c:/Users/Usuario/Desktop/WorkingDirectory/NFTMintPage/nft-mint-page/tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
        accent: '#657786',
        background: '#AAB8C2',
        surface: '#E1E8ED',
        error: '#E0245E',
        slate: {
          800: '#1E293B',
          900: '#0F172A',
        },
        gray: {
          400: '#9CA3AF',
        },
      },
    },
  },
  plugins: [],
}