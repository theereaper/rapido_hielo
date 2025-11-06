// tailwind.config.js

const { Colors } = require("./src/constants/Colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Colores personalizados disponibles como clases en Tailwind
        primary: Colors.primary, // Color principal (ej: bg-primary, text-primary)
        "primary-soft": Colors.primarySoft, // Variante suave del color primario (fondo claro)

        "text-primary": Colors.textPrimary, // Color para textos principales
        "text-secondary": Colors.textSecondary, // Color para textos secundarios o de apoyo

        "badge-gray": Colors.badgeGray,
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
