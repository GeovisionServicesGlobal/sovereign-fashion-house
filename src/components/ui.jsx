import { motion } from 'framer-motion'
import Reveal from './anim/Reveal'
import { brand } from '../data/site'

export const formatPrice = (n) => `${brand.currency}${Number(n).toLocaleString()}`

export function SectionHeading({ eyebrow, title, intro, center = false, light = false, className = '' }) {
  return (
    <div className={`${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2
        className={`mt-3 font-serif text-3xl font-bold leading-tight md:text-4xl lg:text-[2.6rem] ${
          light ? 'text-ivory' : 'text-forest-900'
        } ${center ? 'heading-line-center' : 'heading-line'}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 leading-relaxed ${light ? 'text-ivory/80' : 'text-forest-900/70'}`}>{intro}</p>
      )}
    </div>
  )
}

export function PageHero({ title, subtitle, image, breadcrumb, tall = false }) {
  return (
    <section className={`relative flex ${tall ? 'min-h-[70vh]' : 'min-h-[52vh]'} items-center overflow-hidden pt-20`}>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      >
        {image ? (
          <img src={image} alt="" className="h-full w-full object-cover object-top" />
        ) : (
          <div className="h-full w-full bg-forest-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-950/70 to-forest-900/40" />
      </motion.div>
      <div className="container-x relative z-10 py-16">
        <Reveal>
          {breadcrumb && (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">{breadcrumb}</p>
          )}
          <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight text-white text-shadow-lg md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ivory/85">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  )
}
