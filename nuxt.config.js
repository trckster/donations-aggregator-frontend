export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Донатики',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/client-server',
    { src: '@/plugins/client', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment',
    '@nuxtjs/device',
    '@nuxtjs/laravel-echo',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  moment: {
    defaultLocale: 'ru',
    locales: ['ru'],
    defaultTimezone: 'GMT',
  },

  axios: {
    credentials: true,
    browserBaseURL: 'http://localhost:8000/api/',
    baseURL: 'http://localhost:8000/api/',
  },

  echo: {
    broadcaster: 'pusher',
    key: process.env.PUSHER_APP_KEY,
    cluster: 'eu',
    forceTLS: true,
    authEndpoint: process.env.BROADCAST_AUTH_URL || '/broadcasting/auth',
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.API_URL,
    },
    echo: {
      key: process.env.PUSHER_APP_KEY,
      authEndpoint: process.env.BROADCAST_AUTH_URL || '/broadcasting/auth',
    },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BACKEND_API_URL,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
}
