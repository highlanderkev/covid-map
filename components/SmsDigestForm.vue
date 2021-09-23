<template>
  <div v-if="show">
    <ValidationObserver v-slot="{ invalid }">
      <form class="md-layout" @submit.prevent="onSubmit">
        <md-card class="md-layout-item">
          <md-card-header>
            <div class="md-title">SMS Digest Form</div>
            <div class="md-subhead">Get this Data sent to your phone.</div>
          </md-card-header>

          <md-card-content>
            <ValidationProvider ref="phone" v-slot="{ errors }" name="phone" rules="required|phone"  >
              <md-field>
                <label>Phone Number</label>
                <md-input
                  v-model="phoneNumber"
                  v-mask="'(###) ###-####'"
                  type="tel"/>
                <span v-if="!errors[0]" class="md-helper-text" >Input a valid Phone Number and click 'Send SMS'.</span>
                <span v-if="errors[0]" class="md-helper-text">{{ errors[0] }}</span>
              </md-field>
            </ValidationProvider>
          </md-card-content>

          <md-card-actions>
            <md-button class="md-raised md-primary" type="submit" :disabled="invalid">Send SMS</md-button>
          </md-card-actions>
        </md-card>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { mask } from 'vue-the-mask'
import sendTwilioSms from '@/plugins/sendTwilioSms'
import { CountryCovidStatistics, SHOW_DIGESTFORM, SHOW_SNACKBAR } from '@/models'
import eventEmitter from '@/plugins/eventEmitter'

const smsPhoneNumber = process.env.TWILIO_SMS_NUMBER || ''

@Component({
  directives: {
    mask,
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  }
})
export default class SmsDigestForm extends Vue {
  phoneNumber = ''

  get show(): boolean {
    return this.$store.state.selectedCovidData && this.$store.state.selectedCovidData !== {}
  }

  get selectedCovidData(): CountryCovidStatistics {
    return this.$store.state.selectedCovidData
  }

  get selectedCountry(): string {
    return this.selectedCovidData.country || ''
  }

  get confirmedCasesForSelected(): number {
    return this.selectedCovidData?.confirmed || 0
  }

  get smsSender(): string {
    return smsPhoneNumber
  }

  get smsMessage(): string {
    return `
    ${this.selectedCountry} COVID-19 Statistics, ${this.selectedCountry} has ${this.confirmedCasesForSelected} confirmed cases.
    `
  }

  get formattedPhoneNumberE164() {
    return (this as any).$filterPhone(`1${this.phoneNumber}`, {
      plus: true,
      brackets: false,
      space: false,
      dash: false,
      areaCode: true,
    })
  }

  sendSms(): void {
    sendTwilioSms.sendSms({
      to: this.formattedPhoneNumberE164,
      from: this.smsSender,
      message: this.smsMessage
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
    this.sendSms()
  }
}
</script>
