<template>
  <div v-if="covidData">
    <md-card v-if="cardTitle">
      <md-card-header>
        <div class="md-title">{{ cardTitle }}</div>
      </md-card-header>
      <md-card-content>
        Covid Statistics for Selected Country.
        <md-list>
          <md-list-item v-if="confirmedCases">
            Confirmed Cases: {{ confirmedCases }}
          </md-list-item>
        </md-list>
        {{ covidData }}
      </md-card-content>
    </md-card>
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
