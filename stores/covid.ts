import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CountryCovidStatistics } from '@/models/covidData'
import covidApi from '@/utils/covidApi'

export const useCovidStore = defineStore('covid', () => {
  // state
  const selectedCountry = ref<string>('')
  const covidData = ref<CountryCovidStatistics[]>([])
  const selectedCovidData = ref<CountryCovidStatistics | Record<string, any>>(
    {},
  )

  // getters
  const getSelectedCovidDataAttributes = computed(
    () => selectedCovidData.value as CountryCovidStatistics,
  )

  const getListOfAvailableCountries = computed(() => {
    return covidData.value.map((data) => data?.country || '')
  })

  const getAllCountryCovidData = computed(() => covidData.value)

  const getTopTenCountryCovidDataSorted = computed(() => {
    return (
      sortField: keyof CountryCovidStatistics,
      sortOrder: 'asc' | 'desc',
    ) => {
      const allData = [...covidData.value]
      return allData
        .sort((a, b) => {
          const aValue = a[sortField] || ''
          const bValue = b[sortField] || ''

          if (sortOrder === 'desc') {
            return typeof aValue === 'string' && typeof bValue === 'string'
              ? aValue.localeCompare(bValue)
              : (aValue as number) - (bValue as number)
          }
          return typeof aValue === 'string' && typeof bValue === 'string'
            ? bValue.localeCompare(aValue)
            : (bValue as number) - (aValue as number)
        })
        .slice(0, 10)
    }
  })

  // actions
  function setSelectedCountry(country: string) {
    selectedCountry.value = country
  }

  function clearSelectedCountry() {
    selectedCountry.value = ''
    selectedCovidData.value = {}
  }

  function setCovidData(data: CountryCovidStatistics[]) {
    covidData.value = data
  }

  function setSelectedCovidData(
    data: CountryCovidStatistics | Record<string, any>,
  ) {
    selectedCovidData.value = data
  }

  async function getCovidDataForSelectedCountry() {
    const response = await covidApi.getUNStatsCovidDataForCountry(
      selectedCountry.value,
    )
    selectedCovidData.value = response ?? {}
  }

  async function fetchAllCovidData() {
    const response = await covidApi.getAllUNStatsCovidData()
    covidData.value = response ?? []
  }

  function setCovidDataForSelectedCountryFromStore() {
    const data = covidData.value.find(
      (d) => d.country === selectedCountry.value,
    )
    if (data) {
      selectedCovidData.value = data
    }
  }

  return {
    selectedCountry,
    covidData,
    selectedCovidData,
    getSelectedCovidDataAttributes,
    getListOfAvailableCountries,
    getAllCountryCovidData,
    getTopTenCountryCovidDataSorted,
    setSelectedCountry,
    clearSelectedCountry,
    setCovidData,
    setSelectedCovidData,
    getCovidDataForSelectedCountry,
    fetchAllCovidData,
    setCovidDataForSelectedCountryFromStore,
  }
})
