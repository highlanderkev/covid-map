import {
  GET_SELECTED_COVID_DATA_ATTRIBUTES,
  GET_LIST_OF_AVAILABLE_COUNTRIES,
  VuexState,
} from '@/models/vuex'

function getSelectedCovidDataAttributes(state: VuexState) {
  return state?.selectedCovidData?.attributes
    ? state?.selectedCovidData?.attributes
    : {}
}

function getListOfAvailableCountries(state: VuexState): Array<string> {
  return state?.covidData?.features && state?.covidData?.features.length > 0 ? state?.covidData?.features.map((data) => {
    return data?.attributes?.Country_Region || ''
  }) : []
}

export default {
  [GET_SELECTED_COVID_DATA_ATTRIBUTES]: getSelectedCovidDataAttributes,
  [GET_LIST_OF_AVAILABLE_COUNTRIES]: getListOfAvailableCountries,
}
