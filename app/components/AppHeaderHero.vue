<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import { ref, onMounted } from 'vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { navigateTo } from '#app'

function goToLogin() {
  navigateTo('/blog') // <-- chemin correct
}
function goToTendance() {
  const section = document.getElementById('newsletter-form')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}

// Carousel items images
const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6'
]

// Navigation 
const route = useRoute()
const navItems = computed(() => [
  { label: 'Home', to: '/', active: route.path === '/' },
  { label: 'Posts', to: '/blog', active: route.path.startsWith('/blog') },
  { label: 'Work', to: '/work', active: route.path.startsWith('/work') },
  { label: 'Features', to: '/features', active: route.path.startsWith('/features') }
])

// Animation machine à écrire + séquence
const displayedText = ref('')
const showElements = ref({
  badge: false,
  h1: false,
  subtitle: false,
  categories: false,
  buttons: false
})

const fullText = "L'Excellence\nà Domicile"
const typingSpeed = 100 // ms par caractère

onMounted(() => {
  // Timeline des apparitions 
  setTimeout(() => {
    showElements.value.badge = true
  }, 300)

  setTimeout(() => {
    showElements.value.h1 = true
    // Démarre la machine à écrire
    let currentIndex = 0
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {  
        displayedText.value = fullText.slice(0, currentIndex + 1)
        currentIndex++
      } else {
        clearInterval(typeInterval)
      }
    }, typingSpeed)
  }, 800)

  // Les autres éléments après la fin du typing
  const typingDuration = fullText.length * typingSpeed

  setTimeout(() => {
    showElements.value.subtitle = true
  }, 800 + typingDuration + 500)

  setTimeout(() => {
    showElements.value.categories = true
  }, 800 + typingDuration + 1200)

  setTimeout(() => {
    showElements.value.buttons = true
  }, 800 + typingDuration + 1700)
})
</script>

<template>
  <section class="hero-wrapper relative">
    <!-- Carousel en background -->
    <div class="hero-bg absolute inset-0 z-0">
      <UCarousel
        v-slot="{ item }"
        fade
        arrows
        dots
        :items="items"
        class="w-full h-full"
        autoplay        
        :autoplay-speed="3000"  
      >
        <NuxtImg :src="item" alt="Hero carousel" class="w-full h-full object-cover" />
      </UCarousel>

      <!-- Overlay  -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
    </div>

    <AppHeader :nav-items="navItems" class="relative z-10" />

    <!-- Contenu hero -->
    <div class="hero-content relative z-10 container mx-auto px-4 pt-5 pb-11 min-h-screen flex flex-col justify-center items-center text-center text-white">
       
      <!-- 1. Logo -->
      <div class="flex items-left gap-3">
         
          </div>
      <!-- 1. Badge -->
      <span
        :class="[
          'inline-block px-4 py-2 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full text-amber-200 text-sm mb-3 transition-all duration-700',
          showElements.badge ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        ]"
      >
        ✨ Magazine de décoration haut de gamme
      </span>
     
      <!-- 2. Titre avec machine à écrire -->
      <div :class="['transition-opacity duration-500', showElements.h1 ? 'opacity-100' : 'opacity-0']">
      <h1 class="font-nova-square text-5xl md:text-8xl font-bold mb-4 leading-tight">
        <template v-for="(line, i) in displayedText.split('\n')" :key="i">
          {{ line }}
          <br v-if="i === 0" />
        </template>
        <span class="cursor-blink">|</span>
      </h1>
    </div>
    
     
      <!-- 3. Sous-titre -->
      <p
        :class="[
          'font-cookie text-xl md:text-2xl mb-8 max-w-4xl leading-relaxed transition-all duration-700',
          showElements.subtitle ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-4'
        ]"
      >
        Inspirez-vous des plus belles réalisations en design d'intérieur,<br class="hidden md:block"/>
        des salons raffinés aux demeures d'exception
      </p>
     
      <!-- 4. Catégories avec petit stagger -->
      <div
        :class="[
          'flex flex-wrap justify-center gap-3 mb-10 transition-all duration-700',
          showElements.categories ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        ]"
      >
        <span
          v-for="(cat, index) in ['Salons contemporains', 'Maisons de maître', 'Penthouses', 'Villas de prestige']"
          :key="cat"
          class="px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20 transition-all duration-500 hover:bg-white/20 hover:scale-105"
          :style="{
            transitionDelay: showElements.categories ? `${index * 100}ms` : '0ms',
            opacity: showElements.categories ? 1 : 0,
            transform: showElements.categories ? 'translateY(0)' : 'translateY(20px)'
          }"
        >
          {{ cat }}
        </span>
      </div>
     
      <!-- 5. Boutons -->
      <div
        :class="[
          'flex flex-col sm:flex-row gap-4 transition-all duration-700',
          showElements.buttons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        ]"
      >
        <UButton
          size="xl"
          color="primary"
          class="px-10 py-4 text-base font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
          icon="i-heroicons-home-modern"
          trailing
           @click="goToLogin"
        >
          Explorer les tendances
        </UButton>
        <UButton
          size="xl"
          variant="soft"
          class="px-10 py-4 bg-white text-gray-900 hover:bg-white/90 text-base font-semibold rounded-full"
          icon="i-heroicons-bookmark"
          trailing
          @click="goToTendance"
        >
          S'abonner à la newsletter
        </UButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Ton animation blink existante */
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
.cursor-blink {
  animation: blink 1s infinite;
}

/* Garde tes styles existants */
.hero-wrapper {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.hero-bg {
  height: 100%;
  width: 100%;
}
</style>