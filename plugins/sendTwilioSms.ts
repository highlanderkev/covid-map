import axios from 'axios'

const api = axios.create({
  baseURL: '/.netlify/functions/'
})

interface SMS {
  to: string;
  from: string;
  message: string;
}

class SendTwilioSms {

  private errorHandler(error: any) {
    // eslint-disable-next-line no-console
    console.error(`${error}`)
  }

  async sendSms(sms: SMS): Promise<any> {
    return await api.request({
      url: '/sendTwilioSms',
      method: 'post',
      data: sms
    }).catch(this.errorHandler)
  }
}
export default new SendTwilioSms()
