export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // https://nuxtjs.org/docs/configuration-glossary/configuration-env/
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_EMAIL_ADDRESS: process.env.SENDGRID_EMAIL_ADDRESS,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_SMS_NUMBER: process.env.TWILIO_SMS_NUMBER,
    GOOGLE_TAG_ID: process.env.GOOGLE_TAG_ID,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Covid-19 Cases Interactive Map',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '@/plugins/vue-material.ts',
      mode: 'client'
    },
    {
      src: '@/plugins/googleMapsLoader.ts',
      mode: 'client'
    },
    {
      src: '@/plugins/vee-validate.ts',
      mode: 'client'
    },
    {
      src: '@/plugins/vue-e164.ts',
      mode: 'client'
    },
    {
      src: '@/plugins/vue-gtag.ts',
      mode: 'client'
    },
    {
      src: '@/plugins/vue-tel-input.ts',
      mode: 'client'
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
