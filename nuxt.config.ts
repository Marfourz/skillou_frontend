// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',

  runtimeConfig: {
    public: {
      // Base URL of the Django backend API. Overridable via NUXT_PUBLIC_API_BASE.
      apiBase: 'http://localhost:8000',
    },
  },
})
