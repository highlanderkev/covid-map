<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Digest Form</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="Email">
          <EmailDigestForm/>
        </md-tab>

        <md-tab md-label="SMS">
          <SmsDigestForm/>
        </md-tab>
      </md-tabs>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import EmailDigestForm from '@/components/EmailDigestForm.vue'
import SmsDigestForm from '@/components/SmsDigestForm.vue'
import { SHOW_DIGESTFORM } from '@/models'
import eventEmitter from '@/plugins/eventEmitter'

@Component({
  components: {
    EmailDigestForm,
    SmsDigestForm,
  },
})
export default class DigestFormDialog extends Vue {
  showDialog = false

  mounted() {
    eventEmitter.on(SHOW_DIGESTFORM, (toggle) => {
      this.showDialog = toggle || false
    })
  }
}
</script>
