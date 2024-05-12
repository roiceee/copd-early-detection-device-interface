import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{ts,js,css,html,tsx,ico,png,svg,jpg}"],
      },
      devOptions: {
        enabled: true
      },
      includeAssets: ["favicon.ico", "apple-touch.png"],
      manifest: {
        name: "Stress Monitoring System",
        short_name: "Stress Monitoring System",
        description: "Stress Monitoring System",
        theme_color: "#FAF4D3",
        icons: [
          {
            src: "192-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "512-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "512-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "512-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
