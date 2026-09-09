import { mkdir, writeFile } from 'node:fs/promises'
import { loadEnv } from 'vite'
import { products } from '../src/data/products.js'

const env = loadEnv('production', process.cwd(), '')
const siteUrl = env.VITE_SITE_URL?.replace(/\/+$/, '')

if (!siteUrl) {
  console.log('Skipping sitemap generation: VITE_SITE_URL is not set.')
  process.exit(0)
}

const routes = [
  '/',
  '/products',
  '/applications',
  '/about',
  '/global-markets',
  '/technical-resources',
  '/contact',
  ...products
    .filter((product) => product.slug && product.seoTitle)
    .map((product) => `/products/${product.slug}`),
]

const urls = routes
  .map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`)
  .join('\n')

await mkdir('dist', { recursive: true })
await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`)
console.log(`Generated sitemap.xml for ${routes.length} routes.`)
