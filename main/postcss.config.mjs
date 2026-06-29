const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' }, // Moves linear gradient highlight edge-to-edge
        },
      },
    },
  },
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
