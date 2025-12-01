// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/ui"],
  css: ["~/assets/css/global.css"],
  ui: {
    colorMode: false,
  },
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:8000/api/v1",
      backend: "http://localhost:8000",
    },
  },
  imports: {
    dirs: [
      "~/composables/**",
    ],
  },
});