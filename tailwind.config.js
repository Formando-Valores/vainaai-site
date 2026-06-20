const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", ...fontFamily.sans],
        display: ["Fraunces", ...fontFamily.serif],
        mono: ["JetBrains Mono", ...fontFamily.mono],
      },
      borderRadius: {
        DEFAULT: "8px",
        secondary: "4px",
        container: "12px",
      },
      boxShadow: {
        DEFAULT: "0 1px 4px rgba(0, 0, 0, 0.1)",
        hover: "0 2px 8px rgba(0, 0, 0, 0.12)",
      },
      colors: {
        primary: {
          DEFAULT: "#1D4ED8",
          hover: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#1C2535",
          hover: "#111827",
        },
        accent: {
          DEFAULT: "#F0EDE6",
          hover: "#FFFFFF",
        },
      },
      spacing: {
        "form-field": "16px",
        section: "32px",
      },
    },
  },
  plugins: [],
};
