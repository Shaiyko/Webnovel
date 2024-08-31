import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5173, // ใช้ค่า PORT จาก environment หรือ fallback ไปที่ 5173
    host: true, // ทำให้เข้าถึงได้จากภายนอก (network)
  },
});
