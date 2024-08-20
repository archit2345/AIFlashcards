const plugin = require('tailwindcss/plugin');

// Utility function to add CSS variables for colors
const addVariablesForColors = plugin(function({ addBase, theme }) {
  const colors = theme('colors');
  const colorVars = Object.entries(colors).reduce((vars, [key, value]) => {
    if (typeof value === 'object') {
      Object.entries(value).forEach(([subKey, subValue]) => {
        vars[`--${key}-${subKey}`] = subValue;
      });
    } else {
      vars[`--${key}`] = value;
    }
    return vars;
  }, {});

  addBase({
    ':root': colorVars,
  });
});

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [addVariablesForColors],
};
