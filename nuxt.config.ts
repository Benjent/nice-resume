import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/styles/index.css"],
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "nuxt-svgo"],
  app: {
    head: {
      htmlAttrs: {
        lang: "en-US",
      },
    },
  },
  typescript: {
    typeCheck: true,
  },
});
