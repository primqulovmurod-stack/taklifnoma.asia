import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'], // Disallow secret stuff to index
    },
    sitemap: 'https://taklifnoma.asia/sitemap.xml',
  }
}
