import { MailData } from '@sendgrid/helpers/classes/mail'
import sgMail from '@sendgrid/mail'
import * as functions from 'firebase-functions'

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

interface Email extends MailData {}

export const sendGridMail = functions.https.onRequest(async (req, res) => {
  try {
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({ error: 'Request body is required' })
      return
    }

    const email: Email = req.body

    // Validate required fields
    if (!email.to || !email.from || !email.subject) {
      res.status(400).json({ error: 'Missing required fields: to, from, subject' })
      return
    }

    // Send email via SendGrid
    const response = await sgMail.send(email as sgMail.MailDataRequired)

    res.status(200).json(response)
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error sending email:', error)

    // Handle SendGrid API errors
    res.status(error.code || 500).json({
      error: 'Failed to send email',
      message: error.message
    })
  }
})
