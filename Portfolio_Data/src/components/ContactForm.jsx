import { useState } from 'react'
import emailjs from 'emailjs-com'
import { toast } from 'react-toastify'
import { FiArrowUpRight, FiMail, FiMapPin } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { whatsappUrl } from '../data/portfolio.js'

const initialForm = { name: '', email: '', subject: '', message: '' }

function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)

  function updateForm(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const email = form.email.trim()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address.')
      return
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      toast.error('Contact form is not configured yet. Add the EmailJS values to .env.local.')
      return
    }

    setSubmitting(true)
    try {
      await emailjs.send(serviceId, templateId, {
        from_name: form.name.trim(),
        from_email: email,
        subject: form.subject.trim(),
        message: form.message.trim(),
      }, publicKey)
      toast.success('Message sent. Thank you for reaching out!')
      setForm(initialForm)
    } catch (error) {
      console.error('EmailJS contact form request failed:', error)
      toast.error('Your message could not be sent. Please try again or email directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="contact-grid">
      <div className="contact-copy">
        <span className="eyebrow">Let&apos;s connect</span>
        <h2>Have a question or<br /><span>an interesting problem?</span></h2>
        <p>I&apos;m based in Dindigul and open to entry-level opportunities, data projects, and conversations about making information more useful.</p>
        <a className="contact-detail contact-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
          <span className="contact-detail-icon"><FaWhatsapp /></span>
          <span><small>WhatsApp</small><strong>+91 90258 72798</strong></span>
          <FiArrowUpRight className="contact-detail-arrow" />
        </a>
        <div className="contact-detail">
          <span className="contact-detail-icon"><FiMail /></span>
          <span><small>Email</small><strong>Send a message using the form</strong></span>
        </div>
        <a className="contact-detail contact-location" href="https://maps.google.com/?q=Dindigul%2C+Tamil+Nadu" target="_blank" rel="noreferrer">
          <span className="contact-detail-icon"><FiMapPin /></span>
          <span><small>Based in</small><strong>Dindigul, Tamil Nadu, India</strong></span>
          <FiArrowUpRight className="contact-detail-arrow" />
        </a>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Name<input name="name" autoComplete="name" value={form.name} onChange={updateForm} placeholder="Your name" minLength="2" maxLength="100" required /></label>
          <label>Email<input name="email" type="email" autoComplete="email" value={form.email} onChange={updateForm} placeholder="you@example.com" maxLength="254" required /></label>
        </div>
        <label>Subject<input name="subject" value={form.subject} onChange={updateForm} placeholder="What would you like to discuss?" maxLength="150" required /></label>
        <label>Message<textarea name="message" value={form.message} onChange={updateForm} placeholder="Tell me a little about it..." rows="5" minLength="10" maxLength="3000" required /></label>
        <button className="button button-primary form-submit" type="submit" disabled={submitting}>
          {submitting ? 'Sending...' : 'Send message'} <FiArrowUpRight aria-hidden="true" />
        </button>
        <p className="form-privacy">Your details are only used to respond to your message.</p>
      </form>
    </div>
  )
}

export default ContactForm
