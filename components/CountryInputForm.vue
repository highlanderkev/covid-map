<template>
  <form @submit="onSubmit" @reset="onReset">
    <!-- <b-form-group id="country-input-group" label="Search by Country: " label-for="country-input">
      <b-form-input id="country-input" v-model="countryInput" placeholder="Enter a Country" type="text" ></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button> -->
    <md-autocomplete v-model="selectedCountry" :md-options="countries" :md-open-on-focus="false">
      <label>Country</label>
    </md-autocomplete>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import {
  SET_SELECTED_COUNTRY,
  GET_LIST_OF_AVAILABLE_COUNTRIES,
  SET_COVID_DATA_FOR_SELECTED_COUNTRY,
} from '@/models/vuex'

@Component({})
export default class CountryInputForm extends Vue {
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
