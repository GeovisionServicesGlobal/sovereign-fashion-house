import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-forest-950 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[120px]" />
      <motion.div className="container-x relative" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <p className="font-serif text-8xl font-bold text-gold md:text-9xl">404</p>
        <h1 className="mt-4 font-serif text-3xl font-bold text-white md:text-4xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-ivory/70">This piece has wandered off the rack. Let’s get you back to the collection.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-gold"><Home className="h-4 w-4" /> Home</Link>
          <Link to="/shop" className="btn-light">Shop</Link>
        </div>
      </motion.div>
    </section>
  )
}
