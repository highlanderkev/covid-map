import { MailData } from '@sendgrid/helpers/classes/mail'
import sendGridMail from '@sendgrid/mail'
import { Handler } from '@netlify/functions'

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY || '')

interface Email extends MailData {}

function errorHandler(error: any) {
  // eslint-disable-next-line no-console
  console.error(`${error}`)
}

const handler: Handler = async (event) => {
  const email: Email = JSON.parse(event.body || '')
  const response = await sendGridMail.send(email as sendGridMail.MailDataRequired).catch(errorHandler)
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export { handler };
