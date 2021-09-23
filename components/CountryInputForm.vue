<template>
  <form class="md-layout" @submit="onSubmit" @reset="onReset">
    <md-card class="md-layout-item">
      <md-card-header>
        <div class="md-title">Country Lookup</div>
      </md-card-header>
        <md-autocomplete
          v-model="selectedCountry"
          :md-options="countries"
          :md-open-on-focus="openOnFocus"
          md-layout="box"
          md-dense>
          <label>Country</label>
        </md-autocomplete>
    </md-card>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import {
  SET_SELECTED_COUNTRY,
  GET_LIST_OF_AVAILABLE_COUNTRIES,
  SET_COVID_DATA_FOR_SELECTED_COUNTRY,
} from '@/models'

@Component({})
export default class CountryInputForm extends Vue {
  openOnFocus = true

  get countries() {
    return this.$store.getters[GET_LIST_OF_AVAILABLE_COUNTRIES]
  }

  get selectedCountry() {
    return this.$store.state.selectedCountry
  }

  set selectedCountry(value: string) {
    this.$store.commit({
      type: SET_SELECTED_COUNTRY,
      selectedCountry: value
    })
    this.$store.dispatch({
      type: SET_COVID_DATA_FOR_SELECTED_COUNTRY,
    })
  }

  onSubmit(event: Event) {
    event.preventDefault()
    console.log('submit', event, this.selectedCountry)
    this.$store.dispatch({
      type: SET_COVID_DATA_FOR_SELECTED_COUNTRY,
    })
  }

  onReset(event: Event) {
    event.preventDefault()
    console.log('reset', event, this.selectedCountry)
  }
}
</script>
