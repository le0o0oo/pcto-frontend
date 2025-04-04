// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    lepida_api_key: process.env.API_KEY,
    app_eui: process.env.DEV_EUI,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
  icon: {
    serverBundle: {
      collections: ["lucide"], // <!--- this
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  nitro: {
    plugins: ["~/server/index.ts"],
  },
});
