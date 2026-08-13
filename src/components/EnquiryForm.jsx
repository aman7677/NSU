import { Check, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import Button from './Button'

const initialValues = { fullName: '', companyName: '', email: '', phone: '', productInterest: '', requirement: '', message: '' }
const interests = ['Sindoor Colour', 'Fluorescent Pigment', 'Colour Powder', 'Custom Colour', 'Other']
const fieldClass = 'mt-2 min-h-12 w-full border border-black/20 bg-white px-4 text-sm outline-none transition-colors placeholder:text-black/35 focus:border-black'

export default function EnquiryForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const updateValue = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
  const validate = () => {
    const nextErrors = {}
    if (!values.fullName.trim()) nextErrors.fullName = 'Please enter your full name.'
    if (!values.email.trim()) nextErrors.email = 'Please enter your email address.'
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = 'Please enter a valid email address.'
    if (!values.message.trim()) nextErrors.message = 'Please tell us about your enquiry.'
    return nextErrors
  }
  const submit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setLoading(true)
    window.setTimeout(() => { setLoading(false); setSubmitted(true) }, 850)
  }
  if (submitted) return <div role="status" className="flex min-h-[470px] flex-col justify-center border border-black bg-black p-7 text-white md:p-10"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-pigment-yellow text-black"><Check size={22} /></span><h2 className="mt-10 max-w-md text-4xl font-semibold leading-[.96] tracking-[-.065em]">Thank you. Your enquiry has been received.</h2><p className="mt-5 max-w-md text-sm leading-relaxed text-white/65">Our team will review the information you shared and get back to you.</p><button type="button" onClick={() => { setSubmitted(false); setValues(initialValues) }} className="mt-10 w-fit text-xs font-bold uppercase tracking-[.14em] text-pigment-yellow hover:text-white">Send another enquiry →</button></div>
  return <form noValidate onSubmit={submit} className="border border-black bg-white p-6 md:p-10"><div className="grid gap-x-5 md:grid-cols-2"><label className="mb-6 block text-[10px] font-bold uppercase tracking-[.15em]">Full Name *<input name="fullName" value={values.fullName} onChange={updateValue} aria-invalid={Boolean(errors.fullName)} className={`${fieldClass} ${errors.fullName ? 'border-pigment-red' : ''}`} placeholder="Your full name" />{errors.fullName && <span className="mt-2 block text-xs normal-case tracking-normal text-pigment-red">{errors.fullName}</span>}</label><label className="mb-6 block text-[10px] font-bold uppercase tracking-[.15em]">Company Name<input name="companyName" value={values.companyName} onChange={updateValue} className={fieldClass} placeholder="Company name" /></label><label className="mb-6 block text-[10px] font-bold uppercase tracking-[.15em]">Email *<input type="email" name="email" value={values.email} onChange={updateValue} aria-invalid={Boolean(errors.email)} className={`${fieldClass} ${errors.email ? 'border-pigment-red' : ''}`} placeholder="you@company.com" />{errors.email && <span className="mt-2 block text-xs normal-case tracking-normal text-pigment-red">{errors.email}</span>}</label><label className="mb-6 block text-[10px] font-bold uppercase tracking-[.15em]">Phone<input type="tel" name="phone" value={values.phone} onChange={updateValue} className={fieldClass} placeholder="Phone number" /></label><label className="mb-6 block text-[10px] font-bold uppercase tracking-[.15em]">Product Interest<select name="productInterest" value={values.productInterest} onChange={updateValue} className={fieldClass}><option value="">Select an interest</option>{interests.map((interest) => <option key={interest} value={interest}>{interest}</option>)}</select></label><label className="mb-6 block text-[10px] font-bold uppercase tracking-[.15em]">Quantity / Requirement<input name="requirement" value={values.requirement} onChange={updateValue} className={fieldClass} placeholder="Tell us what you need" /></label></div><label className="block text-[10px] font-bold uppercase tracking-[.15em]">Message *<textarea name="message" value={values.message} onChange={updateValue} aria-invalid={Boolean(errors.message)} rows="5" className={`${fieldClass} resize-y py-3 ${errors.message ? 'border-pigment-red' : ''}`} placeholder="Share your application, shade or requirement." />{errors.message && <span className="mt-2 block text-xs normal-case tracking-normal text-pigment-red">{errors.message}</span>}</label><div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/15 pt-6"><p className="max-w-sm text-xs leading-relaxed text-black/50">Fields marked with * are required. This form does not submit technical specifications.</p><Button type="submit" disabled={loading} className="min-w-52 justify-between disabled:cursor-wait disabled:opacity-65">{loading ? <>Sending <LoaderCircle className="animate-spin" size={17} /></> : 'Send Enquiry'}</Button></div></form>
}
