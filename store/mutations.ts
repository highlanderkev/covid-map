import {
  SET_SELECTED_COUNTRY,
  SET_COVID_DATA,
  SET_SELECTED_COVID_DATA,
  CLEAR_SELECTED_COUNTRY,
} from '@/models/vuex'

function setSelectedCountry(state: any, payload: { selectedCountry: string }) {
  state.selectedCountry = payload.selectedCountry
}

function clearSelectedCountry(state: any) {
  state.selectedCountry = ''
  state.selectedCovidData = {}
}

function setCovidData(state: any, payload: { covidData: any }) {
  state.covidData = payload.covidData
}

function setSelectedCovidData(state: any, payload: { selectedCovidData: any }) {
  state.selectedCovidData = payload.selectedCovidData
}

export default {
  [SET_SELECTED_COUNTRY]: setSelectedCountry,
  [CLEAR_SELECTED_COUNTRY]: clearSelectedCountry,
  [SET_COVID_DATA]: setCovidData,
  [SET_SELECTED_COVID_DATA]: setSelectedCovidData
}
