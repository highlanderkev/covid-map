import axios, { AxiosError, AxiosResponse } from 'axios'
import { MailData } from '@sendgrid/helpers/classes/mail'

const api = axios.create({
  baseURL: '/.netlify/functions/'
})

interface Email extends MailData {}

class SendGridMail {

  private errorHandler(error: any) {
    // eslint-disable-next-line no-console
    console.error(`${error}`)
  }

  async sendMail(email: Email): Promise<any> {
    return await api.request({
      url: '/sendGridMail',
      method: 'post',
      data: email
    }).catch(this.errorHandler)
  }
}
export default new SendGridMail()
