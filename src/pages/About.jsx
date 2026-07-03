import { Link } from 'react-router-dom'
import { ArrowRight, Gem, Globe2, HeartHandshake, Scissors } from 'lucide-react'
import { PageHero, SectionHeading } from '../components/ui'
import Reveal, { StaggerGroup, StaggerItem } from '../components/anim/Reveal'
import { brand } from '../data/site'

const values = [
  { icon: Gem, title: 'Elegance', text: 'Timeless design and refined finishing in every piece.' },
  { icon: Globe2, title: 'African Creativity', text: 'Rooted in African artistry, made for the world.' },
  { icon: HeartHandshake, title: 'Confidence', text: 'Clothing that helps you show up as your boldest self.' },
  { icon: Scissors, title: 'Craftsmanship', text: 'Precise tailoring and premium, hand-selected fabrics.' },
]

export default function About() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        title="The house of purposeful style"
        subtitle={brand.philosophy}
        image="/assets/products/chinese-collar-suits.jpg"
      />

      <section className="bg-ivory py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="relative">
              <img src="/assets/products/2-piece-skirt.jpg" alt="Sovereign Fashion House" className="w-full rounded-[2rem] object-cover shadow-card" />
              <div className="absolute -left-5 -top-5 -z-10 h-44 w-44 rounded-2xl border-2 border-gold/40" />
            </div>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <span className="eyebrow">Our Story</span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-forest-900 md:text-4xl">Sovereign Fashion House Limited</h2>
            <div className="mt-6 space-y-4 text-forest-600">
              <p>
                Sovereign Fashion House is an elegant, African-rooted fashion and lifestyle brand. We create clothing for
                Men, Women and Kids that celebrates confidence, creativity and purposeful style.
              </p>
              <p>
                From signature suits and statement dresses to bespoke custom orders, every piece is crafted with premium
                fabric and meticulous tailoring — designed to make you feel sovereign in every room you enter.
              </p>
              <p>
                We believe style is a form of self-expression and empowerment. That belief guides everything we make,
                and everyone we dress.
              </p>
            </div>
            <Link to="/shop" className="btn-forest mt-8">Explore the Collection <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-x">
          <Reveal><SectionHeading center eyebrow="What We Stand For" title="Our Values" /></Reveal>
          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="card h-full rounded-2xl bg-ivory p-7 text-center hover:-translate-y-2 hover:shadow-card">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest text-gold"><v.icon className="h-6 w-6" /></div>
                  <h3 className="mt-5 font-serif text-lg font-semibold text-forest-900">{v.title}</h3>
                  <p className="mt-2 text-sm text-forest-600">{v.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-900 py-20">
        <div className="pointer-events-none absolute -right-10 top-0 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />
        <div className="container-x relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Reveal>
            <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">Ready to wear your sovereignty?</h2>
            <p className="mt-3 max-w-xl text-ivory/80">Shop the collection or start a bespoke piece made just for you.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="btn-gold">Shop Now</Link>
              <Link to="/custom-orders" className="btn-light">Custom Order</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
