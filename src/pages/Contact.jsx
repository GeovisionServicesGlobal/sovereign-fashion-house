import { useState } from 'react'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { PageHero } from '../components/ui'
import Reveal from '../components/anim/Reveal'
import SocialIcon from '../components/SocialIcon'
import { contact, socials, waLink, productImg } from '../data/site'

const subjects = ['Order Support', 'Product Enquiry', 'Custom Order', 'Delivery Question', 'Wholesale / Partnership', 'Other']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: subjects[0], message: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const msg = `Hello Sovereign Fashion House,\n\nName: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\n${form.message}`
    window.open(waLink(msg), '_blank')
  }

  return (
    <>
      <PageHero
        breadcrumb="Contact"
        title="We’re here to help"
        subtitle="Order support, product questions, custom enquiries — reach us and we’ll respond quickly."
        image={productImg('red-trouser-with-white-top')}
      />

      <section className="bg-ivory py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal direction="right">
            <span className="eyebrow">Get in Touch</span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-forest-900 md:text-4xl">Order Support & Enquiries</h2>
            <p className="mt-5 text-forest-600">
              The fastest way to reach us is WhatsApp — we’ll help with sizing, availability, delivery and custom orders.
            </p>

            <div className="mt-8 space-y-5">
              <a href={`tel:${contact.phone}`} className="flex items-center gap-4 text-forest-700 hover:text-gold-700">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-soft text-gold"><Phone className="h-5 w-5" /></span>{contact.phoneDisplay}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-4 text-forest-700 hover:text-gold-700">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-soft text-gold"><Mail className="h-5 w-5" /></span>{contact.email}
              </a>
              <div className="flex items-center gap-4 text-forest-700">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-soft text-gold"><MapPin className="h-5 w-5" /></span>{contact.location}
              </div>
            </div>

            <div className="mt-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-forest-500">Follow Us</p>
              <div className="mt-4 flex gap-3">
                {socials.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-ivory transition-all hover:bg-gold hover:text-forest-900">
                    <SocialIcon name={s.icon} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <form onSubmit={submit} className="rounded-3xl bg-white p-8 shadow-card md:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block"><span className="text-sm font-medium text-forest-800">Full Name</span>
                  <input required value={form.name} onChange={set('name')} placeholder="Your name" className={inputCls} /></label>
                <label className="block"><span className="text-sm font-medium text-forest-800">Email</span>
                  <input type="email" required value={form.email} onChange={set('email')} placeholder="you@email.com" className={inputCls} /></label>
              </div>
              <label className="mt-5 block"><span className="text-sm font-medium text-forest-800">Subject</span>
                <select value={form.subject} onChange={set('subject')} className={inputCls}>{subjects.map((s) => <option key={s}>{s}</option>)}</select></label>
              <label className="mt-5 block"><span className="text-sm font-medium text-forest-800">Message</span>
                <textarea required rows={5} value={form.message} onChange={set('message')} placeholder="How can we help?" className={`${inputCls} resize-none`} /></label>
              <button type="submit" className="btn-gold mt-6 w-full">Send via WhatsApp <Send className="h-4 w-4" /></button>
              <p className="mt-3 text-center text-xs text-forest-500">Your message opens in WhatsApp so we can reply instantly.</p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}

const inputCls = 'mt-2 w-full rounded-xl border border-forest-900/15 bg-ivory px-4 py-3 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20'
