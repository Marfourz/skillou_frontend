import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      // Base URL of the Django backend API. Overridable via NUXT_PUBLIC_API_BASE.
      apiBase: 'http://localhost:8001',
    },
  },

  i18n: {
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
    ],
    defaultLocale: 'fr',
    strategy: 'no_prefix',
  },
})
