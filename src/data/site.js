// ============================================================
//  Sovereign Fashion House Limited — site content
// ============================================================

export const brand = {
  name: 'Sovereign Fashion House',
  legalName: 'Sovereign Fashion House Limited',
  tagline: 'Wear Your Sovereignty',
  philosophy: 'Elegance. African creativity. Confidence. Purposeful style.',
  logoWhite: '/assets/logo-green-bg.jpg', // white mark on green
  logoGreen: '/assets/logo-white-bg.jpg', // green mark on white
  currency: '$',
}

export const contact = {
  phoneDisplay: '+254 113 636 078',
  phone: '+254113636078',
  whatsappNumber: '254113636078',
  email: 'hello@sovereignfashion.com',
  location: 'Nairobi, Kenya',
}

// Build a WhatsApp deep link with a prefilled message
export const waLink = (message) =>
  `https://api.whatsapp.com/send/?phone=%2B${contact.whatsappNumber}&text=${encodeURIComponent(
    message,
  )}&type=phone_number&app_absent=0`

export const whatsappUrl = waLink('Hello Sovereign Fashion House, I am enquiring from your website.')

export const socials = [
  { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com/sovereignfashionhouse' },
  { name: 'Facebook', icon: 'facebook', url: 'https://facebook.com/sovereignfashionhouse' },
  { name: 'TikTok', icon: 'tiktok', url: 'https://tiktok.com/@sovereignfashionhouse' },
  { name: 'YouTube', icon: 'youtube', url: 'https://youtube.com/@sovereignfashionhouse' },
]

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Women', to: '/shop?gender=Women' },
  { label: 'Men', to: '/shop?gender=Men' },
  { label: 'Kids', to: '/shop?gender=Kids' },
  { label: 'Lookbook', to: '/lookbook' },
  { label: 'Custom Orders', to: '/custom-orders' },
  { label: 'About', to: '/about' },
]

export const usps = [
  { icon: 'truck', title: 'Fast Shipping', text: 'Swift dispatch, nationwide' },
  { icon: 'clock', title: 'Next-Day Delivery', text: 'Within Nairobi' },
  { icon: 'badge-check', title: 'Quality Guarantee', text: 'Premium craftsmanship' },
  { icon: 'message-circle', title: 'WhatsApp Ordering', text: 'Order the way you chat' },
]

export const collectionsHero = [
  { gender: 'Women', tagline: 'Grace in every thread', image: '/assets/products/2-piece-dresses.jpg' },
  { gender: 'Men', tagline: 'Tailored sovereignty', image: '/assets/products/double-breast-suit.jpg' },
  { gender: 'Kids', tagline: 'Little icons in the making', image: '/assets/products/orange-pallazo-with-white-top.jpg' },
]
