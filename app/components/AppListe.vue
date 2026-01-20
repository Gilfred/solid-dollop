<script setup lang="ts">
import type { Post } from '../../types/post'
import { ref } from 'vue'

const { data: posts } = await useFetch<Post[]>('/api/posts')

// Séparer les articles tendances des autres
const trendingPosts = computed(() => (posts.value || []).slice(0, 3))
const regularPosts = computed(() => (posts.value || []).slice(3))

const currentSlide = ref(0)

// Actualités rénovation (données statiques ou depuis API)
const renovationNews = [
  {
    title: "Rénovation énergétique : nouvelles aides 2025",
    date: "Aujourd'hui",
    type: "Actualité"
  },
  {
    title: "Les matériaux écologiques les plus prisés",
    date: "Hier",
    type: "Guide"
  },
  {
    title: "Budget rénovation : comment optimiser vos coûts",
    date: "Il y a 2 jours",
    type: "Conseil"
  }
]

const usefulLinks = [
  { title: "Guide des architectes d'intérieur", url: "/guides/architectes" },
  { title: "Calculateur de budget rénovation", url: "/outils/calculateur" },
  { title: "Tendances déco Instagram", url: "/tendances/instagram" },
  { title: "Salons et expositions 2025", url: "/evenements/salons" }
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % trendingPosts.value.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + trendingPosts.value.length) % trendingPosts.value.length
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-3 gap-8">
        
        <!-- COLONNE GAUCHE - Articles (2/3) -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- Section Tendances - Carousel -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden  border border-gray-200">
            <div class="p-6 bg-gradient-to-r from-purple-600 to-indigo-600">
              <div class="flex items-center gap-2 text-white">
                <UIcon name="i-heroicons-fire" class="w-6 h-6" />
                <h2 class="text-2xl font-bold underline">Tendances de la semaine</h2>
              </div>
            </div>
            
            <div class="relative">
              <!-- Carousel -->
              <div class="relative h-96 overflow-hidden">
                <div
                  v-for="(post, index) in trendingPosts"
                  :key="post.id"
                  :class="[
                    'absolute inset-0 transition-all duration-500',
                    index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                  ]"
                >
                  <NuxtImg
                    :src="post.image"
                    :alt="post.title"
                    class="w-full h-full object-cover"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <NuxtLink :to="`/blog/${post.id}`" class="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <span class="inline-block px-3 py-1 bg-purple-500 rounded-full text-xs font-semibold mb-3">
                      Tendance
                    </span>
                    <h3 class="text-3xl font-bold mb-2">{{ post.title }}</h3>
                    <div class="flex items-center gap-2 text-sm opacity-90">
                      <UIcon name="i-heroicons-clock" class="w-4 h-4" />
                      <span>{{ post.readtime }} min</span>
                    </div>
                  </NuxtLink>
                </div>
              </div>
              
              <!-- Navigation -->
              <button
                @click="prevSlide"
                class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
              >
                <UIcon name="i-heroicons-chevron-left" class="w-6 h-6 text-white" />
              </button>
              <button
                @click="nextSlide"
                class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
              >
                <UIcon name="i-heroicons-chevron-right" class="w-6 h-6 text-white" />
              </button>
              
              <!-- Dots -->
              <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                <button
                  v-for="(_, index) in trendingPosts"
                  :key="index"
                  @click="currentSlide = index"
                  :class="[
                    'h-2 rounded-full transition-all',
                    index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2'
                  ]"
                />
              </div>
            </div>
          </div>

          <!-- Section Autres Articles -->
          <div>
            <h2 class="text-2xl font-bold mb-6 text-gray-800 underline">Tous nos articles</h2>
            <div class="grid sm:grid-cols-2 gap-6">
              <NuxtLink
                v-for="post in regularPosts"
                :key="post.id"
                :to="`/blog/${post.id}`"
                class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group  border border-gray-200"
              >
                <div class="relative overflow-hidden h-48">
                  <NuxtImg
                    :src="post.image"
                    :alt="post.title"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span class="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded-full">
                    {{ post.category || 'Article' }}
                  </span>
                </div>
                <div class="p-5">
                  <h3 class="font-bold text-lg mb-2 text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors hover:underline">
                    {{ post.title }}
                  </h3>
                  <p class="text-sm text-gray-500">
                    {{ new Date(post.created_at).toLocaleDateString('fr-FR') }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- COLONNE DROITE - Sidebar (1/3) -->
        <div class="space-y-6">
          
          <!-- Actualités Rénovation -->
          <div class="bg-white rounded-2xl shadow-lg p-6  top-6  border border-gray-500">
            <div class="flex items-center gap-2 mb-6">
              <UIcon name="i-heroicons-newspaper" class="w-6 h-6 text-indigo-600" />
              <h3 class="text-xl font-bold text-gray-800 underline">Actualités Rénovation</h3>
            </div>
            
            <div class="space-y-4">
              <div
                v-for="(news, index) in renovationNews"
                :key="index"
                class="pb-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 p-3 rounded-lg transition-colors cursor-pointer"
              >
                <div class="flex items-start justify-between gap-2 mb-1">
                  <span class="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">
                    {{ news.type }}
                  </span>
                  <span class="text-xs text-gray-400">{{ news.date }}</span>
                </div>
                <h4 class="font-semibold text-sm text-gray-800 hover:text-purple-600 transition-colors">
                  {{ news.title }}
                </h4>
              </div>
            </div>
            
            <UButton color="primary" class="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full" size="lg">
              Voir toutes les actus
            </UButton>
          </div>

          <!-- Liens Utiles -->
          <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-6  border border-gray-500">
            <div class="flex items-center gap-2 mb-6">
              <UIcon name="i-heroicons-star" class="w-6 h-6 text-amber-600" />
              <h3 class="text-xl font-bold text-gray-800 underline">Ressources Utiles</h3>
            </div>
            
            <div class="space-y-3">
              <NuxtLink
                v-for="(link, index) in usefulLinks"
                :key="index"
                :to="link.url"
                class="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-all group"
              >
                <span class="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                  {{ link.title }}
                </span>
                <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </NuxtLink>
            </div>
          </div>

          <!-- Newsletter -->
          <div class="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white  border border-gray-500">
            <div class="flex items-center gap-2 mb-4">
              <UIcon name="i-heroicons-envelope" class="w-6 h-6" />
              <h3 class="text-xl font-bold underline">Newsletter</h3>
            </div>
            <p class="text-sm mb-4 opacity-90">
              Recevez nos meilleures inspirations déco chaque semaine
            </p>
            <UInput
              type="email"
              placeholder="Votre email"
              class="mb-3"
              size="lg"
            />
            <UButton color="neutral" variant="solid" class="w-full" size="lg">
              S'abonner
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>