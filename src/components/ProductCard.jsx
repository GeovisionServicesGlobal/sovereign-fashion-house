import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from './ui'

export default function ProductCard({ product }) {
  const { add } = useCart()
  const [hover, setHover] = useState(false)
  const hasSecond = product.images.length > 1
  const img = hover && hasSecond ? product.images[1] : product.images[0]

  return (
    <div className="group flex h-full flex-col">
      <div
        className="relative overflow-hidden rounded-2xl bg-forest-50"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Link to={`/product/${product.id}`} aria-label={product.name}>
          <img
            src={img}
            alt={product.name}
            loading="lazy"
            className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="rounded-full bg-forest px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-ivory">
              New
            </span>
          )}
          {product.bestSeller && (
            <span className="rounded-full bg-gold px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-forest-900">
              Best Seller
            </span>
          )}
        </div>

        {/* quick add */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={() => add(product, null, 1)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-forest/95 py-3 text-xs font-semibold uppercase tracking-wider text-ivory backdrop-blur transition-colors hover:bg-gold hover:text-forest-900"
          >
            <ShoppingBag className="h-4 w-4" /> Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <span className="text-[0.7rem] uppercase tracking-widest text-forest-400">{product.category}</span>
        <Link
          to={`/product/${product.id}`}
          className="mt-1 font-serif text-base font-semibold leading-snug text-forest-900 transition-colors group-hover:text-gold-700"
        >
          {product.name}
        </Link>
        <span className="mt-2 text-sm font-semibold text-gold-700">{formatPrice(product.price)}</span>
      </div>
    </div>
  )
}
