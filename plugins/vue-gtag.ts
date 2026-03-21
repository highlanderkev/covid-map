import VueGtag from 'vue-gtag'
import type { Router } from 'vue-router'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  if (config.public.GOOGLE_TAG_ID) {
    nuxtApp.vueApp.use(
      VueGtag,
      {
        config: {
          id: config.public.GOOGLE_TAG_ID,
        },
        appName: 'covid-map',
        pageTrackerScreenviewEnabled: true,
      },
      nuxtApp.$router as Router,
    )
  }
})
