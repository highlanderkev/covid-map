import axios from 'axios'

const api = axios.create({
  baseURL: '/api/',
})

interface Email {
  to: string
  subject: string
  text?: string
  html?: string
}

class SendGridMail {
  private errorHandler(error: any): never {
    // eslint-disable-next-line no-console
    console.error(`Error sending email: ${error}`)
    // Re-throw error so it can be properly handled by calling code
    throw error
  }

  async sendMail(email: Email): Promise<any> {
    return await api
      .request({
        url: '/sendGridMail',
        method: 'post',
        data: email,
      })
      .catch(this.errorHandler)
  }
}
export default new SendGridMail()
