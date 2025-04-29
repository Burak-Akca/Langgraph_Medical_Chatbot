import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { builderDevTools } from "@builder.io/dev-tools/vite";
import tailwindcss from "@tailwindcss/vite";

// import * as fs from 'fs'
// https://vite.dev/config/

export default defineConfig({
  base: "/",
  server: {
    // https :{
    //   key: fs.readFileSync('./certs/localhost-key.pem'),
    //   cert: fs.readFileSync('./certs/localhost.pem'),
    // },
    port: 3000, // 3000 portunu kullanacak
    strictPort: true,
    host: true, // Tüm IP adreslerinden erişilebilir
    origin: "http://localhost:3000", // 3000 portundan erişim sağlanacak
    allowedHosts: [
      "chatbot.burakakca.com.tr",
      "react-frontend-final3-1014200023198.us-central1.run.app",
      "localhost",
     
    ],
  },
  plugins: [react(), tailwindcss(), builderDevTools()],
  preview: {
    port: 3000, // 3000 portunu kullanacak
    strictPort: true,
  },
});
