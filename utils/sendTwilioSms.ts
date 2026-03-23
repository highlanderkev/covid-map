import axios from 'axios'

const api = axios.create({
  baseURL: '/api/',
})

interface SMS {
  to: string
  message: string
}

class SendTwilioSms {
  private errorHandler(error: any): never {
    // eslint-disable-next-line no-console
    console.error(`Error sending SMS: ${error}`)
    // Re-throw error so it can be properly handled by calling code
    throw error
  }

  async sendSms(sms: SMS): Promise<any> {
    return await api
      .request({
        url: '/sendTwilioSms',
        method: 'post',
        data: sms,
      })
      .catch(this.errorHandler)
  }
}
export default new SendTwilioSms()
