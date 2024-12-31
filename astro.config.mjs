// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";

import db from "@astrojs/db";

import auth from "auth-astro";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), db(), auth(), react()],
  adapter: netlify(),
  output: "server",
  env: {
    schema: {
      CLOUDINARY_CLOUD_NAME: envField.string({
        access: "public",
        context: "server",
      }),
      CLOUDINARY_API_SECRET: envField.string({
        access: "secret",
        context: "server",
      }),
      CLOUDINARY_API_KEY: envField.string({
        access: "public",
        context: "server",
      }),
    },
  },
});
