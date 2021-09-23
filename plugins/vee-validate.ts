import { extend } from 'vee-validate'
import { required, email, regex } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This fields is required.'
})

extend('email', {
  ...email,
  message: 'Please enter a valid email address.'
})

extend('phone', {
  ...regex,
  validate(value) {
    const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
    return phoneRegex.test(value)
  },
  message: 'Please provide a valid phone number.',
})
