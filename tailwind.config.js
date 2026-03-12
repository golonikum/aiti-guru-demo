/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        // Анимация для бесконечного прогресс-бара в хедере
        progress: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        // Анимация появления уведомления (Toast)
        "bounce-in": {
          "0%": { transform: "translateY(100px)", opacity: "0" },
          "60%": { transform: "translateY(-10px)", opacity: "1" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        // Анимация для модального окна
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "zoom-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        progress: "progress 1.5s infinite linear",
        "bounce-in": "bounce-in 0.5s ease-out forwards",
        "fade-in": "fade-in 0.2s ease-out",
        "zoom-in": "zoom-in 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
