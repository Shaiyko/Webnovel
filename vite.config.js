import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // แยก chunk สำหรับไลบรารีหลัก ๆ เช่น react, mui เป็นต้น
        manualChunks: {
          react: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
        },
      },
    },
    // เพิ่มขีดจำกัดคำเตือน chunk size เป็น 2MB (ค่าดีฟอลต์คือ 500KB)
    chunkSizeWarningLimit: 2000,
  },
});
