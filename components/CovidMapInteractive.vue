<template>
  <main class="md-layout">
    <div class="md-layout-item">
      <CovidDataTable/>
      <CountryInputForm/>
    </div>
    <div class="md-layout-item">
      <Map/>
      <CovidDataDisplay/>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Map from '@/components/Map.vue'
import CountryInputForm from '@/components/CountryInputForm.vue'
import CovidDataDisplay from '@/components/CovidDataDisplay.vue'
import CovidDataTable from '@/components/CovidDataTable.vue'
import { GET_COVID_DATA } from '@/models/vuex'

@Component({
  components: {
    Map,
    CountryInputForm,
    CovidDataDisplay,
    CovidDataTable,
  }
})
export default class CovidMapInteractive extends Vue {
  created() {
    this.$store.dispatch({
      type: GET_COVID_DATA
    })
  }
}
</script>
