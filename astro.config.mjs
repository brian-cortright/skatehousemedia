import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://skatehousemedia.com",
  output: "static",
  trailingSlash: "ignore",
  server: {
    port: 3000,
  },
  integrations: [react(), sitemap()],
});
