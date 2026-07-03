import { useState } from 'react'
import { Ruler, Palette, CalendarClock, Sparkles } from 'lucide-react'
import { PageHero, SectionHeading } from '../components/ui'
import Reveal, { StaggerGroup, StaggerItem } from '../components/anim/Reveal'
import SocialIcon from '../components/SocialIcon'
import { waLink } from '../data/site'

const steps = [
  { icon: Palette, title: 'Share Your Vision', text: 'Tell us the occasion, style and fabric you have in mind.' },
  { icon: Ruler, title: 'Measurements & Fitting', text: 'We take precise measurements for a flawless, personal fit.' },
  { icon: Sparkles, title: 'We Craft It', text: 'Our tailors bring your one-of-a-kind piece to life.' },
  { icon: CalendarClock, title: 'Delivered on Time', text: 'Ready ahead of your event, wherever you are.' },
]

const occasions = ['Wedding', 'Corporate / Power Suit', 'Gala / Red Carpet', 'Church / Ministry', 'Traditional / Cultural', 'Everyday Elegance']

export default function CustomOrders() {
  const [form, setForm] = useState({ name: '', occasion: occasions[0], gender: 'Women', fabric: '', budget: '', timeline: '', details: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const msg = `Hello Sovereign Fashion House, I'd like a CUSTOM ORDER:\n\nName: ${form.name}\nFor: ${form.gender}\nOccasion: ${form.occasion}\nFabric preference: ${form.fabric || '—'}\nBudget: ${form.budget || '—'}\nTimeline: ${form.timeline || '—'}\n\nDetails: ${form.details || '—'}`
    window.open(waLink(msg), '_blank')
  }

  return (
    <>
      <PageHero
        breadcrumb="Custom Orders"
        title="Bespoke, made just for you"
        subtitle="Occasion gowns, power suits and statement pieces — tailored to your measurements, fabric and timeline."
        image="/assets/products/4-piece-suits.jpg"
      />

      {/* Steps */}
      <section className="bg-ivory py-20">
        <div className="container-x">
          <Reveal><SectionHeading center eyebrow="How It Works" title="Four steps to your custom piece" /></Reveal>
          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <StaggerItem key={s.title}>
                <div className="card relative h-full rounded-2xl bg-white p-7 shadow-soft hover:-translate-y-2 hover:shadow-card">
                  <span className="absolute right-5 top-4 font-serif text-4xl font-bold text-forest-900/5">0{i + 1}</span>
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-forest text-gold"><s.icon className="h-6 w-6" /></div>
                  <h3 className="mt-5 font-serif text-lg font-semibold text-forest-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-forest-600">{s.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal direction="right">
            <span className="eyebrow">Bespoke Enquiry</span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-forest-900 md:text-4xl">Let’s create something unforgettable</h2>
            <p className="mt-5 text-forest-600">
              Fill in a few details and we’ll continue the conversation on WhatsApp — sharing fabric options, pricing and
              your fitting schedule.
            </p>
            <img src="/assets/products/orange-pallazo-with-white-top.jpg" alt="" className="mt-8 hidden rounded-3xl object-cover shadow-card lg:block" />
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <form onSubmit={submit} className="rounded-3xl bg-ivory p-7 shadow-soft md:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name"><input required value={form.name} onChange={set('name')} placeholder="Your name" className={inputCls} /></Field>
                <Field label="For">
                  <select value={form.gender} onChange={set('gender')} className={inputCls}>
                    {['Women', 'Men', 'Kids'].map((g) => <option key={g}>{g}</option>)}
                  </select>
                </Field>
                <Field label="Occasion">
                  <select value={form.occasion} onChange={set('occasion')} className={inputCls}>
                    {occasions.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Fabric Preference"><input value={form.fabric} onChange={set('fabric')} placeholder="e.g. Ankara, silk, wool" className={inputCls} /></Field>
                <Field label="Budget (USD)"><input value={form.budget} onChange={set('budget')} placeholder="e.g. $250" className={inputCls} /></Field>
                <Field label="Needed By"><input value={form.timeline} onChange={set('timeline')} placeholder="e.g. in 3 weeks" className={inputCls} /></Field>
              </div>
              <Field label="Design Details" className="mt-5">
                <textarea rows={4} value={form.details} onChange={set('details')} placeholder="Describe the style, colour and any inspiration…" className={`${inputCls} resize-none`} />
              </Field>
              <button type="submit" className="btn-gold mt-6 w-full">
                <SocialIcon name="whatsapp" className="h-5 w-5" /> Send Enquiry on WhatsApp
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}

const inputCls = 'mt-2 w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20'
function Field({ label, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium text-forest-800">{label}</span>
      {children}
    </label>
  )
}
