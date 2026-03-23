<template>
  <v-form @submit.prevent="onSubmit" @reset.prevent="onReset" class="mt-4">
    <v-card>
      <v-card-title>Country Lookup</v-card-title>
      <v-card-text>
        <v-autocomplete
          v-model="selectedCountry"
          :items="countries"
          label="Country"
          density="compact"
          variant="outlined"
          auto-select-first
        ></v-autocomplete>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCovidStore } from '@/stores/covid'

const store = useCovidStore()

const countries = computed(() => store.getListOfAvailableCountries)

const selectedCountry = computed({
  get: () => store.selectedCountry,
  set: (val: string) => {
    store.setSelectedCountry(val)
    store.setCovidDataForSelectedCountryFromStore()
  },
})

function onSubmit() {
  store.setCovidDataForSelectedCountryFromStore()
}

function onReset() {
  store.clearSelectedCountry()
}
</script>
