export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  /**
   * Configuration Nitro pour Vercel
   */
  nitro: {
    preset: 'vercel',

    /**
     * Stockage persistant via Vercel Blob
     * (remplace totalement fs en production)
     */
    storage: {
      uploads: {
        driver: 'vercel-blob'
      },
      images: {
        driver: 'vercel-blob'
      }
    }
  },

  /**
   * Variables runtime (OBLIGATOIRE pour Vercel Blob)
   */
  runtimeConfig: {
    blobReadWriteToken: process.env.BLOB_READ_WRITE_TOKEN
  }

  /**
   * Pas de publicAssets
   * Pas de routeRules pour /uploads
   * Les fichiers sont servis via URL Blob Vercel
   */
})
