// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    'nuxt-icon',
    '@sidebase/nuxt-auth',
  ],
  auth: {
    provider: {
      type: 'authjs',
    },
    globalAppMiddleware: true,
  },
  googleFonts: {
    families: {
      Montserrat: true,
    },
  },
});
