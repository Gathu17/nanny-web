// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@pinia/nuxt",
    [
      "@vee-validate/nuxt",
      {
        autoImports: true,
      },
    ],
    "pinia-plugin-persistedstate/nuxt",
  ],

  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },

  css: ["~/assets/main.css"],

  plugins: [{ src: "@/plugins/fontawesome", ssr: false }],

  components: [
    { path: "~/components/presentational", global: true },
    { path: "~/components/", global: true },
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  srcDir: "src/",

  routeRules: {
    "/": {
      redirect: "/welcome",
    },
    "/home": {
      redirect: "/welcome",
    },
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || "http://localhost:3000/api",
    },
  },
  ssr: false,
  compatibilityDate: "2024-11-21",
});
