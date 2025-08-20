import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "/", // 
 test: {
    globals: true,        
    environment: 'jsdom', 
    setupFiles: './tests/setupTests.js', 
    include: ['tests/**/*.test.{js,jsx,ts,tsx}'], 
  },
});
