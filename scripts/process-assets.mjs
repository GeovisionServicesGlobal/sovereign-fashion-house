// Processes raw product images (name + price encoded in filename) into
// slugged public assets + a generated products.js data module.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

// Optimize a source image into a web-ready JPEG (resize + compress) using macOS sips.
// execFileSync passes args directly (no shell) so filenames with $ / spaces are safe.
// Falls back to a plain copy if sips is unavailable or fails.
function optimizeToJpg(src, outPath) {
  try {
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82', '-Z', '1500', src, '--out', outPath], {
      stdio: 'ignore',
    })
    if (!fs.existsSync(outPath)) throw new Error('sips produced no output')
  } catch {
    fs.copyFileSync(src, outPath)
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const SRC = path.join(root, 'assets')
const OUT_DIR = path.join(root, 'public', 'assets', 'products')
const DATA_FILE = path.join(root, 'src', 'data', 'products.js')

fs.mkdirSync(OUT_DIR, { recursive: true })
fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[’'"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

// Category / gender inference from the product name
function classify(name) {
  const n = name.toLowerCase()
  const kidsHints = ['hipster', 'trouser with white top', 'pallazo', 'floral three piece', 'green blue', 'mustard white', 'fuschia white']
  const menHints = ['broken suit', 'double breast', 'pin stripped suit', 'blue stripped', 'chinese collar']
  let gender = 'Women'
  if (kidsHints.some((h) => n.includes(h))) gender = 'Kids'
  else if (menHints.some((h) => n.includes(h))) gender = 'Men'

  let category = 'Ready to Wear'
  if (n.includes('blazer')) category = 'Blazers'
  else if (n.includes('blouse') || n.includes('camisole') || n.includes('top') && !n.includes('trouser')) category = 'Tops & Blouses'
  else if (n.includes('dress')) category = 'Dresses'
  else if (n.includes('skirt')) category = 'Skirts & Sets'
  else if (n.includes('suit')) category = 'Suits'
  else if (n.includes('trouser') || n.includes('pallazo') || n.includes('snota') || n.includes('hipster')) category = 'Trousers & Sets'
  return { gender, category }
}

// Products to drop from the catalogue (by slug) — flagged as not linking up / poor images.
const EXCLUDE = new Set(['broken-suits', 'navy-blue-hipster-with-white-top'])

// Hand-curated studio shots added in assets/{men,women,Kids}. These have no price in
// the filename, so name / category / price are authored here. Prices align with the
// existing catalogue ranges and can be adjusted anytime.
const CURATED = [
  // ---- Men ----
  { src: 'men/men-2.png', name: 'Navy Classic Two-Piece Suit', price: 250, gender: 'Men', category: 'Suits' },
  { src: 'men/men-3.png', name: 'Tan Blazer & Navy Trouser Set', price: 250, gender: 'Men', category: 'Suits' },
  { src: 'men/men-4.png', name: 'Teal Double-Breasted Suit', price: 350, gender: 'Men', category: 'Suits' },
  { src: 'men/men-5.png', name: 'Royal Blue Pinstripe Suit', price: 350, gender: 'Men', category: 'Suits' },
  { src: 'men/men-1.png', name: 'Speckled Knit Jacket Set', price: 150, gender: 'Men', category: 'Suits' },
  { src: 'men/ChatGPT Image Jul 8, 2026, 11_39_52 AM.png', name: 'Royal Blue Chain Prince Suit', price: 350, gender: 'Men', category: 'Suits' },
  // ---- Women ----
  { src: 'women/women-6.png', name: 'Black Halter Bow Midi Dress', price: 200, gender: 'Women', category: 'Dresses' },
  { src: 'women/women-7.png', name: 'Tailored Trouser Suit', price: 180, gender: 'Women', category: 'Suits' },
  { src: 'women/women-2.png', name: 'Turquoise Tailored Blazer', price: 100, gender: 'Women', category: 'Blazers' },
  { src: 'women/women-1.png', name: 'Blue Snakeprint Shirt', price: 65, gender: 'Women', category: 'Tops & Blouses' },
  { src: 'women/women-3.png', name: 'Blue Heart-Print Bow Blouse', price: 60, gender: 'Women', category: 'Tops & Blouses' },
  { src: 'women/women-5.png', name: 'Ikat Print Blouse & Trouser Set', price: 150, gender: 'Women', category: 'Trousers & Sets' },
  { src: 'women/women-4.png', name: 'Piped Two-Piece Lounge Set', price: 150, gender: 'Women', category: 'Trousers & Sets' },
  // ---- Kids ----
  { src: 'Kids/kids-3.png', name: 'Pink Blazer & Floral Dress Set', price: 150, gender: 'Kids', category: 'Dresses' },
  { src: 'Kids/kids-1.png', name: 'Orange Ruffle Dress', price: 100, gender: 'Kids', category: 'Dresses' },
  { src: 'Kids/kids-2.png', name: 'White Bow Top & Flared Trouser', price: 100, gender: 'Kids', category: 'Trousers & Sets' },
  { src: 'Kids/kids-4.png', name: 'Orange Palazzo & Ruffle Top', price: 150, gender: 'Kids', category: 'Trousers & Sets' },
  { src: 'Kids/kids-5.png', name: 'Red Trouser & Ruffle Top', price: 100, gender: 'Kids', category: 'Trousers & Sets' },
  { src: 'Kids/kids-6.png', name: 'Green Stripe Skirt & Top', price: 100, gender: 'Kids', category: 'Skirts & Sets' },
]

const files = fs
  .readdirSync(SRC)
  // real products are images with a $price in the name; skip logos & stray/generated files
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f) && !/logo|chatgpt/i.test(f) && /\$\s*\d/.test(f))

// Parse & group by normalized name (merge duplicate shots into one product gallery)
const groups = new Map()
for (const file of files) {
  const ext = path.extname(file)
  const base = path.basename(file, ext)
  // price: last $ number
  const priceMatch = base.match(/\$\s*([0-9]+(?:\.[0-9]{1,2})?)/)
  const price = priceMatch ? Math.round(parseFloat(priceMatch[1])) : 100
  // name: strip price and trailing (2) markers / dashes
  let name = base
    .replace(/\$\s*[0-9]+(?:\.[0-9]{1,2})?/g, '')
    .replace(/\(\d+\)/g, '')
    .replace(/[–-]\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim()
  name = name.replace(/\s*[–-]\s*/g, ' – ')
  // Title case-ish (keep existing caps words)
  const key = slugify(name)
  if (!groups.has(key)) groups.set(key, { name, price, files: [] })
  const g = groups.get(key)
  g.files.push(file)
  g.price = Math.min(g.price, price) // lowest listed
}

const products = []
let idx = 0
for (const [key, g] of groups) {
  if (EXCLUDE.has(key)) continue
  const { gender, category } = classify(g.name)
  const images = g.files.map((file, i) => {
    // normalize every product image to an optimized .jpg
    const outName = `${key}${i ? '-' + (i + 1) : ''}.jpg`
    optimizeToJpg(path.join(SRC, file), path.join(OUT_DIR, outName))
    return `/assets/products/${outName}`
  })
  idx += 1
  products.push({
    id: key,
    name: g.name,
    price: g.price,
    gender,
    category,
    images,
    // rotate some flags for merchandising
    bestSeller: idx % 3 === 0,
    isNew: idx % 4 === 0,
  })
}

// ---- Curated studio shots (hand-authored name/price) ----
for (const c of CURATED) {
  const srcPath = path.join(SRC, c.src)
  if (!fs.existsSync(srcPath)) {
    console.warn('  ! curated source missing, skipping:', c.src)
    continue
  }
  const key = slugify(c.name)
  const outName = `${key}.jpg`
  optimizeToJpg(srcPath, path.join(OUT_DIR, outName))
  idx += 1
  products.push({
    id: key,
    name: c.name,
    price: c.price,
    gender: c.gender,
    category: c.category,
    images: [`/assets/products/${outName}`],
    bestSeller: idx % 4 === 0,
    isNew: true, // freshly added -> surface in New Arrivals
  })
}

// Sort: by gender then category then name
products.sort((a, b) => a.name.localeCompare(b.name))

const banner = `// AUTO-GENERATED by scripts/process-assets.mjs — do not edit by hand.\n`
const body =
  banner +
  `export const products = ${JSON.stringify(products, null, 2)}\n\n` +
  `export const categories = [...new Set(products.map((p) => p.category))].sort()\n` +
  `export const genders = ['Women', 'Men', 'Kids']\n`

fs.writeFileSync(DATA_FILE, body)

console.log(`Processed ${files.length} files -> ${products.length} products`)
console.log('Categories:', [...new Set(products.map((p) => p.category))].join(', '))
console.log('By gender:', ['Women', 'Men', 'Kids'].map((g) => `${g}:${products.filter((p) => p.gender === g).length}`).join('  '))
