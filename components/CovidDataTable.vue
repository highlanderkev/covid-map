<template>
  <div v-if="topTenCountryCovidData">
    <md-table
      v-model="topTenCountryCovidData"
      :md-sort.sync="currentSort"
      :md-sort-order.sync="currentSortOrder"
      :md-sort-fn="customSort"
      md-card
      @md-selected="onSelect">
      <md-table-toolbar>
        <h1 class="md-title">Top 10 Countries</h1>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
        <md-table-cell md-label="Country" md-sort-by="country">{{ item.country }}</md-table-cell>
        <md-table-cell md-label="Confirmed Cases" md-sort-by="confirmed">{{ item.confirmed }}</md-table-cell>
        <md-table-cell md-label="Deaths" md-sort-by="deaths">{{ item.deaths }}</md-table-cell>
        <md-table-cell md-label="Incident Rate" md-sort-by="incidentRate">{{ item.incidentRate }}</md-table-cell>
        <md-table-cell md-label="Mortality Rate" md-sort-by="mortalityRate">{{ item.mortalityRate }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component
} from 'vue-property-decorator'
import {
  GET_TOP_TEN_COUNTRY_COVID_DATA_SORTED,
  CountryCovidStatistics,
  SET_SELECTED_COUNTRY,
  SET_COVID_DATA_FOR_SELECTED_COUNTRY,
} from '@/models'

@Component({})
export default class CovidDataTable extends Vue {
  currentSort = 'country'
  currentSortOrder = 'asc'

  get topTenCountryCovidData(): Array<CountryCovidStatistics> {
    return this.$store.getters[GET_TOP_TEN_COUNTRY_COVID_DATA_SORTED](this.currentSort, this.currentSortOrder)
  }

  set topTenCountryCovidData(value){
  }

  customSort(): Array<CountryCovidStatistics> {
    const result = this.$store.getters[GET_TOP_TEN_COUNTRY_COVID_DATA_SORTED](this.currentSort, this.currentSortOrder)
    return result
  }

  onSelect(item: CountryCovidStatistics): void {
    if(item && item.country) {
      this.$store.commit({
        type: SET_SELECTED_COUNTRY,
        selectedCountry: item.country
      })
      this.$store.dispatch({
        type: SET_COVID_DATA_FOR_SELECTED_COUNTRY,
      })
    }
  }
}
</script>
