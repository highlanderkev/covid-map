<template>
  <div>
    <md-button class="md-raised" @click="sendEmail">Send Test Email</md-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// import sendGridMail from '@/plugins/sendGridMail'

@Component({})
export default class DigestForm extends Vue {
  sendEmail() {
    // sendGridMail.sendMail({
    //   to: 'kevinwestropp@live.com',
    //   from: 'mail@kevinpatrickwestropp.com',
    //   subject: 'This is a test',
    //   text: 'This is a test.',
    //   html: `<strong>this is a test</strong>`
    // }).then((response: any) => {
    //   console.log('response', response)
    // })
    // eslint-disable-next-line no-console
    console.log('test!')
  }
}
</script>
