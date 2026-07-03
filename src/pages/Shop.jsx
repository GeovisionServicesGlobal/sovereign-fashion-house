import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { PageHero } from '../components/ui'
import Reveal, { StaggerGroup, StaggerItem } from '../components/anim/Reveal'
import ProductCard from '../components/ProductCard'
import { products, categories, genders } from '../data/products'

const sorts = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'name', label: 'Alphabetical' },
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const gender = params.get('gender') || 'All'
  const q = params.get('q') || ''
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => { setCategory('All') }, [gender])

  const filtered = useMemo(() => {
    let list = [...products]
    if (gender !== 'All') list = list.filter((p) => p.gender === gender)
    if (category !== 'All') list = list.filter((p) => p.category === category)
    if (q) {
      const s = q.toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(s) || p.category.toLowerCase().includes(s) || p.gender.toLowerCase().includes(s))
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [gender, category, q, sort])

  const setGender = (g) => {
    const next = new URLSearchParams(params)
    if (g === 'All') next.delete('gender')
    else next.set('gender', g)
    setParams(next)
  }

  const availableCategories = useMemo(() => {
    const base = gender === 'All' ? products : products.filter((p) => p.gender === gender)
    return ['All', ...Array.from(new Set(base.map((p) => p.category))).sort()]
  }, [gender])

  const title = q ? `Search: “${q}”` : gender === 'All' ? 'The Full Collection' : `${gender}’s Collection`

  return (
    <>
      <PageHero
        breadcrumb="Shop"
        title={title}
        subtitle="Signature pieces crafted with elegance and African creativity. Tap any piece to view details or add straight to your bag."
        image="/assets/products/blue-stripped-suit.jpg"
      />

      <section className="bg-ivory py-12">
        <div className="container-x">
          {/* gender pills + sort */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {['All', ...genders].map((g) => (
                <button key={g} onClick={() => setGender(g)}
                  className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${gender === g ? 'border-forest bg-forest text-ivory' : 'border-forest-900/15 text-forest-600 hover:border-forest'}`}>
                  {g}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setFiltersOpen((v) => !v)} className="flex items-center gap-2 rounded-full border border-forest-900/15 px-4 py-2 text-sm text-forest-700 lg:hidden">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>
              <select value={sort} onChange={(e) => setSort(e.target.value)}
                className="rounded-full border border-forest-900/15 bg-white px-4 py-2 text-sm text-forest-700 focus:border-forest focus:outline-none">
                {sorts.map((s) => (<option key={s.id} value={s.id}>{s.label}</option>))}
              </select>
            </div>
          </div>

          {/* category chips */}
          <div className={`mt-5 flex-wrap gap-2 ${filtersOpen ? 'flex' : 'hidden'} lg:flex`}>
            {availableCategories.map((c) => (
              <button key={c} onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-1.5 text-sm transition-all ${category === c ? 'bg-gold text-forest-900' : 'bg-white text-forest-500 hover:text-forest-900'}`}>
                {c}
              </button>
            ))}
          </div>

          <p className="mt-6 text-sm text-forest-500">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}</p>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <X className="h-12 w-12 text-forest-200" />
              <p className="font-serif text-xl text-forest-900">No pieces match your filters</p>
              <button onClick={() => { setGender('All'); setCategory('All') }} className="btn-forest">Reset filters</button>
            </div>
          ) : (
            <StaggerGroup key={`${gender}-${category}-${sort}-${q}`} className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((p) => (<StaggerItem key={p.id}><ProductCard product={p} /></StaggerItem>))}
            </StaggerGroup>
          )}
        </div>
      </section>
    </>
  )
}
