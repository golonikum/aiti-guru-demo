import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Импортируй это
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
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
