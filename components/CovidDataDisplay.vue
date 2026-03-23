<template>
  <div v-if="display" class="mt-4">
    <v-card v-if="cardTitle">
      <v-card-title>{{ cardTitle }}</v-card-title>
      <v-card-text>
        <v-list lines="one">
          <v-list-item v-if="confirmedCases">
            <v-list-item-title
              >Confirmed Cases: {{ confirmedCases }}</v-list-item-title
            >
          </v-list-item>
          <v-list-item v-if="deaths">
            <v-list-item-title>Deaths: {{ deaths }}</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="incidentRate">
            <v-list-item-title
              >Incident Rate: {{ incidentRate }}</v-list-item-title
            >
          </v-list-item>
          <v-list-item v-if="mortalityRate">
            <v-list-item-title
              >Mortality Rate: {{ mortalityRate }}</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="showDigestForm">Digest Form</v-btn>
        <v-btn color="error" @click="clearSelection">Clear Selection</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCovidStore } from '@/stores/covid'
import eventEmitter from '@/utils/eventEmitter'
import { SHOW_DIGESTFORM } from '@/models/events'

const store = useCovidStore()

const display = computed(() => store.selectedCountry)
const featureAttributes = computed(() => store.getSelectedCovidDataAttributes)

const cardTitle = computed(
  () => `Covid Statistics for ${featureAttributes.value?.country}`,
)

const confirmedCases = computed(() => {
  return featureAttributes.value?.confirmed
    ? new Intl.NumberFormat('en-US').format(
        featureAttributes.value.confirmed as number,
      )
    : ''
})

const deaths = computed(() => {
  return featureAttributes.value?.deaths
    ? new Intl.NumberFormat('en-US').format(
        featureAttributes.value.deaths as number,
      )
    : ''
})

const incidentRate = computed(() => featureAttributes.value?.incidentRate)
const mortalityRate = computed(() => featureAttributes.value?.mortalityRate)

function clearSelection() {
  store.clearSelectedCountry()
}

function showDigestForm() {
  eventEmitter.emit(SHOW_DIGESTFORM, true)
}
</script>
