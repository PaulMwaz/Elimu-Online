import { defineConfig } from "vite";
import history from "connect-history-api-fallback";

export default defineConfig({
  root: "./", // Use current folder as root
  plugins: [
    {
      name: "spa-fallback",
      configureServer(server) {
        server.middlewares.use(history());
      },
    },
  ],
  server: {
    port: 5173, // Optional: specify dev port
    open: true, // Optional: auto open in browser
  },
});
