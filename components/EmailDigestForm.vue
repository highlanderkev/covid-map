<template>
  <div v-if="show">
    <ValidationObserver v-slot="{ invalid }">
      <form class="md-layout" @submit.prevent="onSubmit">
        <md-card class="md-layout-item">
          <md-card-header>
            <div class="md-title">Email Digest Form</div>
            <div class="md-subhead">Get this Data sent to your inbox.</div>
          </md-card-header>

          <md-card-content>
            <ValidationProvider ref="email" v-slot="{ errors }" name="email" rules="required|email"  >
              <md-field>
                <label>Email Address</label>
                <md-input v-model="email" type="text"></md-input>
                <span v-if="!errors[0]" class="md-helper-text" >Input a valid Email and click 'Send Email'.</span>
                <span v-if="errors[0]" class="md-helper-text">{{ errors[0] }}</span>
              </md-field>
            </ValidationProvider>
          </md-card-content>
          <md-card-actions>
            <md-button class="md-raised md-primary" type="submit" :disabled="invalid">Send Email</md-button>
          </md-card-actions>
        </md-card>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import sendGridMail from '@/plugins/sendGridMail'
import eventEmitter from '@/plugins/eventEmitter'
import { CountryCovidStatistics, SHOW_DIGESTFORM, SHOW_SNACKBAR } from '@/models'

const sendGridEmailAddress = process.env.SENDGRID_EMAIL_ADDRESS

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  }
})
export default class EmailDigestForm extends Vue {
  email = ''

  get show(): boolean {
    return this.$store.state.selectedCovidData && this.$store.state.selectedCovidData !== {}
  }

  get selectedCovidData(): CountryCovidStatistics {
    return this.$store.state.selectedCovidData
  }

  get selectedCountry(): string {
    return this.selectedCovidData.country || ''
  }

  get emailSender(): string {
    return sendGridEmailAddress as string
  }

  get emailSubject(): string {
    return `${this.selectedCountry} COVID-19 Statistics`
  }

  get emailText(): string {
    return `
    Confirmed Cases: ${this.selectedCovidData?.confirmed}
    Deaths: ${this.selectedCovidData?.deaths}
    Incident Rate: ${this.selectedCovidData?.incidentRate}
    Mortality Rate: ${this.selectedCovidData?.mortalityRate}
    `
  }

  get emailHtml(): string {
    return `
    <table>
      <tr>
        <th>Confirmed Cases</th>
        <th>Deaths</th>
        <th>Incident Rate</th>
        <th>Mortality Rate</th>
      </tr>
      <tr>
        <td>${this.selectedCovidData?.confirmed}</td>
        <td>${this.selectedCovidData?.deaths}</td>
        <td>${this.selectedCovidData?.incidentRate}</td>
        <td>${this.selectedCovidData?.mortalityRate}</td>
      </tr>
    </table>`
  }

  sendEmail() {
    sendGridMail.sendMail({
      to: this.email,
      from: this.emailSender,
      subject: this.emailSubject,
      text: this.emailText,
      html: this.emailHtml
    }).then(() => {
      eventEmitter.emit(SHOW_SNACKBAR, 'Success!')
      eventEmitter.emit(SHOW_DIGESTFORM, false)
    }).catch(() => {
      eventEmitter.emit(SHOW_SNACKBAR, 'Failed to send, please try again later.')
      eventEmitter.emit(SHOW_DIGESTFORM, false)
    })
  }

  onSubmit(event: Event) {
    event.preventDefault()
    this.sendEmail()
  }
}
</script>
