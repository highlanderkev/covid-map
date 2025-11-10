import { MailData } from '@sendgrid/helpers/classes/mail'
import sendGridMail from '@sendgrid/mail'
import { Handler } from '@netlify/functions'

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY || '')

interface Email extends MailData {}

const handler: Handler = async (event) => {
  try {
    // Parse and validate request body
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Request body is required' })
      }
    }

    const email: Email = JSON.parse(event.body);

    // Validate required fields
    if (!email.to || !email.from || !email.subject) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: to, from, subject' })
      }
    }

    // Send email via SendGrid
    const response = await sendGridMail.send(email as sendGridMail.MailDataRequired);

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error sending email:', error);

    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid JSON in request body' })
      }
    }

    // Handle SendGrid API errors
    return {
      statusCode: error.code || 500,
      body: JSON.stringify({
        error: 'Failed to send email',
        message: error.message
      })
    }
  }
}

export { handler };
