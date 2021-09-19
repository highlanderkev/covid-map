import { VuexState } from "@/models/vuex"

const state = (): VuexState => ({
  selectedCountry: '',
  covidData: {},
  selectedCovidData: {}
})

export default state
