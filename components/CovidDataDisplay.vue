<template>
  <div v-if="covidData">
    <b-card
      v-if="cardTitle"
      :title="cardTitle">
      <b-card-text>
        Covid Statistics for Selected Country.
      </b-card-text>
      <b-list-group>
        <b-list-group-item v-if="confirmedCases">
          Confirmed Cases: {{ confirmedCases }}
        </b-list-group-item>
      </b-list-group>
    </b-card>
    {{ covidData }}
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
