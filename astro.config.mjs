import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel"; // 👈 ya no uses /serverless

export default defineConfig({
  env: {
    schema: {
      MONGODB_URI: envField.string({ context: 'server', access: 'secret' }),
      DB_NAME: envField.string({ context: 'server', access: 'secret' })
    }
  },
  integrations: [tailwind()],
  adapter: vercel({ edge: false }) // 👈 esto activa modo Serverless sin symlinks
});
