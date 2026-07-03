import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from './ui'
import SocialIcon from './SocialIcon'

export default function CartDrawer() {
  const { items, open, setOpen, subtotal, remove, setQty, count, checkoutUrl, clear } = useCart()

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-forest-950/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory shadow-card"
          >
            <div className="flex items-center justify-between border-b border-forest-900/10 px-6 py-5">
              <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-forest-900">
                <ShoppingBag className="h-5 w-5" /> Your Bag {count > 0 && `(${count})`}
              </h2>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-2 text-forest-700 hover:bg-forest-50">
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag className="h-14 w-14 text-forest-200" />
                <p className="font-serif text-lg text-forest-900">Your bag is empty</p>
                <p className="text-sm text-forest-500">Discover pieces made to make you feel sovereign.</p>
                <Link to="/shop" onClick={() => setOpen(false)} className="btn-forest mt-2">Start Shopping</Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                  {items.map((l) => (
                    <div key={l.key} className="flex gap-4">
                      <Link to={`/product/${l.id}`} onClick={() => setOpen(false)} className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-forest-50">
                        <img src={l.image} alt={l.name} className="h-full w-full object-cover" />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <p className="font-serif text-sm font-semibold leading-snug text-forest-900">{l.name}</p>
                          <button onClick={() => remove(l.key)} aria-label="Remove" className="text-forest-400 hover:text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xs text-forest-500">Size: {l.size}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-forest-900/15">
                            <button onClick={() => setQty(l.key, l.qty - 1)} className="p-1.5 text-forest-700 hover:text-gold-700" aria-label="Decrease">
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-5 text-center text-sm font-medium">{l.qty}</span>
                            <button onClick={() => setQty(l.key, l.qty + 1)} className="p-1.5 text-forest-700 hover:text-gold-700" aria-label="Increase">
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-gold-700">{formatPrice(l.price * l.qty)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={clear} className="text-xs text-forest-400 underline hover:text-red-500">Clear bag</button>
                </div>

                <div className="border-t border-forest-900/10 px-6 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-forest-600">Subtotal</span>
                    <span className="font-serif text-xl font-bold text-forest-900">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-forest-500">Shipping & delivery confirmed on WhatsApp.</p>
                  <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="btn-gold mt-4 w-full">
                    <SocialIcon name="whatsapp" className="h-5 w-5" /> Checkout on WhatsApp
                  </a>
                  <button onClick={() => setOpen(false)} className="mt-2 w-full text-center text-sm text-forest-600 hover:text-gold-700">
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
