
import * as functions from 'firebase-functions'
import Client from 'twilio'

const twilioClient = Client(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

interface SMS {
  to: string;
  from: string;
  message: string;
}

export const sendTwilioSms = functions.https.onRequest(async (req, res) => {
  try {
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({ error: 'Request body is required' })
      return
    }

    const sms: SMS = req.body

    // Validate required fields
    if (!sms.to || !sms.from || !sms.message) {
      res.status(400).json({ error: 'Missing required fields: to, from, message' })
      return
    }

    // Send SMS via Twilio
    const response = await twilioClient.messages.create({
      to: sms.to,
      from: sms.from,
      body: sms.message
    })

    res.status(200).json(response)
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error sending SMS:', error)

    // Handle Twilio API errors
    const status = Number(error?.status)
    const safeStatus =
      Number.isInteger(status) && status >= 400 && status <= 599 ? status : 500

    res.status(safeStatus).json({
      error: 'Failed to send SMS',
      message: error?.message,
    })
  }
})
