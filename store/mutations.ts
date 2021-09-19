import {
  SET_SELECTED_COUNTRY,
  SET_COVID_DATA,
  SET_SELECTED_COVID_DATA,
} from '@/models/vuex'

function setSelectedCountry(state: any, payload: { selectedCountry: string }) {
  state.selectedCountry = payload.selectedCountry
}

function setCovidData(state: any, payload: { covidData: any }) {
  state.covidData = payload.covidData
}

function setSelectedCovidData(state: any, payload: { selectedCovidData: any }) {
  state.selectedCovidData = payload.selectedCovidData
}

export default {
  [SET_SELECTED_COUNTRY]: setSelectedCountry,
  [SET_COVID_DATA]: setCovidData,
  [SET_SELECTED_COVID_DATA]: setSelectedCovidData
}
