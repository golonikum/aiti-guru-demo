import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Импортируй это

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Добавь это в список плагинов
  ],
  server: {
    proxy: {
      "/dummyjson": {
        target: "https://dummyjson.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dummyjson/, ""),
      },
    },
  },
});
