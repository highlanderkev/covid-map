<template>
  <md-app>
    <md-app-toolbar class="md-primary">
      <span class="md-title">COVID-19 Cases Interactive Map Web Application</span>
    </md-app-toolbar>
    <md-app-content>
      <nuxt/>
      <Snackbar/>
      <DigestFormDialog/>
    </md-app-content>
  </md-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Snackbar from '@/components/Snackbar.vue'
import DigestFormDialog from '@/components/DigestFormDialog.vue'

@Component({
  components: {
    Snackbar,
    DigestFormDialog,
  }
})
export default class Default extends Vue {}
</script>
