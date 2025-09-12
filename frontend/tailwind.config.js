/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  // NEW: make sure our new colors & gradients are not purged
  safelist: [
    // text / bg / border
    { pattern: /text-(green|orange)-(100|300|500|600|700|800)/ },
    { pattern: /bg-(green|orange)-(50|100|300|600|700)/ },
    { pattern: /border-(green|orange)-(300|500)/ },

    // gradient color stops
    { pattern: /(from|via|to)-(green|orange)-(50|100|600|700)/ },

    // focus/hover variants you used
    { pattern: /focus:ring-(green|orange)-(500|600)/ },
    { pattern: /hover:(from|to)-(green|orange)-(700)/ },
    { pattern: /hover:(text|bg|border)-(green|orange)-(50|300|600|700)/ },
  ],
  plugins: [],
};
