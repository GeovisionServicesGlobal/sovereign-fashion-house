import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { brand, nav } from '../data/site'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [q, setQ] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const { count, setOpen } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [location.pathname, location.search])

  const isHome = location.pathname === '/'
  const solid = scrolled || !isHome || mobileOpen

  const submitSearch = (e) => {
    e.preventDefault()
    if (q.trim()) navigate(`/shop?q=${encodeURIComponent(q.trim())}`)
    setSearchOpen(false)
    setQ('')
  }

  return (
    <>
      {/* announcement bar */}
      <div className="bg-forest-950 py-2 text-center text-[0.7rem] font-medium uppercase tracking-[0.25em] text-gold-200">
        Free styling advice on WhatsApp · Save up to 25% on select pieces
      </div>

      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`sticky top-0 z-50 transition-all duration-500 ${solid ? 'glass shadow-soft' : 'bg-transparent'}`}
      >
        <nav className="container-x flex h-20 items-center justify-between gap-4">
          <Link to="/" className="flex items-center">
            <img
              src={solid ? brand.logoGreen : brand.logoWhite}
              alt={brand.name}
              className="h-12 w-auto rounded-lg md:h-14"
            />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                      solid
                        ? isActive
                          ? 'text-gold-700'
                          : 'text-forest-800 hover:text-gold-700'
                        : 'text-white/90 hover:text-white'
                    }`
                  }
                  end={item.to === '/'}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className={`rounded-full p-2.5 transition-colors ${solid ? 'text-forest-800 hover:bg-forest-50' : 'text-white hover:bg-white/10'}`}
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              aria-label="Cart"
              onClick={() => setOpen(true)}
              className={`relative rounded-full p-2.5 transition-colors ${solid ? 'text-forest-800 hover:bg-forest-50' : 'text-white hover:bg-white/10'}`}
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[0.65rem] font-bold text-forest-900">
                  {count}
                </span>
              )}
            </button>
            <button
              aria-label="Menu"
              onClick={() => setMobileOpen((v) => !v)}
              className={`rounded-full p-2.5 lg:hidden ${solid ? 'text-forest-900' : 'text-white'}`}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.form
              onSubmit={submitSearch}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-forest-900/10 bg-ivory"
            >
              <div className="container-x flex items-center gap-3 py-4">
                <Search className="h-5 w-5 text-forest-400" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search suits, dresses, blazers…"
                  className="w-full bg-transparent text-forest-900 placeholder:text-forest-400 focus:outline-none"
                />
                <button type="submit" className="btn-forest !px-5 !py-2 text-xs">Search</button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.header>

      {/* mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-forest-950/60" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-[80%] max-w-sm overflow-y-auto bg-ivory px-6 pb-10 pt-8"
            >
              <img src={brand.logoGreen} alt={brand.name} className="h-12 w-auto rounded-lg" />
              <ul className="mt-6 space-y-1">
                {nav.map((item) => (
                  <li key={item.label} className="border-b border-forest-900/10">
                    <NavLink to={item.to} className="block py-4 font-serif text-lg text-forest-900" end={item.to === '/'}>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
