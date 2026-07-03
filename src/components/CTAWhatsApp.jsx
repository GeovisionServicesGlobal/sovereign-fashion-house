import { Link } from 'react-router-dom'
import Reveal from './anim/Reveal'
import SocialIcon from './SocialIcon'
import { whatsappUrl } from '../data/site'

export function CTAWhatsApp({
  title = 'Let’s dress you in sovereignty',
  text = 'Shop the collection or chat with our styling team on WhatsApp for personal recommendations.',
  primaryLabel = 'Shop the Collection',
  primaryTo = '/shop',
}) {
  return (
    <section className="relative overflow-hidden bg-forest-950 py-20">
      <div className="pointer-events-none absolute -left-16 top-0 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />
      <div className="container-x relative text-center">
        <Reveal>
          <span className="eyebrow text-gold-300">Sovereign Fashion House</span>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl font-bold text-white md:text-4xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-ivory/80">{text}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to={primaryTo} className="btn-gold">{primaryLabel}</Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-light">
              <SocialIcon name="whatsapp" className="h-5 w-5" /> Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default CTAWhatsApp
