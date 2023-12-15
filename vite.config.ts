import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    build: {
      outDir: "build",
      assetsDir: "app",
    },
    resolve: {
      alias: {
        src: "/src",
      },
    },
    server: {
      port: 3000,
    },
    esbuild: {
      drop: command === "build" ? ["console"] : undefined,
    },
  };
});
