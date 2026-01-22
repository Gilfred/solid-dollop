// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  

  modules: ['@nuxt/ui', '@nuxt/image'],
  
  css: ['./app/assets/css/main.css'],
  
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  
  ui: {
     fonts: false,
  },
  router: {
    middleware: 'auth.global'
  },

  // app était mal placé (manquait une virgule après ui)
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Gravitas+One&display=swap'
        },
         {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cookie&display=swap'
        },
         {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Nova+Square&display=swap'
        }
      ]
    }
  },
  
  

  // Configuration du stockage pour les uploads
  nitro: {
    // Configuration du stockage persistant
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
    
    // Configuration pour servir les fichiers statiques
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
  
  // Règles de routage pour les fichiers uploadés
  routeRules: {
    '/uploads/**': {
      cors: true,
      headers: {
        'Cache-Control': 'public, max-age=31536000',
        'Access-Control-Allow-Origin': '*'
      },
      cache: { maxAge: 60 * 60 * 24 * 365 }
    },
    '/images/**': {
      cors: true,
      headers: {
        'Cache-Control': 'public, max-age=31536000',
        'Access-Control-Allow-Origin': '*'
      }
    }
  }
});