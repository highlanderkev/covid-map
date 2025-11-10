
import { Handler } from '@netlify/functions'
import Client from 'twilio'

const twilioClient = Client(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

interface SMS {
  to: string;
  from: string;
  message: string;
}

const handler: Handler = async (event) => {
  try {
    // Parse and validate request body
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Request body is required' })
      }
    }

    const sms: SMS = JSON.parse(event.body);

    // Validate required fields
    if (!sms.to || !sms.from || !sms.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: to, from, message' })
      }
    }

    // Send SMS via Twilio
    const response = await twilioClient.messages.create({
      to: sms.to,
      from: sms.from,
      body: sms.message
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error sending SMS:', error);

    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid JSON in request body' })
      }
    }

    // Handle Twilio API errors
    return {
      statusCode: error.status || 500,
      body: JSON.stringify({
        error: 'Failed to send SMS',
        message: error.message
      })
    }
  }
}

export { handler };
