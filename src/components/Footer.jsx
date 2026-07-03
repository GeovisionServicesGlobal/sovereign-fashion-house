import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import SocialIcon from './SocialIcon'
import { brand, contact, socials } from '../data/site'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
    setTimeout(() => setSent(false), 3500)
  }

  return (
    <footer className="relative overflow-hidden bg-forest-950 text-ivory">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />

      {/* newsletter */}
      <div className="border-b border-white/10">
        <div className="container-x grid items-center gap-6 py-12 md:grid-cols-2">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white md:text-3xl">Get exclusive offers & updates</h3>
            <p className="mt-2 text-ivory/70">Style tips, new drops and private-sale invitations.</p>
          </div>
          <form onSubmit={submit} className="flex overflow-hidden rounded-full border border-white/15 bg-white/5 focus-within:border-gold">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-transparent px-5 py-3.5 text-sm text-ivory placeholder:text-ivory/40 focus:outline-none"
            />
            <button type="submit" className="flex items-center gap-2 bg-gold px-6 text-sm font-semibold text-forest-900 transition hover:bg-gold-400">
              Subscribe <Send className="h-4 w-4" />
            </button>
          </form>
          {sent && <p className="text-xs text-gold-200 md:col-span-2">Thank you — you’re on the list! 🎉</p>}
        </div>
      </div>

      <div className="container-x relative grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <img src={brand.logoWhite} alt={brand.name} className="h-16 w-auto rounded-xl" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/75">{brand.philosophy}</p>
          <div className="mt-6 flex gap-3">
            {socials.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-ivory/80 transition-all hover:border-gold hover:bg-gold hover:text-forest-900">
                <SocialIcon name={s.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">Shop</h4>
          <ul className="mt-5 space-y-3 text-sm text-ivory/80">
            <li><Link to="/shop?gender=Women" className="link-underline hover:text-gold-200">Women</Link></li>
            <li><Link to="/shop?gender=Men" className="link-underline hover:text-gold-200">Men</Link></li>
            <li><Link to="/shop?gender=Kids" className="link-underline hover:text-gold-200">Kids</Link></li>
            <li><Link to="/lookbook" className="link-underline hover:text-gold-200">Lookbook</Link></li>
            <li><Link to="/custom-orders" className="link-underline hover:text-gold-200">Custom Orders</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">Help</h4>
          <ul className="mt-5 space-y-3 text-sm text-ivory/80">
            <li><Link to="/about" className="link-underline hover:text-gold-200">About Us</Link></li>
            <li><Link to="/delivery-returns" className="link-underline hover:text-gold-200">Delivery & Returns</Link></li>
            <li><Link to="/contact" className="link-underline hover:text-gold-200">Contact / Order Support</Link></li>
            <li><Link to="/custom-orders" className="link-underline hover:text-gold-200">Bespoke Enquiry</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">Get in touch</h4>
          <ul className="mt-5 space-y-4 text-sm text-ivory/85">
            <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-gold" /><a href={`tel:${contact.phone}`} className="hover:text-gold-200">{contact.phoneDisplay}</a></li>
            <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-gold" /><a href={`mailto:${contact.email}`} className="hover:text-gold-200">{contact.email}</a></li>
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-gold" /><span>{contact.location}</span></li>
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-ivory/50 md:flex-row">
        <p>© {new Date().getFullYear()} {brand.legalName}. All rights reserved.</p>
        <p>Crafted by <a href="https://github.com/GeovisionServicesGlobal" target="_blank" rel="noopener noreferrer" className="text-gold-200 hover:text-gold">Geovision Services Ltd</a></p>
      </div>
    </footer>
  )
}
