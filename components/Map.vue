<template>
  <v-sheet class="map-container" ref="googlemap"></v-sheet>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useCovidStore } from '@/stores/covid'
import { getGoogleMapsLoader } from '@/utils/googleMapsLoader'
import { useRuntimeConfig } from '#app'

const store = useCovidStore()
const config = useRuntimeConfig()
const googlemap = ref<HTMLElement | null>(null)

let map: any = null
let marker: any = null
let loader: any = null

async function setGoogleMap(lat: number, lng: number, zoom: number) {
  const { Map } = await loader.importLibrary("maps")
  map = new Map(googlemap.value as HTMLElement, {
    center: { lat, lng },
    zoom,
    mapId: 'DEMO_MAP_ID',
    mapTypeId: google.maps.MapTypeId.ROADMAP
  })
  setMarker(lat, lng, map)
}

async function setMarker(lat: number, lng: number, mapInstance: any) {
  const { AdvancedMarkerElement } = await loader.importLibrary("marker")
  marker = new AdvancedMarkerElement({
    position: { lat, lng },
    map: mapInstance,
    title: 'Selection'
  })
}

onMounted(() => {
  loader = getGoogleMapsLoader(config.public.GOOGLE_MAPS_API_KEY as string)
  loader.importLibrary("maps").then(() => {
    watch(() => store.selectedCovidData, (newData: any) => {
      if (newData?.coordinates?.latitude && newData?.coordinates?.longitude) {
        setGoogleMap(newData.coordinates.latitude, newData.coordinates.longitude, 4)
      }
    }, { deep: true })
    
    // Only conditionally fall back if no selected country
    if (!store.selectedCountry) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setGoogleMap(coords.latitude, coords.longitude, 4)
      })
    }
  })
})
</script>

<style lang="scss" scoped>
.map-container {
  height: 40rem;
  width: 100%;
}
</style>
