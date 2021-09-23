import {
  GET_SELECTED_COVID_DATA_ATTRIBUTES,
  GET_LIST_OF_AVAILABLE_COUNTRIES,
  GET_ALL_COUNTRY_COVID_DATA,
  GET_TOP_TEN_COUNTRY_COVID_DATA_SORTED,
  VuexState,
} from '@/models/vuex'
import { CountryCovidStatistics } from '~/models/covidData'

function getSelectedCovidDataAttributes(state: VuexState): CountryCovidStatistics {
  return state?.selectedCovidData as CountryCovidStatistics
}

function getListOfAvailableCountries(state: VuexState): Array<string> {
  return state?.covidData.map((data: CountryCovidStatistics) => {
    return data?.country || ''
  }) || []
}

function getAllCountryCovidData(state: VuexState): Array<CountryCovidStatistics> {
  return state?.covidData.map((data: CountryCovidStatistics) => {
    return data as CountryCovidStatistics
  }) || []
}

function getTopTenCountryCovidDataSorted(state: VuexState) {
  return (sortField: string, sortOrder: string): Array<CountryCovidStatistics> => {
    const allCountryCovidData =  state?.covidData.map((data: CountryCovidStatistics) => {
      return data as CountryCovidStatistics
    }) || []

    return allCountryCovidData.sort((a: CountryCovidStatistics, b: CountryCovidStatistics) => {
      const aValue = a[sortField] || ''
      const bValue = b[sortField] || ''

      if(sortOrder === 'desc') {
        return typeof aValue === 'string' && typeof bValue === 'string' ? aValue.localeCompare(bValue) : (aValue as number) - (bValue as number)
      }
      return typeof aValue === 'string' && typeof bValue === 'string' ? bValue.localeCompare(aValue) : (bValue as number) - (aValue as number)
    }).slice(0, 10)
  }
}

export default {
  [GET_SELECTED_COVID_DATA_ATTRIBUTES]: getSelectedCovidDataAttributes,
  [GET_LIST_OF_AVAILABLE_COUNTRIES]: getListOfAvailableCountries,
  [GET_ALL_COUNTRY_COVID_DATA]: getAllCountryCovidData,
  [GET_TOP_TEN_COUNTRY_COVID_DATA_SORTED]: getTopTenCountryCovidDataSorted
}
