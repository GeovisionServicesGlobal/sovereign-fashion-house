import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, Clock, MessageCircle, Truck, Star, Sparkles } from 'lucide-react'
import Reveal, { StaggerGroup, StaggerItem } from '../components/anim/Reveal'
import { SectionHeading } from '../components/ui'
import ProductCard from '../components/ProductCard'
import { brand, usps, collectionsHero, productImg } from '../data/site'
import { products } from '../data/products'

const uspIcon = { truck: Truck, clock: Clock, 'badge-check': BadgeCheck, 'message-circle': MessageCircle }

export default function Home() {
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 8)
  const newArrivals = products.filter((p) => p.isNew).slice(0, 8)
  const featured = (bestSellers.length ? bestSellers : products).slice(0, 8)
  const heroImg = collectionsHero[0].image

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative -mt-[calc(5rem+2rem)] flex min-h-screen items-center overflow-hidden bg-forest-950">
        {/* decorative background layers */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-10 h-[40rem] w-[40rem] rounded-full bg-forest-700/40 blur-[130px]" />
          <div className="absolute -right-20 bottom-0 h-[34rem] w-[34rem] rounded-full bg-gold/15 blur-[130px]" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '54px 54px',
            }}
          />
        </div>

        <div className="container-x relative z-10 grid items-center gap-12 pt-32 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:pt-28 lg:pb-0">
          {/* ---- Copy ---- */}
          <div>
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-gold-200"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            >
              <Sparkles className="h-3.5 w-3.5" /> New Season · 2026 Collection
            </motion.span>

            <motion.h1
              className="mt-6 font-serif text-5xl font-bold leading-[1.02] text-white text-shadow-lg sm:text-6xl md:text-7xl xl:text-[5.2rem]"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
            >
              Wear Your <span className="italic text-gold">Sovereignty</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/80 md:text-xl"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            >
              Elegant, African-rooted fashion for Men, Women & Kids. Signature suits, statement
              dresses and bespoke pieces — crafted to make you feel unstoppable.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.8 }}
            >
              <Link to="/shop" className="btn-gold">Shop the Collection <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/lookbook" className="btn-light">View Lookbook</Link>
            </motion.div>

            <motion.div
              className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/10 pt-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }}
            >
              {[['500+', 'Happy Clients'], ['3', 'Collections'], ['25%', 'Off Select Pieces']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-serif text-3xl font-bold text-gold">{n}</div>
                  <div className="text-xs uppercase tracking-widest text-ivory/55">{l}</div>
                </div>
              ))}
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="h-4 w-4 fill-current" />))}
                <span className="ml-2 text-xs uppercase tracking-widest text-ivory/55">Loved by our clients</span>
              </div>
            </motion.div>
          </div>

          {/* ---- Portrait composition ---- */}
          <motion.div
            className="relative mx-auto w-full max-w-md lg:max-w-none"
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* gold ring accent */}
            <div className="absolute -right-4 -top-4 -z-0 hidden h-full w-full rounded-[2.5rem] border-2 border-gold/40 lg:block" />

            <div className="relative overflow-hidden rounded-[2.5rem] shadow-card ring-1 ring-white/10">
              <motion.img
                src={productImg('2-piece-snota')}
                alt="Sovereign Fashion House signature look"
                className="aspect-[4/5] w-full object-cover object-[center_20%]"
                initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: 'easeOut' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent to-transparent" />
            </div>

            {/* floating: new collection badge */}
            <motion.div
              className="absolute -left-4 top-8 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-card backdrop-blur sm:-left-6"
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.7 }}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-gold"><Sparkles className="h-5 w-5" /></span>
              <div>
                <p className="text-sm font-semibold text-forest-900">Signature Suits</p>
                <p className="text-xs text-forest-500">Men · Women · Kids</p>
              </div>
            </motion.div>

            {/* floating: women's look mini card */}
            <motion.div
              className="absolute -bottom-6 -right-2 w-40 overflow-hidden rounded-2xl bg-white shadow-card sm:-right-6"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.7 }}
            >
              <img src={productImg('2-piece-dresses')} alt="Women's collection" className="h-28 w-full object-cover object-top" />
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-xs font-semibold text-forest-900">Women</span>
                <span className="text-xs font-semibold text-gold-700">from $60</span>
              </div>
            </motion.div>

            {/* floating free-styling pill */}
            <motion.div
              className="absolute -bottom-3 left-4 hidden items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-forest-900 shadow-gold md:flex"
              animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4 }}
            >
              <MessageCircle className="h-4 w-4" /> Free styling on WhatsApp
            </motion.div>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1.5">
            <div className="h-2 w-1 rounded-full bg-white/70" />
          </div>
        </motion.div>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="overflow-hidden bg-gold py-4">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, r) => (
            <div key={r} className="flex gap-10">
              {['Elegance', 'African Creativity', 'Confidence', 'Purposeful Style', 'Bespoke Tailoring', 'Sovereign Since Day One'].map((w, i) => (
                <span key={`${r}-${i}`} className="flex items-center gap-10 font-serif text-lg font-semibold uppercase tracking-wider text-forest-900">
                  {w} <span className="text-forest-900/40">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ USPs ============ */}
      <section className="bg-ivory py-12">
        <div className="container-x grid grid-cols-2 gap-6 lg:grid-cols-4">
          {usps.map((u) => {
            const Icon = uspIcon[u.icon]
            return (
              <Reveal key={u.title}>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-forest text-gold"><Icon className="h-5 w-5" /></div>
                  <div>
                    <p className="font-semibold text-forest-900">{u.title}</p>
                    <p className="text-sm text-forest-500">{u.text}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* ============ SHOP BY CATEGORY ============ */}
      <section className="bg-white py-20">
        <div className="container-x">
          <Reveal><SectionHeading center eyebrow="What are you shopping for today?" title="Shop by Collection" /></Reveal>
          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {collectionsHero.map((c) => (
              <StaggerItem key={c.gender}>
                <Link to={`/shop?gender=${c.gender}`} className="group relative block h-96 overflow-hidden rounded-3xl shadow-soft">
                  <img src={c.image} alt={c.gender} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <h3 className="font-serif text-3xl font-bold text-white">{c.gender}</h3>
                    <p className="mt-1 text-ivory/80">{c.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-200 transition-all group-hover:gap-3">
                      Shop Now <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ============ FEATURED / BEST SELLERS ============ */}
      <section className="bg-ivory py-20">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading eyebrow="Trending Now" title="Best Selling Pieces" />
              <Link to="/shop" className="btn-ghost">See All Products <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </Reveal>
          <StaggerGroup className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => (<StaggerItem key={p.id}><ProductCard product={p} /></StaggerItem>))}
          </StaggerGroup>
        </div>
      </section>

      {/* ============ EDITORIAL / CUSTOM ORDERS ============ */}
      <section className="relative overflow-hidden bg-forest-900 py-24">
        <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-gold/10 blur-[120px]" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="grid grid-cols-2 gap-4">
              <img src={productImg('2-piece-dresses')} alt="" className="mt-8 rounded-2xl object-cover shadow-card" />
              <img src={productImg('grey-pin-stripped-suit')} alt="" className="rounded-2xl object-cover shadow-card" />
            </div>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <span className="eyebrow text-gold-300">Bespoke Tailoring</span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-white md:text-4xl lg:text-[2.7rem]">Made to measure. Made for you.</h2>
            <p className="mt-5 text-ivory/80">
              From occasion gowns to power suits, our custom order service brings your vision to life. Choose your fabric,
              fit and finish — and we tailor a one-of-a-kind piece just for you.
            </p>
            <ul className="mt-6 space-y-2 text-ivory/85">
              {['Personal measurements & fittings', 'Premium, hand-selected fabrics', 'Delivery timelines to suit your event'].map((t) => (
                <li key={t} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-gold" />{t}</li>
              ))}
            </ul>
            <Link to="/custom-orders" className="btn-gold mt-8">Start a Custom Order <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>

      {/* ============ NEW ARRIVALS ============ */}
      {newArrivals.length > 0 && (
        <section className="bg-white py-20">
          <div className="container-x">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeading eyebrow="Fresh In" title="New Arrivals" />
                <Link to="/shop" className="btn-ghost">Explore More <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </Reveal>
            <StaggerGroup className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {newArrivals.map((p) => (<StaggerItem key={p.id}><ProductCard product={p} /></StaggerItem>))}
            </StaggerGroup>
          </div>
        </section>
      )}

      {/* ============ BRAND QUOTE ============ */}
      <section className="relative overflow-hidden bg-forest-950 py-24">
        <div className="pointer-events-none absolute -right-16 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <div className="container-x relative text-center">
          <Reveal>
            <p className="mx-auto max-w-4xl font-serif text-2xl font-medium leading-relaxed text-white md:text-3xl lg:text-4xl">
              “Style is a language. At Sovereign, we help you speak it with elegance, confidence and unmistakable presence.”
            </p>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-gold-300">{brand.legalName}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
