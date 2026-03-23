import * as functions from 'firebase-functions'
import Client from 'twilio'

interface SMS {
  to: string
  message: string
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

export const sendTwilioSms = functions.https.onRequest(async (req, res) => {
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

    const sms: SMS = req.body

    // Validate required fields
    if (!sms.to || !sms.message) {
      res.status(400).json({ error: 'Missing required fields: to, message' })
      return
    }

    // Use server-side configured sender number to prevent abuse
    const fromNumber = process.env.TWILIO_SMS_NUMBER
    if (!fromNumber) {
      res
        .status(500)
        .json({ error: 'Server misconfiguration: sender number not set' })
      return
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    if (!accountSid || !authToken) {
      res.status(500).json({ error: 'Server misconfiguration: Twilio credentials not set' })
      return
    }
    const twilioClient = Client(accountSid, authToken)

    // Send SMS via Twilio
    const response = await twilioClient.messages.create({
      to: sms.to,
      from: fromNumber,
      body: sms.message,
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
