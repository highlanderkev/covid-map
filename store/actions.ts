import {
  GET_COVID_DATA_FOR_SELECTED_COUNTRY,
  GET_COVID_DATA,
  SET_COVID_DATA,
  SET_SELECTED_COVID_DATA,
  SET_COVID_DATA_FOR_SELECTED_COUNTRY,
  VuexState,
} from '@/models/vuex'
import { CountryCovidStatistics } from '@/models/covidData'
import covidApi from "@/plugins/covidApi"

async function getCovidDataForSelectedCountry({ commit, state }: { commit: any, state: VuexState}) {
  const response = await covidApi.getUNStatsCovidDataForCountry(state.selectedCountry)
  commit({
    type: SET_SELECTED_COVID_DATA,
    selectedCovidData: response
  })
}

async function getCovidData({ commit }: any) {
  const response = await covidApi.getAllUNStatsCovidData()
  commit({
    type: SET_COVID_DATA,
    covidData: response
  })
}

function setCovidDataForSelectedCountry({ commit, state }: { commit: any, state: VuexState}) {
  const selectedCovidData = state?.covidData?.find((data: CountryCovidStatistics) => {
    return data?.country === state?.selectedCountry
  })
  commit({
    type: SET_SELECTED_COVID_DATA,
    selectedCovidData
  })
}

export default {
  [GET_COVID_DATA_FOR_SELECTED_COUNTRY]: getCovidDataForSelectedCountry,
  [GET_COVID_DATA]: getCovidData,
  [SET_COVID_DATA_FOR_SELECTED_COUNTRY]: setCovidDataForSelectedCountry
}
