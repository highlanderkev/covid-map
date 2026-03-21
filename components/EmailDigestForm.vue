<template>
  <div v-if="show">
    <v-form ref="form" v-model="valid" @submit.prevent="onSubmit" class="mt-4">
      <v-card variant="flat">
        <v-card-title class="px-0">Email Digest Form</v-card-title>
        <v-card-subtitle class="px-0">Get this Data sent to your inbox.</v-card-subtitle>

        <v-card-text class="px-0">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email Address"
            type="email"
            variant="outlined"
            density="compact"
            required
            hint="Input a valid Email and click 'Send Email'."
            persistent-hint
          ></v-text-field>
        </v-card-text>

        <v-card-actions class="px-0">
          <v-btn color="primary" type="submit" variant="elevated" :disabled="!valid">Send Email</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCovidStore } from '@/stores/covid'
import sendGridMail from '@/utils/sendGridMail'
import eventEmitter from '@/utils/eventEmitter'

const store = useCovidStore()
const config = useRuntimeConfig()

const valid = ref(false)
const email = ref('')
const emailRules = [
  (v: string) => !!v || 'E-mail is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]

const show = computed(() => Object.keys(store.selectedCovidData || {}).length > 0)
const selectedCovidData = computed(() => store.selectedCovidData as Record<string, any>)
const selectedCountry = computed(() => selectedCovidData.value.country || '')

const emailSubject = computed(() => `${selectedCountry.value} COVID-19 Statistics`)
const emailText = computed(() => `
  Confirmed Cases: ${selectedCovidData.value?.confirmed}
  Deaths: ${selectedCovidData.value?.deaths}
  Incident Rate: ${selectedCovidData.value?.incidentRate}
  Mortality Rate: ${selectedCovidData.value?.mortalityRate}
`)
const emailHtml = computed(() => `
  <table>
    <tr><th>Confirmed Cases</th><th>Deaths</th><th>Incident Rate</th><th>Mortality Rate</th></tr>
    <tr>
      <td>${selectedCovidData.value?.confirmed}</td>
      <td>${selectedCovidData.value?.deaths}</td>
      <td>${selectedCovidData.value?.incidentRate}</td>
      <td>${selectedCovidData.value?.mortalityRate}</td>
    </tr>
  </table>
`)

async function onSubmit() {
  if (!valid.value) return
  
  try {
    await sendGridMail.sendMail({
      to: email.value,
      from: config.public.SENDGRID_EMAIL_ADDRESS as string,
      subject: emailSubject.value,
      text: emailText.value,
      html: emailHtml.value
    })
    eventEmitter.emit('SHOW_SNACKBAR', 'Success!')
    eventEmitter.emit('SHOW_DIGESTFORM', false)
  } catch (err) {
    eventEmitter.emit('SHOW_SNACKBAR', 'Failed to send, please try again later.')
    eventEmitter.emit('SHOW_DIGESTFORM', false)
  }
}
</script>
