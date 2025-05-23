// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['~/assets/main.css'],

  plugins: [
    {src: "@/plugins/fontawesome", ssr: false}
  ],

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

  // router: {
  //   middleware: 'redirect',
  // },
  routeRules: {
    "/": {
      redirect: "/welcome",
    },
    "/home": {
      redirect: "/welcome",
    },
  },
  ssr: false,
  compatibilityDate: "2024-11-21"
})