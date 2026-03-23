import sgMail from '@sendgrid/mail'
import * as functions from 'firebase-functions'

interface Email {
  to: string
  subject: string
  text?: string
  html?: string
}

// Basic in-memory rate limiter (per Cloud Function instance)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5 // max requests per window per IP
const RATE_WINDOW_MS = 60 * 1000 // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT
}

export const sendGridMail = functions.https.onRequest(async (req, res) => {
  try {
    // Rate limiting
    const clientIp =
      req.ip || (req.headers['x-forwarded-for'] as string) || 'unknown'
    if (isRateLimited(clientIp)) {
      res
        .status(429)
        .json({ error: 'Too many requests, please try again later' })
      return
    }

    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({ error: 'Request body is required' })
      return
    }

    const email: Email = req.body

    // Validate required fields
    if (!email.to || !email.subject) {
      res.status(400).json({ error: 'Missing required fields: to, subject' })
      return
    }

    // Enforce server-side sender address to prevent open relay abuse
    const fromAddress = process.env.SENDGRID_EMAIL_ADDRESS
    if (!fromAddress) {
      res
        .status(500)
        .json({ error: 'Server misconfiguration: sender address not set' })
      return
    }

    // Resolve API key at request time so deployments do not fail when env vars
    // are unavailable during source analysis.
    const sendGridApiKey =
      (functions.config().sendgrid && functions.config().sendgrid.api_key) ||
      process.env.SENDGRID_API_KEY ||
      ''
    if (!sendGridApiKey) {
      res.status(500).json({ error: 'Server misconfiguration: SendGrid key not set' })
      return
    }
    sgMail.setApiKey(sendGridApiKey)

    // Send email via SendGrid
    const mailData: sgMail.MailDataRequired = {
      to: email.to,
      from: fromAddress,
      subject: email.subject,
      text: email.text ?? '',
      ...(email.html ? { html: email.html } : {}),
    }
    const response = await sgMail.send(mailData)

    res.status(200).json(response)
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error sending email:', error)

    // Handle SendGrid API errors
    const statusCodeFromResponse = error?.response?.statusCode
    const statusCodeFromCode = Number(error?.code)
    const statusCode =
      typeof statusCodeFromResponse === 'number' &&
      Number.isFinite(statusCodeFromResponse)
        ? statusCodeFromResponse
        : Number.isFinite(statusCodeFromCode)
          ? statusCodeFromCode
          : 500

    res.status(statusCode).json({
      error: 'Failed to send email',
      message: error.message,
    })
  }
})
