<template>
  <md-content>
    <div ref="googlemap" class="map-container"></div>
  </md-content>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { SET_SELECTED_COVID_DATA, VuexState } from '@/models/vuex'
import googleMapsLoader from '@/plugins/googleMapsLoader'

@Component({})
export default class Map extends Vue {
  map?: google.maps.Map
  marker?: google.maps.Marker

  setGoogleMap(lat: number, lng: number, zoom: number): void {
    this.map = new google.maps.Map(this.$refs.googlemap as Element, {
      center: {
        lat,
        lng
      },
      zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.setMarker(lat, lng, this.map)
  }

  setMarker(lat: number, lng: number, map: google.maps.Map): void {
    this.marker = new google.maps.Marker({
      position: {
        lat,
        lng
      },
      map,
      title: 'Selection'
    })
  }

  mounted() {
    googleMapsLoader.load().then(() => {
      this.$store.subscribe((mutation, state: VuexState) => {
        if(mutation.type === SET_SELECTED_COVID_DATA && state?.selectedCovidData?.coordinates?.latitude && state?.selectedCovidData?.coordinates?.longitude) {
          this.setGoogleMap(state?.selectedCovidData?.coordinates?.latitude as number, state?.selectedCovidData?.coordinates?.longitude as number, 4);
        }
      })
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        this.setGoogleMap(coords.latitude, coords.longitude, 4);
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.map-container {
  height: 40rem;
}
</style>
