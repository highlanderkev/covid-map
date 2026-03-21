<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <CovidDataTable />
        <CountryInputForm />
      </v-col>
      <v-col cols="12" md="6">
        <Map />
        <CovidDataDisplay />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useCovidStore } from '@/stores/covid'

const store = useCovidStore()
store.fetchAllCovidData()
</script>
