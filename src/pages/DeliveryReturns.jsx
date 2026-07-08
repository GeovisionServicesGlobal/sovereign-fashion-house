import { Truck, RefreshCw, Clock, ShieldCheck, MapPin, PackageCheck } from 'lucide-react'
import { PageHero, SectionHeading } from '../components/ui'
import Reveal, { StaggerGroup, StaggerItem } from '../components/anim/Reveal'
import { CTAWhatsApp } from '../components/CTAWhatsApp'
import { productImg } from '../data/site'

const cards = [
  { icon: Clock, title: 'Next-Day Delivery', text: 'Within Nairobi, order before cut-off for next-day delivery.' },
  { icon: Truck, title: 'Nationwide Shipping', text: 'Fast, tracked delivery across Kenya via trusted couriers.' },
  { icon: MapPin, title: 'Pickup Available', text: 'Prefer to collect? Arrange a convenient pickup on WhatsApp.' },
  { icon: RefreshCw, title: 'Easy Exchanges', text: 'Size or fit not right? We’ll help you exchange within 7 days.' },
  { icon: PackageCheck, title: 'Careful Packaging', text: 'Every order is packaged with care to arrive in perfect condition.' },
  { icon: ShieldCheck, title: 'Quality Guarantee', text: 'Premium craftsmanship on every piece, guaranteed.' },
]

const faqs = [
  { q: 'How long does delivery take?', a: 'Within Nairobi, next-day delivery is available. Countrywide, delivery typically takes 2–4 business days depending on your location.' },
  { q: 'How much is shipping?', a: 'Shipping is calculated by location and confirmed with you on WhatsApp before dispatch, so there are never any surprises.' },
  { q: 'Can I return or exchange an item?', a: 'Yes. Unworn items with tags can be exchanged within 7 days. Chat with us on WhatsApp to arrange it quickly.' },
  { q: 'Do you ship internationally?', a: 'Yes, international shipping can be arranged. Message us with your location for a quote and timeline.' },
  { q: 'How do I pay?', a: 'Orders are confirmed over WhatsApp, where we share secure payment options including mobile money and bank transfer.' },
]

export default function DeliveryReturns() {
  return (
    <>
      <PageHero
        breadcrumb="Help"
        title="Delivery & Returns"
        subtitle="Fast, reliable delivery and hassle-free exchanges — so you can shop with total confidence."
        image={productImg('blazers')}
      />

      <section className="bg-ivory py-20">
        <div className="container-x">
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c) => (
              <StaggerItem key={c.title}>
                <div className="card h-full rounded-2xl bg-white p-7 shadow-soft hover:-translate-y-1 hover:shadow-card">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-forest text-gold"><c.icon className="h-6 w-6" /></div>
                  <h3 className="mt-5 font-serif text-lg font-semibold text-forest-900">{c.title}</h3>
                  <p className="mt-2 text-sm text-forest-600">{c.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-x max-w-3xl">
          <Reveal><SectionHeading center eyebrow="Good to Know" title="Frequently Asked Questions" /></Reveal>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => <FAQ key={i} {...f} />)}
          </div>
        </div>
      </section>

      <CTAWhatsApp title="Still have a question?" text="Our team is a message away on WhatsApp — happy to help with sizing, delivery or your order." />
    </>
  )
}

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
function FAQ({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="overflow-hidden rounded-2xl border border-forest-900/10 bg-ivory">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
        <span className="font-serif text-lg font-semibold text-forest-900">{q}</span>
        <ChevronDown className={`h-5 w-5 flex-shrink-0 text-gold transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-forest-600">{a}</p>
        </div>
      </div>
    </div>
  )
}
