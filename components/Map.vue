<template>
  <div ref="googlemap" class="map-container"></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { SET_SELECTED_COVID_DATA } from '@/models/vuex'
import googleMapsLoader from '@/plugins/googleMapsLoader'

@Component({})
export default class Map extends Vue {
  map?: google.maps.Map

  setGoogleMap(lat: number, lng: number, zoom: number) {
    this.map = new google.maps.Map(this.$refs.googlemap as Element, {
      center: {
        lat,
        lng
      },
      zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  }

  mounted() {
    googleMapsLoader.load().then(() => {
      this.$store.subscribe((mutation, state) => {
        if(mutation.type === SET_SELECTED_COVID_DATA) {
          this.setGoogleMap(state?.selectedCovidData?.attributes.Lat, state?.selectedCovidData?.attributes.Long_, 4);
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
