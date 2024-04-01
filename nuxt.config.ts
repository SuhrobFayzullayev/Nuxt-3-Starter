import { locales, defaultLocale } from "./src/constants";

export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Smart Drop",
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/icons/favicon/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/icons/favicon/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/icons/favicon/favicon-16x16.png",
        },
        {
          rel: "manifest",
          href: "/icons/favicon/site.webmanifest",
        },
        {
          rel: "mask-icon",
          color: "#5bbad5",
          href: "/icons/favicon/safari-pinned-tab.svg",
        },
      ],
    },
  },

  css: [
    "assets/fonts/gotham-pro/index.css",
    "assets/styles/default.scss",
    "assets/styles/tinymce.scss",
    "assets/styles/tailwind.css",
  ],

  devtools: {
    enabled: true,
  },

  modules: [
    "@element-plus/nuxt",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "nuxt-svgo",
    "nuxt-swiper",
  ],
  svgo: {
    autoImportPath: "./public/icons/",
    componentPrefix: "i",
  },

  i18n: {
    lazy: true,
    langDir: "locales",
    strategy: "prefix",
    locales,
    defaultLocale,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      alwaysRedirect: true,
    },
  },

  pinia: {
    storesDirs: [],
  },

  srcDir: "src/",

  elementPlus: {
    importStyle: "scss",
  },

  runtimeConfig: {
    public: {
      apiURL: process.env.NUXT_BASE_URL,
      storageURL: process.env.NUXT_STORAGE_URL,
      tinymceKEY: process.env.NUXT_TINYMCE_KEY,
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  typescript: {
    shim: true,
    strict: true,
    tsConfig: {
      compilerOptions: {
        moduleResolution: "bundler",
      },
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/index.scss" as *;',
        },
      },
    },
  },
});
