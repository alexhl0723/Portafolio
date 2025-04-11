import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless"

export default defineConfig({

  env:{
    schema:{
      MONGODB_URI: envField.string({ context: 'server', access:'secret' }),
      DB_NAME: envField.string({ context: 'server', access:'secret' })
    }
  },

  output: "server",

  integrations: [tailwind()],
  adapter: vercel(),
}); 