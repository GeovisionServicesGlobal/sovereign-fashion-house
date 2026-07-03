import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Minus, Plus, ShoppingBag, Truck, RefreshCw, ShieldCheck } from 'lucide-react'
import Reveal, { StaggerGroup, StaggerItem } from '../components/anim/Reveal'
import ProductCard from '../components/ProductCard'
import SocialIcon from '../components/SocialIcon'
import { formatPrice } from '../components/ui'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'
import { waLink } from '../data/site'

const SIZES = { default: ['XS', 'S', 'M', 'L', 'XL'], Kids: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y'] }

export default function Product() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const { add } = useCart()
  const sizes = product ? SIZES[product.gender] || SIZES.default : SIZES.default
  const [activeImg, setActiveImg] = useState(0)
  const [size, setSize] = useState(null)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const related = useMemo(
    () => (product ? products.filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender)).slice(0, 4) : []),
    [product],
  )

  if (!product) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 pt-20 text-center">
        <h1 className="font-serif text-3xl text-forest-900">Piece not found</h1>
        <Link to="/shop" className="btn-forest">Back to Shop</Link>
      </div>
    )
  }

  const handleAdd = () => {
    add(product, size || 'One Size', qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }
  const orderMsg = waLink(`Hello Sovereign Fashion House, I'm interested in "${product.name}" (${formatPrice(product.price)})${size ? `, size ${size}` : ''}. Is it available?`)

  return (
    <>
      <section className="bg-ivory pt-28">
        <div className="container-x">
          <Link to="/shop" className="mb-6 inline-flex items-center gap-2 text-sm text-forest-500 hover:text-gold-700">
            <ArrowLeft className="h-4 w-4" /> Back to Shop
          </Link>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Gallery */}
            <div className="flex flex-col-reverse gap-4 sm:flex-row">
              {product.images.length > 1 && (
                <div className="flex gap-3 sm:flex-col">
                  {product.images.map((img, i) => (
                    <button key={img} onClick={() => setActiveImg(i)}
                      className={`h-20 w-16 overflow-hidden rounded-xl border-2 transition ${activeImg === i ? 'border-gold' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              <motion.div key={activeImg} initial={{ opacity: 0.4, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
                className="flex-1 overflow-hidden rounded-3xl bg-forest-50 shadow-soft">
                <img src={product.images[activeImg]} alt={product.name} className="aspect-[3/4] w-full object-cover" />
              </motion.div>
            </div>

            {/* Details */}
            <Reveal direction="left">
              <span className="text-xs uppercase tracking-[0.3em] text-gold-600">{product.gender} · {product.category}</span>
              <h1 className="mt-3 font-serif text-3xl font-bold text-forest-900 md:text-4xl">{product.name}</h1>
              <p className="mt-4 font-serif text-2xl font-semibold text-gold-700">{formatPrice(product.price)}</p>

              <p className="mt-6 text-forest-600">
                A signature Sovereign Fashion House piece — crafted with premium fabric and precise tailoring for an
                elegant, confident silhouette. A timeless addition to your wardrobe, made to make a statement.
              </p>

              {/* size */}
              <div className="mt-8">
                <p className="text-sm font-semibold text-forest-900">Select Size</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button key={s} onClick={() => setSize(s)}
                      className={`min-w-[3rem] rounded-full border px-4 py-2 text-sm font-medium transition ${size === s ? 'border-forest bg-forest text-ivory' : 'border-forest-900/20 text-forest-700 hover:border-forest'}`}>
                      {s}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-forest-400">Not sure of your size? We’ll help you on WhatsApp.</p>
              </div>

              {/* qty + add */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 rounded-full border border-forest-900/20 px-2">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 text-forest-700 hover:text-gold-700" aria-label="Decrease"><Minus className="h-4 w-4" /></button>
                  <span className="w-6 text-center font-medium">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="p-2 text-forest-700 hover:text-gold-700" aria-label="Increase"><Plus className="h-4 w-4" /></button>
                </div>
                <button onClick={handleAdd} className="btn-forest flex-1">
                  {added ? (<><Check className="h-4 w-4" /> Added</>) : (<><ShoppingBag className="h-4 w-4" /> Add to Cart</>)}
                </button>
              </div>
              <a href={orderMsg} target="_blank" rel="noopener noreferrer" className="btn-gold mt-3 w-full">
                <SocialIcon name="whatsapp" className="h-5 w-5" /> Order on WhatsApp
              </a>

              {/* reassurance */}
              <div className="mt-8 grid grid-cols-1 gap-3 border-t border-forest-900/10 pt-6 sm:grid-cols-3">
                {[[Truck, 'Fast shipping'], [RefreshCw, 'Easy exchanges'], [ShieldCheck, 'Quality guaranteed']].map(([Icon, t]) => (
                  <div key={t} className="flex items-center gap-2 text-sm text-forest-600"><Icon className="h-4 w-4 text-gold" /> {t}</div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* related */}
      {related.length > 0 && (
        <section className="bg-white py-20">
          <div className="container-x">
            <Reveal><h2 className="heading-line font-serif text-2xl font-bold text-forest-900">You may also love</h2></Reveal>
            <StaggerGroup className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
              {related.map((p) => (<StaggerItem key={p.id}><ProductCard product={p} /></StaggerItem>))}
            </StaggerGroup>
          </div>
        </section>
      )}
    </>
  )
}
