<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { navigateTo } from '#app'
const route = useRoute()
const isScrolled = ref(false)

if (process.client) {
  onMounted(() => {
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50
    }
    window.addEventListener('scroll', handleScroll)
    onUnmounted(() => window.removeEventListener('scroll', handleScroll))
  })
}
function goToLogin() {
  navigateTo('/auth/login') // remplace /search par ta route cible
}

const items = computed<NavigationMenuItem[]>(() => [
  { label: 'Accueil', to: '/', active: route.path === '/' },
  { label: 'Articles', to: '/blog', active: route.path.startsWith('/blog') },
  { label: 'Galerie', to: '/gallery', active: route.path.startsWith('/gallery') },
  { label: 'Contact', to: '/contact', active: route.path.startsWith('/contact') }
])
</script>

<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-2xl py-4' 
        : 'bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm py-6'
    ]"
  >
    <div class="container mx-8 px-">
      <div class="flex items-center justify-between">
        
        <!-- Logo -->
        <NuxtLink to="/" class="group flex items-center gap-3">
          <span 
            :class="[
              'font-gravitas text-2xl font-bold tracking-tight transition-all duration-300',
              isScrolled 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600' 
                : 'text-white drop-shadow-lg'
            ]"
          >
            Luxe & Élégance
          </span>
        </NuxtLink>

        <!-- Navigation Desktop -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="item in items"
            :key="item.to"
            :to="item.to"
            :class="[
              'relative font-medium text-sm uppercase tracking-wider transition-all duration-300',
              item.active
                ? isScrolled
                  ? 'text-purple-600'
                  : 'text-white font-semibold'
                : isScrolled
                  ? 'text-gray-700 hover:text-purple-600'
                  : 'text-white/80 hover:text-white'
            ]"
          >
            {{ item.label }}
            <span 
              v-if="item.active"
              :class="[
                'absolute -bottom-1 left-0 h-0.5 w-full transition-colors',
                isScrolled ? 'bg-purple-600' : 'bg-white'
              ]"
            />
          </NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-3 -mr-22">
          <UButton
          :color="isScrolled ? 'primary' : 'neutral'"
            :variant="isScrolled ? 'ghost' : 'soft'"
            icon="i-heroicons-magnifying-glass"
            size="lg"
            square
            class="hidden sm:flex"
            
          />
          
          

          <UButton
            color="primary"
            size="lg"
            class="hidden lg:flex font-semibold rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:bg-purple-100/50 dark:hover:bg-indigo-900/30"
            @click="goToLogin()"
          >
            S'abonner
          </UButton>

          <!-- Burger menu -->
          <UButton
          :color="isScrolled ? 'primary' : 'neutral'"
            :variant="isScrolled ? 'ghost' : 'soft'"
            icon="i-heroicons-bars-3"
            size="lg"
            square
            class="md:hidden "
          />
        </div>
      </div>
    </div>
  </header>
</template>