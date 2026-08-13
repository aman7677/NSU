import emailjs from '@emailjs/browser'
import { Check, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import Button from './Button'

const initialValues = { fullName: '', companyName: '', email: '', phone: '', productInterest: '', requirement: '', message: '', website: '' }
const interests = ['Sindoor Colour', 'Fluorescent Pigment', 'Colour Powder', 'Custom Colour', 'Other']
const fieldClass = 'mt-2 min-h-12 w-full border border-black/20 bg-white px-4 text-sm outline-none transition-colors placeholder:text-black/35 focus:border-black'
const emailPattern = /^\S+@\S+\.\S+$/
const phonePattern = /^[+()\-\s\d]{7,20}$/

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

function isConfigured(value) {
  return value && !value.startsWith('your_')
}

export default function EnquiryForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const updateValue = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setSubmitError('')
  }

  const validate = (formValues) => {
    const nextErrors = {}
    if (!formValues.fullName) nextErrors.fullName = 'Please enter your full name.'
    if (!formValues.email) nextErrors.email = 'Please enter your email address.'
    else if (!emailPattern.test(formValues.email)) nextErrors.email = 'Please enter a valid email address.'
    if (formValues.phone && !phonePattern.test(formValues.phone)) nextErrors.phone = 'Please enter a valid phone number.'
    if (!formValues.productInterest) nextErrors.productInterest = 'Please select a product interest.'
    if (!formValues.message) nextErrors.message = 'Please tell us about your enquiry.'
    return nextErrors
  }

  const submit = async (event) => {
    event.preventDefault()
    if (loading) return
    const trimmedValues = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()]))
    const nextErrors = validate(trimmedValues)
    setErrors(nextErrors)
    setSubmitError('')
    if (Object.keys(nextErrors).length || trimmedValues.website) return
    if (!Object.values(emailJsConfig).every(isConfigured)) {
      console.error('EmailJS is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to .env.')
      setSubmitError('Enquiries are temporarily unavailable. Please contact us directly while the email service is being configured.')
      return
    }
    setLoading(true)
    try {
      await emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, {
        name: trimmedValues.fullName,
        company: trimmedValues.companyName || 'Not provided',
        email: trimmedValues.email,
        phone: trimmedValues.phone || 'Not provided',
        product: trimmedValues.productInterest,
        message: trimmedValues.message,
      }, { publicKey: emailJsConfig.publicKey })
      setValues(initialValues)
      setSubmitted(true)
    } catch (error) {
      console.error('EmailJS enquiry submission failed:', error)
      setSubmitError('Something went wrong while sending your enquiry. Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) return <div role="status" aria-live="polite" className="flex min-h-[470px] flex-col justify-center border border-black bg-black p-7 text-white md:p-10"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-pigment-yellow text-black"><Check size={22} /></span><h2 className="mt-10 max-w-md text-4xl font-semibold leading-[.96] tracking-[-.065em]">Thank you for your enquiry. Our team will get back to you shortly.</h2><p className="mt-5 max-w-md text-sm leading-relaxed text-white/65">Your submission has been received successfully.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-10 w-fit text-xs font-bold uppercase tracking-[.14em] text-pigment-yellow hover:text-white">Send another enquiry →</button></div>

  return <form noValidate onSubmit={submit} className="border border-black bg-white p-6 md:p-10"><div className="grid gap-x-5 md:grid-cols-2"><label className="mb-6 block text-[10px] font-bold uppercase tracking-[.15em]">Full Name *<input name="fullName" value={values.fullName} onChange={updateValue} autoComplete="name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined} className={`${fieldClass} ${errors.fullName ? 'border-pigment-red' : ''}`} placeholder="Your full name" />{errors.fullName && <span id="fullName-error" className="mt-2 block text-xs normal-case tracking-normal text-pigment-red">{errors.fullName}</span>}</label><label className="mb-6 block text-[10px] font-bold uppercase tracking-[.15em]">Company Name<input name="companyName" value={values.companyName} onChange={updateValue} autoComplete="organization" className={fieldClass} placeholder="Company name" /></label><label className="mb-6 block text-[10px] font-bold uppercase tracking-[.15em]">Email *<input type="email" name="email" value={values.email} onChange={updateValue} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} className={`${fieldClass} ${errors.email ? 'border-pigment-red' : ''}`} placeholder="you@company.com" />{errors.email && <span id="email-error" className="mt-2 block text-xs normal-case tracking-normal text-pigment-red">{errors.email}</span>}</label><label className="mb-6 block text-[10px] font-bold uppercase tracking-[.15em]">Phone<input type="tel" name="phone" value={values.phone} onChange={updateValue} autoComplete="tel" inputMode="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} className={`${fieldClass} ${errors.phone ? 'border-pigment-red' : ''}`} placeholder="Phone number" />{errors.phone && <span id="phone-error" className="mt-2 block text-xs normal-case tracking-normal text-pigment-red">{errors.phone}</span>}</label><label className="mb-6 block text-[10px] font-bold uppercase tracking-[.15em]">Product Interest *<select name="productInterest" value={values.productInterest} onChange={updateValue} aria-invalid={Boolean(errors.productInterest)} aria-describedby={errors.productInterest ? 'productInterest-error' : undefined} className={`${fieldClass} ${errors.productInterest ? 'border-pigment-red' : ''}`}><option value="">Select an interest</option>{interests.map((interest) => <option key={interest} value={interest}>{interest}</option>)}</select>{errors.productInterest && <span id="productInterest-error" className="mt-2 block text-xs normal-case tracking-normal text-pigment-red">{errors.productInterest}</span>}</label><label className="mb-6 block text-[10px] font-bold uppercase tracking-[.15em]">Quantity / Requirement<input name="requirement" value={values.requirement} onChange={updateValue} className={fieldClass} placeholder="Tell us what you need" /></label></div><label className="sr-only" aria-hidden="true">Website<input name="website" value={values.website} onChange={updateValue} autoComplete="off" tabIndex="-1" /></label><label className="block text-[10px] font-bold uppercase tracking-[.15em]">Message *<textarea name="message" value={values.message} onChange={updateValue} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} rows="5" className={`${fieldClass} resize-y py-3 ${errors.message ? 'border-pigment-red' : ''}`} placeholder="Share your application, shade or requirement." />{errors.message && <span id="message-error" className="mt-2 block text-xs normal-case tracking-normal text-pigment-red">{errors.message}</span>}</label>{submitError && <p role="alert" className="mt-5 text-sm leading-relaxed text-pigment-red">{submitError}</p>}<div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/15 pt-6"><p className="max-w-sm text-xs leading-relaxed text-black/50">Fields marked with * are required. This form does not submit technical specifications.</p><Button type="submit" disabled={loading} aria-busy={loading} className="min-w-52 justify-between disabled:cursor-wait disabled:opacity-65">{loading ? <>Sending... <LoaderCircle className="animate-spin" size={17} /></> : 'Send Enquiry'}</Button></div></form>
}
