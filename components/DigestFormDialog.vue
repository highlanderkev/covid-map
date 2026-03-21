<template>
  <v-dialog v-model="showDialog" max-width="600">
    <v-card>
      <v-card-title>Digest Form</v-card-title>
      <v-tabs v-model="tab" color="primary">
        <v-tab value="email">Email</v-tab>
        <v-tab value="sms">SMS</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="email">
            <EmailDigestForm />
          </v-window-item>
          <v-window-item value="sms">
            <SmsDigestForm />
          </v-window-item>
        </v-window>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="showDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import eventEmitter from '@/utils/eventEmitter'
import { SHOW_DIGESTFORM } from '@/models/events'

const showDialog = ref(false)
const tab = ref('email')

onMounted(() => {
  eventEmitter.on(SHOW_DIGESTFORM, (toggle: any) => {
    showDialog.value = toggle || false
  })
})
</script>
