<template>
  <div v-if="show">
    <v-form ref="form" v-model="valid" @submit.prevent="onSubmit" class="mt-4">
      <v-card variant="flat">
        <v-card-title class="px-0">SMS Digest Form</v-card-title>
        <v-card-subtitle class="px-0">Get this Data sent to your phone.</v-card-subtitle>

        <v-card-text class="px-0">
          <v-text-field
            v-model="phoneNumber"
            :rules="phoneRules"
            label="Phone Number (e.g. 5551234567)"
            type="tel"
            variant="outlined"
            density="compact"
            required
            hint="Input a valid 10-digit Phone Number"
            persistent-hint
          ></v-text-field>
        </v-card-text>

        <v-card-actions class="px-0">
          <v-btn color="primary" type="submit" variant="elevated" :disabled="!valid">Send SMS</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCovidStore } from '@/stores/covid'
import sendTwilioSms from '@/utils/sendTwilioSms'
import eventEmitter from '@/utils/eventEmitter'

const store = useCovidStore()
const config = useRuntimeConfig()

const valid = ref(false)
const phoneNumber = ref('')
const phoneRules = [
  (v: string) => !!v || 'Phone number is required',
  (v: string) => v.replace(/\D/g,'').length >= 10 || 'Must be a valid 10-digit number'
]

const show = computed(() => Object.keys(store.selectedCovidData || {}).length > 0)
const selectedCovidData = computed(() => store.selectedCovidData as Record<string, any>)
const selectedCountry = computed(() => selectedCovidData.value.country || '')
const confirmedCasesForSelected = computed(() => selectedCovidData.value.confirmed || 0)

const smsMessage = computed(() => `
  ${selectedCountry.value} COVID-19 Statistics, ${selectedCountry.value} has ${confirmedCasesForSelected.value} confirmed cases.
`)

// basic E164 formatting fallback
const formattedPhoneNumberE164 = computed(() => `+1${phoneNumber.value.replace(/\D/g, '')}`)

async function onSubmit() {
  if (!valid.value) return
  
  try {
    await sendTwilioSms.sendSms({
      to: formattedPhoneNumberE164.value,
      message: smsMessage.value
    })
    eventEmitter.emit('SHOW_SNACKBAR', 'Success!')
    eventEmitter.emit('SHOW_DIGESTFORM', false)
  } catch (err) {
    eventEmitter.emit('SHOW_SNACKBAR', 'Failed to send, please try again later.')
    eventEmitter.emit('SHOW_DIGESTFORM', false)
  }
}
</script>
