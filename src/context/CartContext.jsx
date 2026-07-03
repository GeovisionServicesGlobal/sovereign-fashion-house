import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { waLink, brand } from '../data/site'

const CartContext = createContext(null)
const STORAGE_KEY = 'sfh_cart_v1'

const lineKey = (id, size) => `${id}__${size || 'One Size'}`

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { product, size, qty } = action
      const key = lineKey(product.id, size)
      const existing = state.find((l) => l.key === key)
      if (existing) {
        return state.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l))
      }
      return [
        ...state,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          size: size || 'One Size',
          qty,
        },
      ]
    }
    case 'REMOVE':
      return state.filter((l) => l.key !== action.key)
    case 'QTY':
      return state
        .map((l) => (l.key === action.key ? { ...l, qty: Math.max(1, action.qty) } : l))
        .filter((l) => l.qty > 0)
    case 'CLEAR':
      return []
    case 'HYDRATE':
      return action.state
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [])
  const [open, setOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) dispatch({ type: 'HYDRATE', state: JSON.parse(raw) })
    } catch (e) {
      /* ignore */
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const count = useMemo(() => items.reduce((n, l) => n + l.qty, 0), [items])
  const subtotal = useMemo(() => items.reduce((n, l) => n + l.qty * l.price, 0), [items])

  const add = (product, size, qty = 1) => {
    dispatch({ type: 'ADD', product, size, qty })
    setOpen(true)
  }
  const remove = (key) => dispatch({ type: 'REMOVE', key })
  const setQty = (key, qty) => dispatch({ type: 'QTY', key, qty })
  const clear = () => dispatch({ type: 'CLEAR' })

  const checkoutUrl = useMemo(() => {
    if (!items.length) return waLink('Hello Sovereign Fashion House, I would like to place an order.')
    const lines = items
      .map((l, i) => `${i + 1}. ${l.name} — Size ${l.size} × ${l.qty} = ${brand.currency}${l.price * l.qty}`)
      .join('\n')
    const msg = `Hello Sovereign Fashion House, I would like to order:\n\n${lines}\n\nSubtotal: ${brand.currency}${subtotal}\n\nPlease confirm availability and delivery.`
    return waLink(msg)
  }, [items, subtotal])

  const value = { items, count, subtotal, open, setOpen, add, remove, setQty, clear, checkoutUrl }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
