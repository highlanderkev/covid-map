<template>
  <md-snackbar position="center" :md-duration="duration" :md-active.sync="showSnackbar" md-persistent>
    <span>{{ text }}</span>
    <md-button class="md-primary" @click="dismiss">Dismiss</md-button>
  </md-snackbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import eventEmitter from '@/plugins/eventEmitter'
import { SHOW_SNACKBAR } from '@/models'

@Component({})
export default class Snackbar extends Vue {
  duration = 4000
  showSnackbar = false
  text = ''

  dismiss(event: Event) {
    event.preventDefault()
    this.showSnackbar = false
  }

  mounted() {
    eventEmitter.on(SHOW_SNACKBAR, (msg) => {
      if(msg) {
        this.text = msg
        this.showSnackbar = true
      }
    })
  }
}
</script>
