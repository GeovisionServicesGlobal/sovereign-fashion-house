import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, ArrowRight } from 'lucide-react'
import { PageHero, SectionHeading } from '../components/ui'
import Reveal from '../components/anim/Reveal'
import { products } from '../data/products'

// Flatten a curated set of images for the editorial lookbook
const gallery = products.flatMap((p) => p.images.map((src) => ({ src, name: p.name, id: p.id })))

export default function Lookbook() {
  const [active, setActive] = useState(null)

  return (
    <>
      <PageHero
        breadcrumb="Lookbook"
        title="The Sovereign Lookbook"
        subtitle="Editorial styling and campaign imagery to inspire your next statement look."
        image="/assets/products/pink-white-floral-three-piece-trouser-suit.jpg"
      />

      <section className="bg-ivory py-16">
        <div className="container-x">
          <Reveal><SectionHeading center eyebrow="Styled to Inspire" title="Explore the Collection" intro="Tap any look to view it up close, then shop the piece." /></Reveal>

          <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
            {gallery.map((g, i) => (
              <motion.button
                key={`${g.id}-${i}`}
                onClick={() => setActive(g)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
                className="group relative block w-full overflow-hidden rounded-2xl shadow-soft"
              >
                <img src={g.src} alt={g.name} loading="lazy" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-forest-950/80 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="font-serif text-sm font-semibold text-white">{g.name}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-[95] flex items-center justify-center bg-forest-950/95 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <button onClick={() => setActive(null)} aria-label="Close" className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-gold hover:text-forest-900">
              <X className="h-5 w-5" />
            </button>
            <motion.div className="flex flex-col items-center" initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} onClick={(e) => e.stopPropagation()}>
              <img src={active.src} alt={active.name} className="max-h-[80vh] max-w-[90vw] rounded-2xl object-contain shadow-card" />
              <Link to={`/product/${active.id}`} className="btn-gold mt-5">Shop {active.name} <ArrowRight className="h-4 w-4" /></Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
