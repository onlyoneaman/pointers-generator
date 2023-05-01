module.exports = {
  content: ['./dist/**/*.html', './src/**/*.{js,jsx,ts,tsx}', './*.html'],
  plugins: [require('@tailwindcss/forms')],
  variants: {
    extend: {
      opacity: ['disabled']
    }
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FFFDD3',
        secondary: '#000000',
      }
    }
  }
}
