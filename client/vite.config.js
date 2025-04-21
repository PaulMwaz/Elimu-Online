import { defineConfig } from "vite";
import history from "connect-history-api-fallback";

export default defineConfig({
  root: "./",
  server: {
    port: 5173,
    open: true,
  },
  plugins: [
    {
      name: "spa-fallback",
      configureServer(server) {
        server.middlewares.use(
          history({
            // ✅ Ensures correct fallback for clean URLs like /about or /login
            disableDotRule: true,
            htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
          })
        );
      },
    },
  ],
});
