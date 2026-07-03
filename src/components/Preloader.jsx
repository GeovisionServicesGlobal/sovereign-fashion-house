import { motion } from 'framer-motion'
import { brand } from '../data/site'

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-1/2 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-[120px]" />
      </div>
      <div className="relative flex flex-col items-center">
        <motion.img
          src={brand.logoWhite}
          alt={brand.name}
          className="h-28 w-auto rounded-2xl md:h-32"
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.p
          className="mt-6 text-[0.7rem] font-medium uppercase tracking-[0.45em] text-gold-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {brand.tagline}
        </motion.p>
        <div className="mt-8 h-[3px] w-52 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-gold"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.7, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
