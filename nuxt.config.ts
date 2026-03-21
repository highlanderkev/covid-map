import { defineNuxtConfig } from 'nuxt/config'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: false,

  runtimeConfig: {
    public: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      SENDGRID_EMAIL_ADDRESS: process.env.SENDGRID_EMAIL_ADDRESS,
      TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
      TWILIO_SMS_NUMBER: process.env.TWILIO_SMS_NUMBER,
      GOOGLE_TAG_ID: process.env.GOOGLE_TAG_ID,
    }
  },

  app: {
    head: {
      title: 'Covid-19 Cases Interactive Map',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: '//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons'
        }
      ]
    }
  },

  css: ['@/assets/scss/main.scss', 'vuetify/styles'],

  build: {
    transpile: ['vuetify', '@googlemaps/js-api-loader'],
  },

  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error config plugins might be possibly undefined but rarely true in vite configs inside nuxt
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "vuetify/settings" as *;'
        }
      }
    }
  },
})
