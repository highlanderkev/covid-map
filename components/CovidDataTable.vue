<template>
  <v-card v-if="topTenCountryCovidData.length">
    <v-card-title>Top 10 Countries</v-card-title>
    <v-table hover>
      <thead>
        <tr>
          <th>Country</th>
          <th>Confirmed Cases</th>
          <th>Deaths</th>
          <th>Incident Rate</th>
          <th>Mortality Rate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in topTenCountryCovidData" :key="item.country" @click="onSelect(item)" style="cursor: pointer;">
          <td>{{ item.country }}</td>
          <td>{{ item.confirmed }}</td>
          <td>{{ item.deaths }}</td>
          <td>{{ item.incidentRate }}</td>
          <td>{{ item.mortalityRate }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCovidStore } from '@/stores/covid'
import type { CountryCovidStatistics } from '@/models/covidData'

const store = useCovidStore()

const currentSort = ref<keyof CountryCovidStatistics>('country')
const currentSortOrder = ref<'asc'|'desc'>('asc')

const topTenCountryCovidData = computed(() => {
  return store.getTopTenCountryCovidDataSorted(currentSort.value, currentSortOrder.value)
})

function onSelect(item: CountryCovidStatistics) {
  if (item && item.country) {
    store.setSelectedCountry(item.country)
    store.setCovidDataForSelectedCountryFromStore()
  }
}
</script>
