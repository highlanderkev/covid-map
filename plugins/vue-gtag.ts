import Vue from 'vue'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: {
    id: process.env.GOOGLE_TAG_ID
  },
  appName: 'covid-map',
  pageTrackerScreenviewEnabled: true
})
