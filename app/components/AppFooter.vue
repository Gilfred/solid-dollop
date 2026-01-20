<script setup lang="ts">
// Navigation principale
const navigation = {
  discover: [
    { label: 'Accueil', to: '/' },
    { label: 'Articles', to: '/blog' },
    { label: 'Tendances', to: '/trends' },
    { label: 'Galerie', to: '/gallery' }
  ],
  about: [
    { label: 'À propos', to: '/about' },
    { label: 'Équipe', to: '/team' },
    { label: 'Partenaires', to: '/partners' },
    { label: 'Carrières', to: '/careers' }
  ],
  resources: [
    { label: 'Guide déco', to: '/guides' },
    { label: 'Inspiration', to: '/inspiration' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Blog', to: '/blog' }
  ],
  legal: [
    { label: 'Mentions légales', to: '/legal' },
    { label: 'Politique de confidentialité', to: '/privacy' },
    { label: 'CGU', to: '/terms' },
    { label: 'Cookies', to: '/cookies' }
  ]
}

// Réseaux sociaux
const socialLinks = [
  { icon: 'i-simple-icons-instagram', label: 'Instagram', to: 'https://instagram.com', color: 'text-pink-600' },
  { icon: 'i-simple-icons-pinterest', label: 'Pinterest', to: 'https://pinterest.com', color: 'text-red-600' },
  { icon: 'i-simple-icons-facebook', label: 'Facebook', to: 'https://facebook.com', color: 'text-blue-600' },
  { icon: 'i-simple-icons-twitter', label: 'Twitter', to: 'https://twitter.com', color: 'text-sky-500' },
  { icon: 'i-simple-icons-youtube', label: 'YouTube', to: 'https://youtube.com', color: 'text-red-600' }
]

// Gestion newsletter
const email = ref('')
const isSubscribing = ref(false)

const handleSubscribe = async () => {
  if (!email.value) return

  isSubscribing.value = true
  // Simuler un appel API
  await new Promise(resolve => setTimeout(resolve, 1000))

  console.log('Inscription newsletter:', email.value)
  
  email.value = ''
  isSubscribing.value = false
}
</script>

<template>
  <footer class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white ">
    <!-- Vague décorative -->
    <div class="relative h-16">
      <svg class="absolute bottom-0 w-full h-16 text-slate-50" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
      </svg>
    </div>

    <div class="container mx-auto px-6 pt-16 pb-8">
      <!-- Top Section: Newsletter + Branding -->
      <div class="grid md:grid-cols-2 gap-12 mb-16 pb-16 border-b border-white/10">
        <!-- Branding -->
        <div class="space-y-6">
          <div class="flex items-center gap-3">
            <div class="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-xl">
              <UIcon name="i-heroicons-home-modern" class="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 class="font-gravitas text-3xl font-bold">Luxe & Design</h2>
              <p class="text-purple-300 text-sm">L'art de vivre</p>
            </div>
          </div>
          
          <p class="text-gray-300 leading-relaxed max-w-md">
            Découvrez l'univers du design d'intérieur haut de gamme, des demeures d'exception et des tendances qui façonnent l'art de vivre contemporain.
          </p>

          <!-- Social Media -->
          <div class="flex gap-3 pt-4">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.to"
              target="_blank"
              rel="noopener noreferrer"
              class="group relative"
            >
              <div class="absolute inset-0 bg-white rounded-lg opacity-0 group-hover:opacity-20 transition-opacity blur-sm"></div>
              <div class="relative bg-white/10 backdrop-blur-sm p-3 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <UIcon :name="social.icon" class="w-5 h-5" />
              </div>
            </a>
          </div>
        </div>

        <!-- Newsletter -->
        <div class="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div class="flex items-center gap-2 mb-4">
            <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-purple-400" />
            <h3 class="text-xl font-bold">Newsletter Exclusive</h3>
          </div>
          <p class="text-gray-300 text-sm mb-6">
            Recevez nos dernières inspirations, tendances et articles directement dans votre boîte mail. 
            <span class="text-purple-400 font-semibold">100% sans spam.</span>
          </p>

          <form @submit.prevent="handleSubscribe" class="space-y-3">
            <div class="flex gap-2">
              <input
                v-model="email"
                type="email"
                placeholder="votre@email.com"
                required
                class="flex-1 px-4 py-3  bg-white/10 border border-gray-200 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-full"
              />
              <UButton 
                type="submit"
                color="primary"
                size="lg"
                :loading="isSubscribing"
                icon="i-heroicons-paper-airplane"
                trailing
                class=" bg-amber-400 hover:bg-amber-500 rounded-full"
              >
                {{ isSubscribing ? 'Envoi...' : 'S\'abonner' }}
              </UButton>
            </div>
            <p class="text-xs text-gray-400">
              En vous abonnant, vous acceptez notre 
              <NuxtLink to="/privacy" class="text-purple-400 hover:text-purple-300 underline">
                politique de confidentialité
              </NuxtLink>
            </p>
          </form>
        </div>
      </div>

      <!-- Navigation Links -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div v-for="(section, name) in navigation" :key="name">
          <h4 class="font-semibold text-lg mb-4 text-purple-300">{{ name.charAt(0).toUpperCase() + name.slice(1) }}</h4>
          <ul class="space-y-3">
            <li v-for="link in section" :key="link.to">
              <NuxtLink 
                :to="link.to"
                class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
              >
                <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright & Stats -->
      <div class="pt-8 border-t border-white/10">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-center md:text-left">
            <p class="text-gray-400 text-sm">
              © {{ new Date().getFullYear() }} <span class="font-semibold text-white">Luxe & Design</span>. Tous droits réservés.
            </p>
            <p class="text-gray-400 text-xs mt-1">
              Conçu avec <UIcon name="i-heroicons-heart-solid" class="w-3 h-3 inline text-red-500" /> par votre équipe
            </p>
          </div>
          <div class="flex flex-wrap justify-center gap-4 text-xs">
            <div class="flex items-center gap-2 bg-white bg-opacity-5 px-4 py-2 rounded-full">
              <UIcon name="i-heroicons-users" class="w-4 h-4 text-purple-400" />
              <span class="text-gray-300">+10K lecteurs</span>
            </div>
            <div class="flex items-center gap-2 bg-white bg-opacity-5 px-4 py-2 rounded-full">
              <UIcon name="i-heroicons-newspaper" class="w-4 h-4 text-purple-400" />
              <span class="text-gray-300">+500 articles</span>
            </div>
            <div class="flex items-center gap-2 bg-white bg-opacity-5 px-4 py-2 rounded-full">
              <UIcon name="i-heroicons-globe-alt" class="w-4 h-4 text-purple-400" />
              <span class="text-gray-300">20+ pays</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll to top -->
    <button
      @click="$scrollToTop()"
      class="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 z-40"
      aria-label="Retour en haut"
    >
      <UIcon name="i-heroicons-arrow-up" class="w-5 h-5 text-white" />
    </button>
  </footer>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
