import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/styles/index.css"],
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-svgo",
    "nuxt-build-cache",
    "@nuxt/test-utils/module",
  ],
  ssr: false,
  app: {
    head: {
      htmlAttrs: {
        lang: "en-US",
      },
    },
    baseURL: "/",
  },
  typescript: {
    typeCheck: true,
  },
});
