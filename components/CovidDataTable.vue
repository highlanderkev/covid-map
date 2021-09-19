<template>
  <div v-if="covidData">
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Top 10</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Country_Region</md-table-head>
      </md-table-row>
      <md-table-row>
        <md-table-cell>United States</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { GET_SELECTED_COVID_DATA_ATTRIBUTES } from '@/models/vuex'

@Component({})
export default class CovidDataDisplay extends Vue {
  get covidData() {
    return this.$store.state.selectedCovidData
  }

  get featureAttribues() {
    return this.$store.getters[GET_SELECTED_COVID_DATA_ATTRIBUTES]
  }

  get cardTitle(): string {
    return `Covid Data for ${this.featureAttribues.Country_Region}`
  }

  get confirmedCases() {
    return new Intl.NumberFormat('en-US').format(this.featureAttribues?.Confirmed)
  }
}
</script>
