
import { Handler } from '@netlify/functions'
import Client from 'twilio'

const twilioClient = Client(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

interface SMS {
  to: string;
  from: string;
  message: string;
}

function errorHandler(error: any) {
  // eslint-disable-next-line no-console
  console.error(`${error}`)
}

const handler: Handler = async (event) => {
  const sms: SMS = JSON.parse(event.body || '')
  const response = await twilioClient.messages.create({
    to: sms.to,
    from: sms.from,
    body: sms.message
  }).catch(errorHandler);
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export { handler };
