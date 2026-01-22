export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // Configuration pour Vercel Nitro avec le stockage Blob
  nitro: {
    preset: 'vercel',
    
    // Vous pouvez garder le stockage local pour le développement
    storage: {
      'uploads': {
        driver: 'fs',
        base: './public/uploads'
      },
      'images': {
        driver: 'fs',
        base: './public/images'
      }
    },
    
    publicAssets: [
      {
        dir: './public/uploads',
        baseURL: '/uploads'
      },
      {
        dir: './public/images',
        baseURL: '/images'
      }
    ]
  },
  
  // Configuration runtime pour Vercel Blob
  runtimeConfig: {
    blobReadWriteToken: process.env.BLOB_READ_WRITE_TOKEN,
  },
  
  routeRules: {
    '/uploads/**': {
      cors: true,
      headers: {
        'Cache-Control': 'public, max-age=31536000',
        'Access-Control-Allow-Origin': '*'
      },
      cache: { maxAge: 60 * 60 * 24 * 365 }
    }
  }
});