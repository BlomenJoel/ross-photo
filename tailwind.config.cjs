// tailwind.config.cjs

module.exports = {
    // add this section
    purge: [
      './src/**/*.html',
      './src/**/*.svelte'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            'display': ['Helvetica'],
        },
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }