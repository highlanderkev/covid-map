<template>
  <div v-if="display">
    <md-card v-if="cardTitle">
      <md-card-header>
        <div class="md-title">{{ cardTitle }}</div>
      </md-card-header>
      <md-card-content>
        <md-list>
          <md-list-item v-if="confirmedCases">
            Confirmed Cases: {{ confirmedCases }}
          </md-list-item>
          <md-list-item v-if="deaths">
            Deaths: {{ deaths }}
          </md-list-item>
          <md-list-item v-if="incidentRate">
            Incident Rate: {{ incidentRate }}
          </md-list-item>
          <md-list-item v-if="mortalityRate">
            Mortality Rate: {{ mortalityRate }}
          </md-list-item>
        </md-list>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-primary" @click="showDigestForm">Digest Form</md-button>
        <md-button class="md-accent" @click="clearSelection">Clear Selection</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component
} from 'vue-property-decorator'
import {
  GET_SELECTED_COVID_DATA_ATTRIBUTES,
  CountryCovidStatistics,
  CLEAR_SELECTED_COUNTRY,
  SHOW_DIGESTFORM,
} from '@/models'
import eventEmitter from '~/plugins/eventEmitter'

@Component({
  components: {
  }
})
export default class CovidDataDisplay extends Vue {
  digestType = 'email'

  get covidData() {
    return this.$store.state.selectedCovidData
  }

  get display() {
    return this.$store.state.selectedCountry
  }

  get featureAttributes(): CountryCovidStatistics {
    return this.$store.getters[GET_SELECTED_COVID_DATA_ATTRIBUTES]
  }

  get cardTitle(): string {
    return `Covid Statistics for ${this.featureAttributes?.country}`
  }

  get confirmedCases() {
    return new Intl.NumberFormat('en-US').format(this.featureAttributes?.confirmed as number)
  }

  get deaths() {
    return new Intl.NumberFormat('en-US').format(this.featureAttributes?.deaths as number)
  }

  get incidentRate() {
    return this.featureAttributes?.incidentRate
  }

  get mortalityRate() {
    return this.featureAttributes?.mortalityRate
  }

  clearSelection(): void {
    this.$store.commit({
      type: CLEAR_SELECTED_COUNTRY
    })
  }

  showDigestForm(): void {
    eventEmitter.emit(SHOW_DIGESTFORM, true)
  }
}
</script>
