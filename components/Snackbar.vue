<template>
  <v-snackbar v-model="showSnackbar" :timeout="duration" location="top">
    {{ text }}
    <template v-slot:actions>
      <v-btn color="primary" variant="text" @click="dismiss">Dismiss</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import eventEmitter from '@/utils/eventEmitter'
import { SHOW_SNACKBAR } from '@/models/events'

const duration = ref(4000)
const showSnackbar = ref(false)
const text = ref('')

function dismiss() {
  showSnackbar.value = false
}

onMounted(() => {
  eventEmitter.on(SHOW_SNACKBAR, (msg: any) => {
    if (msg) {
      text.value = msg
      showSnackbar.value = true
    }
  })
})
</script>
